"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { toFriendlyAuthError } from "@/lib/auth-errors";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkExistingSession = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        router.replace("/");
      }
    };

    checkExistingSession();
  }, [router]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(toFriendlyAuthError(signInError));
      setLoading(false);
      return;
    }

    router.replace("/");
    router.refresh();
  };

  const signInWithGoogle = async () => {
    setGoogleLoading(true);
    setError(null);

    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (oauthError) {
      setError(toFriendlyAuthError(oauthError));
      setGoogleLoading(false);
      return;
    }
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_35%),linear-gradient(180deg,#09090b,#000)] text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-zinc-950/80 p-6 shadow-2xl shadow-black/30 backdrop-blur">
        <h1 className="text-2xl font-semibold mb-2">Welcome back</h1>
        <p className="text-sm text-zinc-300 mb-6">Sign in to continue to your dashboard.</p>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm mb-2 text-zinc-200">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded bg-zinc-800 px-3 py-2 outline-none ring-1 ring-zinc-700 focus:ring-zinc-400"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm mb-2 text-zinc-200">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded bg-zinc-800 px-3 py-2 outline-none ring-1 ring-zinc-700 focus:ring-zinc-400"
            />
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded bg-white text-black py-2 font-medium transition hover:bg-zinc-200 disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-zinc-500">
          <span className="h-px flex-1 bg-white/10" />
          <span>Or</span>
          <span className="h-px flex-1 bg-white/10" />
        </div>

        <button
          type="button"
          onClick={signInWithGoogle}
          disabled={googleLoading}
          className="w-full rounded border border-white/10 bg-white/5 px-4 py-2 font-medium text-white transition hover:bg-white/10 disabled:opacity-60"
        >
          {googleLoading ? "Connecting to Google..." : "Continue with Google"}
        </button>

        <p className="mt-6 text-sm text-zinc-400 text-center">
          New here?{" "}
          <Link href="/register" className="text-white underline underline-offset-4">
            Create an account
          </Link>
        </p>
      </div>
    </main>
  );
}
