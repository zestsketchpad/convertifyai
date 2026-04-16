// app/api/generate/route.ts
import { NextResponse } from "next/server";
import { buildPrompt } from "@/lib/prompt";

export async function POST(req: Request) {
  try {
    const { reviews, tone } = await req.json();

    const prompt = buildPrompt(reviews, tone);

    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant", // fast + good
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    });

    const data = await res.json();

    let text = data.choices[0].message.content;

    // clean response
    text = text.replace(/```json|```/g, "");

    const parsed = JSON.parse(text);

    return NextResponse.json(parsed);

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to generate" });
  }
}