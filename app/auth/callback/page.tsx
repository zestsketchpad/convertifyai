"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { toFriendlyAuthError } from "@/lib/auth-errors";

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [message, setMessage] = useState("Finishing sign-in...");
  const handledRef = useRef(false);

  useEffect(() => {
    const finishOAuth = async () => {
      if (handledRef.current) return;
      handledRef.current = true;

      const code = searchParams.get("code");
      const oauthError = searchParams.get("error");
      const oauthErrorDescription = searchParams.get("error_description");

      if (oauthError) {
        setMessage(oauthErrorDescription || "Google sign-in failed. Redirecting to login...");
        router.replace("/login");
        return;
      }

      if (!code) {
        setMessage("Missing OAuth code. Redirecting to login...");
        router.replace("/login");
        return;
      }

      const { error } = await supabase.auth.exchangeCodeForSession(code);

      if (error) {
        setMessage(toFriendlyAuthError(error));
        router.replace("/login");
        return;
      }

      router.replace("/");
      router.refresh();
    };

    finishOAuth();
  }, [router, searchParams]);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_35%),linear-gradient(180deg,#09090b,#000)] text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-zinc-950/80 p-6 text-center shadow-2xl shadow-black/30 backdrop-blur">
        <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-white" />
        <h1 className="text-2xl font-semibold mb-2">Google sign-in</h1>
        <p className="text-sm text-zinc-300">{message}</p>
      </div>
    </main>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_35%),linear-gradient(180deg,#09090b,#000)] text-white flex items-center justify-center px-6">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-zinc-950/80 p-6 text-center shadow-2xl shadow-black/30 backdrop-blur">
            <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-white" />
            <h1 className="text-2xl font-semibold mb-2">Google sign-in</h1>
            <p className="text-sm text-zinc-300">Finishing sign-in...</p>
          </div>
        </main>
      }
    >
      <AuthCallbackContent />
    </Suspense>
  );
}
