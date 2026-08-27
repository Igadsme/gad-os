import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations/contact";
import { profile } from "@/data/profile";

const hits = new Map<string, { count: number; reset: number }>();

function rateLimit(key: string) {
  const now = Date.now();
  const current = hits.get(key);
  if (!current || current.reset < now) {
    hits.set(key, { count: 1, reset: now + 60_000 });
    return true;
  }
  if (current.count >= 5) return false;
  current.count += 1;
  return true;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") ?? "local";
  if (!rateLimit(ip)) {
    return NextResponse.json(
      { error: "Please wait a minute before sending another message." },
      { status: 429 },
    );
  }

  const json = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Check the form and try again." }, { status: 400 });
  }

  const payload = parsed.data;
  const resendKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? profile.email;

  if (!resendKey) {
    return NextResponse.json({ ok: true, delivered: false });
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL ?? "Imani Gad <noreply@imanigad.com>",
      to,
      reply_to: payload.email,
      subject: `[Imani Gad] ${payload.subject} — ${payload.name}`,
      text: [
        payload.message,
        "",
        `From: ${payload.name} <${payload.email}>`,
        payload.company ? `Company: ${payload.company}` : "",
      ].join("\n"),
    }),
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: "Email provider rejected the message.", delivered: false },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, delivered: true });
}
