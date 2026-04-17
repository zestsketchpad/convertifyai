import { NextResponse } from "next/server";
import { createShareToken } from "@/lib/share-token";

export const runtime = "nodejs";

type CreateShareBody = {
  data?: unknown;
  tone?: unknown;
  useNewSystem?: unknown;
};

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as CreateShareBody | null;

  const tone = typeof body?.tone === "string" && body.tone.trim() ? body.tone : "Professional";
  const useNewSystem = typeof body?.useNewSystem === "boolean" ? body.useNewSystem : true;
  const data = body?.data;

  if (!data || typeof data !== "object") {
    return NextResponse.json({ error: "Invalid share payload." }, { status: 400 });
  }

  const approxSize = Buffer.byteLength(JSON.stringify(data), "utf8");
  if (approxSize > 150_000) {
    return NextResponse.json(
      { error: "Generated content is too large to share as a temporary link." },
      { status: 413 },
    );
  }

  const { token, expiresAt } = createShareToken({
    data,
    tone,
    useNewSystem,
    ttlSeconds: 24 * 60 * 60,
  });

  const origin = new URL(req.url).origin;
  const shareUrl = `${origin}/share/${encodeURIComponent(token)}`;

  return NextResponse.json({ shareUrl, expiresAt });
}
