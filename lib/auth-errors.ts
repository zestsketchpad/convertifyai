type MaybeAuthError = {
  message?: string;
};

export function toFriendlyAuthError(error: MaybeAuthError | null | undefined): string {
  const fallback = "Authentication failed. Please try again.";

  if (!error?.message) {
    return fallback;
  }

  const lower = error.message.toLowerCase();

  if (lower.includes("unsupported provider") || lower.includes("provider is not enabled")) {
    return "Google login is not enabled in Supabase yet. Enable Google under Authentication -> Providers, then add your Google OAuth Client ID and Client Secret.";
  }

  return error.message;
}