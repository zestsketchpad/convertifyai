import { NextResponse } from "next/server";
import { buildPrompt } from "@/lib/prompt";

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
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
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
    });

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

    return NextResponse.json(parsed.value);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to generate" }, { status: 500 });
  }
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
