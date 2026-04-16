"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { globalStyles } from "@/components/reviewflow/config";
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
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        router.replace("/prompt");
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

    router.replace("/prompt");
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
    <main
      className="min-h-screen flex items-center justify-center px-4 py-10"
      style={{ background: "var(--white)", color: "var(--text)", fontFamily: "'DM Sans', sans-serif" }}
    >
      <style>{globalStyles}</style>

      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1
            className="text-4xl font-bold mb-2"
            style={{ color: "var(--text)", fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700 }}
          >
            Welcome back
          </h1>
          <p className="text-base" style={{ color: "var(--text-3)" }}>
            Sign in to access your dashboard
          </p>
        </div>

        <div className="rounded-2xl backdrop-blur-xl" style={{ background: "var(--white)", border: "1px solid var(--border)", boxShadow: "var(--shadow-lg)" }}>
          <div className="p-8 sm:p-10">
            <form onSubmit={onSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold mb-2" style={{ color: "var(--text)", fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="input-field w-full px-4 py-3 rounded-lg text-sm"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="password" className="text-sm font-semibold" style={{ color: "var(--text)", fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                    Password
                  </label>
                  <a href="#" className="text-xs font-medium transition" style={{ color: "var(--brand)" }}>
                    Forgot password?
                  </a>
                </div>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="input-field w-full px-4 py-3 rounded-lg text-sm"
                />
              </div>

              {error && (
                <div className="p-3 rounded-lg flex items-start gap-3" style={{ background: "var(--red-light)", color: "var(--red)" }}>
                  <span className="text-lg leading-none mt-0.5">⚠️</span>
                  <p className="text-sm">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-300 transform active:scale-95"
                style={{
                  background: loading ? "var(--text-3)" : "var(--brand)",
                  opacity: loading ? 0.7 : 1,
                  cursor: loading ? "not-allowed" : "pointer",
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                }}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Signing in...
                  </span>
                ) : (
                  "Sign in"
                )}
              </button>
            </form>

            <div className="my-6 flex items-center gap-3">
              <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
              <span className="text-xs font-medium" style={{ color: "var(--text-3)", fontFamily: "'DM Sans', sans-serif" }}>OR</span>
              <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
            </div>

            <button
              type="button"
              onClick={signInWithGoogle}
              disabled={googleLoading}
              className="w-full py-3 px-4 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-3"
              style={{
                background: "var(--surface)",
                color: "var(--text)",
                border: "1px solid var(--border)",
                opacity: googleLoading ? 0.7 : 1,
                cursor: googleLoading ? "not-allowed" : "pointer",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              {googleLoading ? "Connecting..." : "Continue with Google"}
            </button>
          </div>
        </div>

        <p className="mt-6 text-center text-sm" style={{ color: "var(--text-3)" }}>
          New here?{" "}
          <Link href="/register" className="font-semibold transition" style={{ color: "var(--brand)" }}>
            Create an account
          </Link>
        </p>
      </div>
    </main>
  );
}
