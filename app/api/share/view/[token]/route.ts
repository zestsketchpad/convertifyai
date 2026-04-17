import { NextResponse } from "next/server";
import { verifyShareToken } from "@/lib/share-token";

export const runtime = "nodejs";

type Params = {
  token: string;
};

export async function GET(_req: Request, context: { params: Promise<Params> }) {
  const { token } = await context.params;
  const decodedToken = decodeURIComponent(token);
  const result = verifyShareToken(decodedToken);

  if (!result.ok) {
    if (result.reason === "expired") {
      return NextResponse.json(
        { error: "This share link has expired.", code: "LINK_EXPIRED" },
        { status: 410 },
      );
    }

    return NextResponse.json(
      { error: "Invalid share link.", code: "LINK_INVALID" },
      { status: 400 },
    );
  }

  return NextResponse.json({
    data: result.payload.data,
    tone: result.payload.tone,
    useNewSystem: result.payload.useNewSystem,
    expiresAt: new Date(result.payload.exp * 1000).toISOString(),
  });
}
