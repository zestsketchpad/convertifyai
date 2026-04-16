// app/api/generate/route.ts

import { NextResponse } from "next/server";
import { buildPrompt } from "@/lib/prompt";

export async function POST(req: Request) {
  try {
    const { reviews, tone } = await req.json();

    if (!reviews || !tone) {
      return NextResponse.json(
        { error: "Missing reviews or tone" },
        { status: 400 }
      );
    }

    const prompt = buildPrompt(reviews, tone);

    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant", // safer model
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
      }),
    });

    const data = await res.json();

    // 🔍 Debug log (remove later)
    console.log("FULL RESPONSE:", data);

    // ❌ API error handling
    if (!res.ok) {
      console.error("Groq API Error:", data);
      return NextResponse.json(
        { error: data.error?.message || "Groq API failed" },
        { status: res.status }
      );
    }

    // ❌ Missing choices safety
    if (!data.choices || data.choices.length === 0) {
      console.error("Invalid AI response:", data);
      return NextResponse.json(
        { error: "No valid response from AI" },
        { status: 500 }
      );
    }

    // ✅ Safe extraction
    let text = data.choices[0]?.message?.content || "";

    // ✅ Clean markdown if present
    text = text.replace(/```json|```/g, "").trim();

    let parsed;

    try {
      parsed = JSON.parse(text);
    } catch (err) {
      console.error("JSON Parse Error:", text);
      return NextResponse.json(
        { error: "Invalid JSON format from AI", raw: text },
        { status: 500 }
      );
    }

    return NextResponse.json(parsed);

  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json(
      { error: "Failed to generate" },
      { status: 500 }
    );
  }
}