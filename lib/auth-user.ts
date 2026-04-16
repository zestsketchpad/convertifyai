import type { User } from "@supabase/supabase-js";

export function getUserDisplayName(user: User | null | undefined) {
  if (!user) return "Account";

  const metadata = user.user_metadata as Record<string, unknown> | undefined;
  const metadataName =
    typeof metadata?.full_name === "string"
      ? metadata.full_name
      : typeof metadata?.name === "string"
        ? metadata.name
        : typeof metadata?.user_name === "string"
          ? metadata.user_name
          : null;

  if (metadataName && metadataName.trim()) {
    return metadataName.trim();
  }

  if (user.email) {
    const emailPrefix = user.email.split("@")[0]?.trim();
    if (emailPrefix) {
      return emailPrefix;
    }
  }

  return "Account";
}
