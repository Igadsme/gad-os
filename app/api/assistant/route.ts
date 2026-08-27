import { NextResponse } from "next/server";
import { z } from "zod";
import { buildAssistantContext, groundedFallbackAnswer } from "@/lib/assistant";

const bodySchema = z.object({
  question: z.string().trim().min(3).max(500),
});

const hits = new Map<string, { count: number; reset: number }>();

function rateLimit(key: string, limit = 20, windowMs = 60_000) {
  const now = Date.now();
  const current = hits.get(key);
  if (!current || current.reset < now) {
    hits.set(key, { count: 1, reset: now + windowMs });
    return true;
  }
  if (current.count >= limit) return false;
  current.count += 1;
  return true;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") ?? "local";
  if (!rateLimit(ip)) {
    return NextResponse.json({ error: "Too many questions. Try again shortly." }, { status: 429 });
  }

  const json = await request.json().catch(() => null);
  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Ask a short, specific question." }, { status: 400 });
  }

  const fallback = groundedFallbackAnswer(parsed.data.question);
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(fallback);
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL ?? "gpt-4.1-mini",
        temperature: 0.2,
        messages: [
          { role: "system", content: buildAssistantContext() },
          { role: "user", content: parsed.data.question },
        ],
      }),
    });
    if (!response.ok) {
      return NextResponse.json(fallback);
    }
    const data = await response.json();
    const answer =
      data.choices?.[0]?.message?.content ?? fallback.answer;
    return NextResponse.json({
      answer,
      sources: fallback.sources,
    });
  } catch {
    return NextResponse.json(fallback);
  }
}
