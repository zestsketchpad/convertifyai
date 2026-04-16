function normalizeBaseUrl(value: string) {
  return value.replace(/\/$/, "");
}

function toUrl(value: string) {
  try {
    return new URL(value);
  } catch {
    return null;
  }
}

function isLocalHostName(hostname: string) {
  return hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1";
}

function getBaseUrl() {
  const fromRuntime =
    typeof window !== "undefined" && window.location?.origin
      ? normalizeBaseUrl(window.location.origin)
      : "";

  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) {
    const envUrl = toUrl(fromEnv);
    const runtimeUrl = fromRuntime ? toUrl(fromRuntime) : null;

    // If env accidentally points to localhost but browser is on a real domain,
    // prefer the current browser origin to avoid redirecting users to localhost.
    if (
      envUrl &&
      runtimeUrl &&
      isLocalHostName(envUrl.hostname) &&
      !isLocalHostName(runtimeUrl.hostname)
    ) {
      return fromRuntime;
    }

    return normalizeBaseUrl(fromEnv);
  }

  if (fromRuntime) return fromRuntime;

  return "";
}

export function getAuthCallbackUrl() {
  const base = getBaseUrl();
  return base ? `${base}/auth/callback` : "/auth/callback";
}