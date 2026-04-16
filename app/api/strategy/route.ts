import { NextResponse } from "next/server";
import { buildStrategyPrompt } from "@/lib/strategy-prompt";
import { setDefaultResultOrder } from "node:dns";

export const runtime = "nodejs";

try {
  setDefaultResultOrder("ipv4first");
} catch {}

type StrategyRequestBody = {
  reviews?: unknown;
  tone?: unknown;
};

export async function POST(req: Request) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Missing GROQ_API_KEY" },
      { status: 500 }
    );
  }

  const body = (await req.json().catch(() => null)) as StrategyRequestBody | null;
  const reviews = typeof body?.reviews === "string" ? body.reviews.trim() : "";
  const tone =
    typeof body?.tone === "string" && body.tone.trim()
      ? body.tone.trim()
      : "professional";

  if (!reviews) {
    return NextResponse.json(
      { error: "Please provide reviews" },
      { status: 400 }
    );
  }

  const prompt = buildStrategyPrompt(reviews, tone);

  try {
    const url =
      process.env.GROQ_API_URL?.trim() ||
      "https://api.groq.com/openai/v1/chat/completions";

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        temperature: 0.3,
        messages: [
          {
            role: "system",
            content:
              "You output ONLY valid JSON. No markdown. No code fences. Use double quotes and no trailing commas.",
          },
          { role: "user", content: prompt },
        ],
      }),
      signal: AbortSignal.timeout(20000),
    });

    if (!res.ok) {
      const details = await res.text().catch(() => "");
      return NextResponse.json(
        { error: "Groq request failed", details: details.slice(0, 1000) },
        { status: 502 }
      );
    }

    const payload = (await res.json().catch(() => null)) as any;
    const content = payload?.choices?.[0]?.message?.content;
    if (typeof content !== "string") {
      return NextResponse.json(
        { error: "Invalid response from Groq" },
        { status: 502 }
      );
    }

    // Try to parse JSON
    let strategy: any;
    try {
      strategy = JSON.parse(content);
    } catch {
      return NextResponse.json(
        { error: "Failed to parse strategy JSON", raw: content.slice(0, 500) },
        { status: 502 }
      );
    }

    return NextResponse.json(strategy);
  } catch (error: any) {
    console.error("Strategy API error:", error);
    return NextResponse.json(
      { error: "Failed to generate strategy" },
      { status: 500 }
    );
  }
}
