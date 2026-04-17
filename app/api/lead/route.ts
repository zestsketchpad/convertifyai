import { NextResponse } from "next/server";

export const runtime = "nodejs";

type LeadBody = {
  action?: unknown;
  sourceLabel?: unknown;
  name?: unknown;
  email?: unknown;
  company?: unknown;
  message?: unknown;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as LeadBody | null;

  const action = typeof body?.action === "string" ? body.action.trim() : "";
  const sourceLabel = typeof body?.sourceLabel === "string" ? body.sourceLabel.trim() : "Website CTA";
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const company = typeof body?.company === "string" ? body.company.trim() : "";
  const message = typeof body?.message === "string" ? body.message.trim() : "";

  if (!action || !name || !email) {
    return NextResponse.json(
      { error: "Missing required fields." },
      { status: 400 },
    );
  }

  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json(
      { error: "Invalid email address." },
      { status: 400 },
    );
  }

  const leadRecord = {
    id: crypto.randomUUID(),
    action,
    sourceLabel,
    name,
    email,
    company,
    message,
    createdAt: new Date().toISOString(),
  };

  // Placeholder persistence point for DB/webhook integration.
  console.log("[lead-captured]", leadRecord);

  return NextResponse.json({ ok: true, id: leadRecord.id });
}
