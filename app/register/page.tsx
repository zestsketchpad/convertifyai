"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { toFriendlyAuthError } from "@/lib/auth-errors";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const checkExistingSession = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        router.replace("/prompt");
      }
    };

    checkExistingSession();
  }, [router]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      setError(toFriendlyAuthError(signUpError));
      setLoading(false);
      return;
    }

    if (data.session) {
      router.replace("/prompt");
      router.refresh();
      return;
    }

    setMessage("Account created. Check your email to confirm your sign-up, then sign in.");
    setLoading(false);
  };

  const signUpWithGoogle = async () => {
    setGoogleLoading(true);
    setError(null);
    setMessage(null);

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
        <h1 className="text-2xl font-semibold mb-2">Create account</h1>
        <p className="text-sm text-zinc-300 mb-6">Register to start generating conversion ideas.</p>

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
              minLength={6}
              className="w-full rounded bg-zinc-800 px-3 py-2 outline-none ring-1 ring-zinc-700 focus:ring-zinc-400"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm mb-2 text-zinc-200">
              Confirm password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
              className="w-full rounded bg-zinc-800 px-3 py-2 outline-none ring-1 ring-zinc-700 focus:ring-zinc-400"
            />
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}
          {message && <p className="text-sm text-emerald-400">{message}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded bg-white text-black py-2 font-medium transition hover:bg-zinc-200 disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-zinc-500">
          <span className="h-px flex-1 bg-white/10" />
          <span>Or</span>
          <span className="h-px flex-1 bg-white/10" />
        </div>

        <button
          type="button"
          onClick={signUpWithGoogle}
          disabled={googleLoading}
          className="w-full rounded border border-white/10 bg-white/5 px-4 py-2 font-medium text-white transition hover:bg-white/10 disabled:opacity-60"
        >
          {googleLoading ? "Connecting to Google..." : "Continue with Google"}
        </button>

        <p className="mt-6 text-sm text-zinc-400 text-center">
          Already have an account?{" "}
          <Link href="/login" className="text-white underline underline-offset-4">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
