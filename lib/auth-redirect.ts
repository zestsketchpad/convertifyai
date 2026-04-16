function normalizeBaseUrl(value: string) {
  return value.replace(/\/$/, "");
}

function getBaseUrl() {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) return normalizeBaseUrl(fromEnv);

  if (typeof window !== "undefined" && window.location?.origin) {
    return normalizeBaseUrl(window.location.origin);
  }

  return "";
}

export function getAuthCallbackUrl() {
  const base = getBaseUrl();
  return base ? `${base}/auth/callback` : "/auth/callback";
}