import { createHmac, timingSafeEqual } from "node:crypto";
import { deflateRawSync, inflateRawSync } from "node:zlib";

const TOKEN_VERSION = 1;
const DEFAULT_TTL_SECONDS = 24 * 60 * 60;

export type SharePayload = {
  v: number;
  exp: number;
  iat: number;
  tone: string;
  useNewSystem: boolean;
  data: unknown;
};

function toBase64Url(value: Buffer) {
  return value
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function fromBase64Url(value: string) {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64 + "=".repeat((4 - (base64.length % 4 || 4)) % 4);
  return Buffer.from(padded, "base64");
}

function getSigningSecret() {
  return (
    process.env.SHARE_TOKEN_SECRET ||
    process.env.GROQ_API_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    "dev-share-token-secret"
  );
}

function sign(payloadPart: string) {
  return toBase64Url(
    createHmac("sha256", getSigningSecret()).update(payloadPart).digest(),
  );
}

export function createShareToken(input: {
  data: unknown;
  tone: string;
  useNewSystem: boolean;
  ttlSeconds?: number;
}) {
  const nowSec = Math.floor(Date.now() / 1000);
  const ttl = Math.max(1, input.ttlSeconds ?? DEFAULT_TTL_SECONDS);

  const payload: SharePayload = {
    v: TOKEN_VERSION,
    iat: nowSec,
    exp: nowSec + ttl,
    tone: input.tone,
    useNewSystem: input.useNewSystem,
    data: input.data,
  };

  const raw = Buffer.from(JSON.stringify(payload), "utf8");
  const compressed = deflateRawSync(raw);
  const payloadPart = toBase64Url(compressed);
  const sigPart = sign(payloadPart);

  return {
    token: `${payloadPart}.${sigPart}`,
    expiresAt: new Date(payload.exp * 1000).toISOString(),
  };
}

export function verifyShareToken(token: string):
  | { ok: true; payload: SharePayload }
  | { ok: false; reason: "invalid" | "expired" } {
  const [payloadPart, sigPart] = token.split(".");
  if (!payloadPart || !sigPart) {
    return { ok: false, reason: "invalid" };
  }

  const expectedSig = sign(payloadPart);
  const expectedBuf = Buffer.from(expectedSig, "utf8");
  const providedBuf = Buffer.from(sigPart, "utf8");

  if (
    expectedBuf.length !== providedBuf.length ||
    !timingSafeEqual(expectedBuf, providedBuf)
  ) {
    return { ok: false, reason: "invalid" };
  }

  try {
    const compressed = fromBase64Url(payloadPart);
    const raw = inflateRawSync(compressed);
    const parsed = JSON.parse(raw.toString("utf8")) as SharePayload;

    if (
      !parsed ||
      parsed.v !== TOKEN_VERSION ||
      typeof parsed.exp !== "number" ||
      typeof parsed.iat !== "number"
    ) {
      return { ok: false, reason: "invalid" };
    }

    const nowSec = Math.floor(Date.now() / 1000);
    if (parsed.exp <= nowSec) {
      return { ok: false, reason: "expired" };
    }

    return { ok: true, payload: parsed };
  } catch {
    return { ok: false, reason: "invalid" };
  }
}
