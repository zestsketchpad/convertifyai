import { NextResponse } from "next/server";
import { buildPrompt } from "@/lib/prompt";
import { setDefaultResultOrder } from "node:dns";

export const runtime = "nodejs";

// Helps avoid IPv6-related connect timeouts on some networks.
try {
  setDefaultResultOrder("ipv4first");
} catch {}

type GenerateRequestBody = {
  reviews?: unknown;
  tone?: unknown;
};

type SafeParseResult =
  | { ok: true; value: unknown }
  | { ok: false; error: string };

export async function POST(req: Request) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Missing GROQ_API_KEY (set it in .env.local)" },
      { status: 500 },
    );
  }

  const body = (await req.json().catch(() => null)) as GenerateRequestBody | null;
  const reviews = typeof body?.reviews === "string" ? body.reviews.trim() : "";
  const tone =
    typeof body?.tone === "string" && body.tone.trim()
      ? body.tone.trim()
      : "professional";

  if (!reviews) {
    return NextResponse.json(
      { error: "Please provide `reviews` as a non-empty string." },
      { status: 400 },
    );
  }

  const prompt = buildPrompt(reviews, tone);

  try {
    const url =
      process.env.GROQ_API_URL?.trim() ||
      "https://api.groq.com/openai/v1/chat/completions";

    const res = await fetchWithRetry(
      url,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          temperature: 0.2,
          messages: [
            {
              role: "system",
              content:
                "You output ONLY valid JSON. No markdown. No code fences. Use double quotes and no trailing commas.",
            },
            { role: "user", content: prompt },
          ],
        }),
      },
      { attempts: 2, timeoutMs: 20_000 },
    );

    if (!res.ok) {
      const details = await res.text().catch(() => "");
      return NextResponse.json(
        {
          error: "Groq request failed",
          status: res.status,
          details: details.slice(0, 4000),
        },
        { status: 502 },
      );
    }

    const payload = (await res.json().catch(() => null)) as any;
    const content = payload?.choices?.[0]?.message?.content;
    if (typeof content !== "string") {
      return NextResponse.json(
        { error: "Groq response missing message content." },
        { status: 502 },
      );
    }

    const parsed = safeParseJsonFromModel(content);
    if (!parsed.ok) {
      return NextResponse.json(
        {
          error: "Model returned invalid JSON.",
          details: parsed.error,
          raw: content.slice(0, 4000),
        },
        { status: 502 },
      );
    }

    return NextResponse.json(normalizeGeneratedPayload(parsed.value, reviews));
  } catch (error) {
    const info = getNetworkErrorInfo(error);
    if (info.code === "UND_ERR_CONNECT_TIMEOUT" || info.code === "TIMEOUT") {
      return NextResponse.json(
        {
          error: "Could not reach Groq (connection timed out).",
          code: info.code,
          hint: "Check your internet/VPN/firewall and try again.",
        },
        { status: 504 },
      );
    }

    if (info.code) {
      return NextResponse.json(
        {
          error: "Could not reach Groq.",
          code: info.code,
          hint: "Check your internet/VPN/firewall and try again.",
        },
        { status: 502 },
      );
    }

    console.error(error);
    return NextResponse.json({ error: "Failed to generate" }, { status: 500 });
  }
}

async function fetchWithRetry(
  url: string,
  init: RequestInit,
  options: { attempts: number; timeoutMs: number },
) {
  let lastError: unknown;
  for (let attempt = 1; attempt <= options.attempts; attempt++) {
    try {
      const res = await fetch(url, {
        ...init,
        signal: AbortSignal.timeout(options.timeoutMs),
      });
      return res;
    } catch (error) {
      lastError = error;
      if (attempt >= options.attempts) throw error;
      if (!isRetryableNetworkError(error)) throw error;
      await delay(250 * attempt);
    }
  }

  throw lastError;
}

function delay(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

function isRetryableNetworkError(error: unknown) {
  const info = getNetworkErrorInfo(error);
  return info.code === "UND_ERR_CONNECT_TIMEOUT" || info.code === "TIMEOUT";
}

function getNetworkErrorInfo(error: unknown): { code?: string } {
  if (!error || typeof error !== "object") return {};

  const anyErr = error as any;
  const code =
    (typeof anyErr?.cause?.code === "string" ? anyErr.cause.code : undefined) ||
    (typeof anyErr?.code === "string" ? anyErr.code : undefined);

  // AbortSignal.timeout() throws a DOMException with name "TimeoutError".
  if (!code && anyErr?.name === "TimeoutError") return { code: "TIMEOUT" };

  return { code };
}

function safeParseJsonFromModel(text: string): SafeParseResult {
  const stripped = stripCodeFences(text);
  const candidate = extractJsonCandidate(stripped);

  try {
    return { ok: true, value: JSON.parse(candidate) };
  } catch {}

  const noTrailingCommas = candidate.replace(/,\s*([}\]])/g, "$1");
  try {
    return { ok: true, value: JSON.parse(noTrailingCommas) };
  } catch {}

  return {
    ok: false,
    error: "Unable to parse JSON from model output.",
  };
}

function stripCodeFences(text: string) {
  let out = text.trim();
  out = out.replace(/^\s*```(?:json)?\s*/i, "");
  out = out.replace(/\s*```\s*$/i, "");
  return out.trim();
}

function extractJsonCandidate(text: string) {
  const trimmed = text.trim();
  if (trimmed.startsWith("{") || trimmed.startsWith("[")) return trimmed;

  const objectStart = trimmed.indexOf("{");
  const arrayStart = trimmed.indexOf("[");
  const start =
    objectStart === -1
      ? arrayStart
      : arrayStart === -1
        ? objectStart
        : Math.min(objectStart, arrayStart);
  if (start === -1) return trimmed;

  const startChar = trimmed[start];
  const endChar = startChar === "[" ? "]" : "}";
  const end = trimmed.lastIndexOf(endChar);
  if (end === -1 || end <= start) return trimmed.slice(start);

  return trimmed.slice(start, end + 1);
}

const FALLBACK_TOP_PROBLEM = "No major issues mentioned";

function normalizeGeneratedPayload(value: unknown, reviews: string) {
  if (!value || typeof value !== "object") return value;

  const obj = value as Record<string, unknown>;

  const painPoints = toStringArray(obj.painPoints);
  let benefits = toStringArray(obj.benefits);
  const keywords = toStringArray(obj.keywords);

  const topProblem = typeof obj.topProblem === "string" ? obj.topProblem.trim() : "";
  const recommendation =
    typeof obj.recommendation === "string" ? obj.recommendation.trim() : "";

  const scoresObj =
    obj.scores && typeof obj.scores === "object"
      ? (obj.scores as Record<string, unknown>)
      : {};

  const modelScores = {
    conversion: toScore(scoresObj.conversion),
    clarity: toScore(scoresObj.clarity),
    emotion: toScore(scoresObj.emotion),
  };

  const landingObj =
    obj.landing && typeof obj.landing === "object"
      ? (obj.landing as Record<string, unknown>)
      : {};

  const legacyHeadline = typeof obj.headline === "string" ? obj.headline : "";
  const legacySubheadline =
    typeof obj.subheadline === "string" ? obj.subheadline : "";
  const legacyCta = typeof obj.cta === "string" ? obj.cta : "";

  const landingBenefits =
    toStringArray(landingObj.benefits).length > 0
      ? toStringArray(landingObj.benefits)
      : toStringArray(obj.benefits);

  if (benefits.length === 0) benefits = landingBenefits;

  const landing = {
    headline: toNonEmptyString(landingObj.headline, legacyHeadline),
    subheadline: toNonEmptyString(landingObj.subheadline, legacySubheadline),
    benefits: landingBenefits,
    cta: toNonEmptyString(landingObj.cta, legacyCta),
  };

  const testimonialsRaw = Array.isArray(obj.testimonials) ? obj.testimonials : [];
  const testimonials = testimonialsRaw
    .map((item) => normalizeTestimonial(item))
    .filter((t): t is { name: string; review: string } => t !== null);

  const noExplicitNegatives = !containsNegativeSignal(reviews);
  const shouldForceNoIssues = noExplicitNegatives && painPoints.length > 0;
  const finalPainPoints = shouldForceNoIssues ? [] : painPoints;

  const hasProblems = finalPainPoints.length > 0;
  const finalTopProblem = hasProblems
    ? topProblem || finalPainPoints[0] || FALLBACK_TOP_PROBLEM
    : FALLBACK_TOP_PROBLEM;

  const sentiment = estimateSentiment(reviews, hasProblems);
  const estimatedScores = estimateScores(sentiment);

  const scores = {
    conversion:
      modelScores.conversion > 0 ? modelScores.conversion : estimatedScores.conversion,
    clarity: modelScores.clarity > 0 ? modelScores.clarity : estimatedScores.clarity,
    emotion: modelScores.emotion > 0 ? modelScores.emotion : estimatedScores.emotion,
  };

  const knownStrengths = uniqueStrings([
    ...benefits.slice(0, 6),
    ...landingBenefits.slice(0, 6),
    ...keywords.slice(0, 6),
  ]);

  const hasUsableRecommendation =
    recommendation && !isWeakRecommendation(recommendation, knownStrengths);

  const finalRecommendation = hasProblems
    ? hasUsableRecommendation
      ? recommendation
      : buildProblemRecommendation(
          finalTopProblem,
          benefits,
          landingBenefits,
          keywords,
        )
    : hasUsableRecommendation
      ? recommendation
      : buildStrengthsRecommendation(benefits, landingBenefits, keywords);

  return {
    painPoints: finalPainPoints,
    benefits,
    keywords,
    topProblem: finalTopProblem,
    recommendation: finalRecommendation,
    scores,
    landing,
    testimonials,
  };
}

function toStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((v): v is string => typeof v === "string")
    .map((v) => v.trim())
    .filter(Boolean);
}

function toNonEmptyString(value: unknown, fallback: string) {
  const str = typeof value === "string" ? value.trim() : "";
  const fb = typeof fallback === "string" ? fallback.trim() : "";
  return str || fb;
}

function toScore(value: unknown) {
  const num = typeof value === "number" && Number.isFinite(value) ? value : 0;
  return Math.max(0, Math.min(100, Math.round(num)));
}

function normalizeTestimonial(value: unknown) {
  if (!value || typeof value !== "object") return null;
  const obj = value as Record<string, unknown>;

  const name =
    (typeof obj.name === "string" ? obj.name : "") ||
    (typeof obj.source === "string" ? obj.source : "") ||
    "Anonymous";

  const review =
    (typeof obj.review === "string" ? obj.review : "") ||
    (typeof obj.text === "string" ? obj.text : "");

  const finalName = name.trim();
  const finalReview = review.trim();
  if (!finalReview) return null;

  return { name: finalName || "Anonymous", review: finalReview };
}

function buildStrengthsRecommendation(
  benefits: string[],
  landingBenefits: string[],
  keywords: string[],
) {
  const strengths = uniqueStrings([
    ...benefits.slice(0, 4),
    ...landingBenefits.slice(0, 4),
    ...keywords.slice(0, 4),
  ]).slice(0, 2);

  if (strengths.length === 0) {
    return "Lead with your strongest customer outcomes in the hero, then reinforce with real testimonials and a clear CTA.";
  }

  if (strengths.length === 1) {
    return `Lead with ${strengths[0]} in your hero headline, then reinforce it with real testimonials and a clear CTA.`;
  }

  return `Lead with ${strengths[0]} and ${strengths[1]} in your hero headline and first benefit cards, then reinforce with real testimonials and a clear CTA.`;
}

function buildProblemRecommendation(
  topProblem: string,
  benefits: string[],
  landingBenefits: string[],
  keywords: string[],
) {
  const strengths = uniqueStrings([
    ...benefits.slice(0, 4),
    ...landingBenefits.slice(0, 4),
    ...keywords.slice(0, 4),
  ]).slice(0, 2);

  const strengthsClause =
    strengths.length > 0 ? ` while keeping ${strengths.join(" and ")} prominent` : "";

  return `Address "${topProblem}" with a dedicated “How we fix it” section and clearer expectations${strengthsClause}, then end with a single, confident CTA.`;
}

function isWeakRecommendation(recommendation: string, strengths: string[]) {
  const t = recommendation.trim().toLowerCase();
  if (!t) return true;

  if (t.includes("use concrete strengths")) return true;
  if (t.includes("emphasize strengths")) return true;

  if (t.includes("trust signals")) {
    const mentionsStrength = strengths.some((s) => t.includes(s.toLowerCase()));
    return !mentionsStrength;
  }

  return false;
}

function uniqueStrings(values: string[]) {
  const out: string[] = [];
  const seen = new Set<string>();
  for (const value of values) {
    const key = value.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(value);
  }
  return out;
}

type Sentiment = "positive" | "mixed" | "negative";

function estimateSentiment(reviews: string, hasProblems: boolean): Sentiment {
  const negative = containsNegativeSignal(reviews);
  const positive = containsPositiveSignal(reviews);

  if (negative && !positive) return "negative";
  if (negative && positive) return "mixed";
  if (hasProblems) return "mixed";
  if (positive) return "positive";
  return "mixed";
}

function estimateScores(sentiment: Sentiment) {
  if (sentiment === "positive") return { conversion: 84, clarity: 90, emotion: 86 };
  if (sentiment === "negative") return { conversion: 35, clarity: 55, emotion: 40 };
  return { conversion: 65, clarity: 75, emotion: 65 };
}

function containsNegativeSignal(text: string) {
  const t = text.toLowerCase();
  return [
    "too expensive",
    "expensive",
    "overpriced",
    "pricey",
    "costly",
    "slow",
    "delay",
    "hard to use",
    "difficult",
    "confusing",
    "bad",
    "worst",
    "issue",
    "problem",
    "bug",
    "crash",
    "error",
    "refund",
    "cancel",
    "unhelpful",
    "rude",
    "disappointed",
    "waste",
  ].some((needle) => t.includes(needle));
}

function containsPositiveSignal(text: string) {
  const t = text.toLowerCase();
  return [
    "love",
    "loved",
    "great",
    "amazing",
    "excellent",
    "awesome",
    "helpful",
    "kind",
    "caring",
    "empathetic",
    "holistic",
    "hope",
    "trust",
    "easy",
    "fast",
    "recommended",
    "highly recommend",
    "five-star",
    "5-star",
  ].some((needle) => t.includes(needle));
}
