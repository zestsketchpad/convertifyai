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
  const [passwordStrength, setPasswordStrength] = useState(0);

  useEffect(() => {
    const checkExistingSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error?.message?.toLowerCase().includes("refresh token")) {
        await supabase.auth.signOut({ scope: "local" });
        return;
      }

      if (data.session) {
        router.replace("/");
      }
    };

    checkExistingSession();
  }, [router]);

  const calculatePasswordStrength = (pwd: string) => {
    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (pwd.length >= 12) strength++;
    if (/[A-Z]/.test(pwd)) strength++;
    if (/[0-9]/.test(pwd)) strength++;
    if (/[^A-Za-z0-9]/.test(pwd)) strength++;
    setPasswordStrength(strength);
  };

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
      router.replace("/");
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

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 2) return "#EF4444";
    if (passwordStrength < 4) return "#F97316";
    return "#10B981";
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-10" style={{
      background: "var(--white)",
      color: "var(--text)",
      fontFamily: "'DM Sans', sans-serif"
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300;12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

        :root {
          --brand: #F97316;
          --brand-light: #FFF7ED;
          --brand-dark: #EA580C;
          --indigo: #6366F1;
          --indigo-light: #EEF2FF;
          --green: #22C55E;
          --green-light: #F0FDF4;
          --red: #EF4444;
          --red-light: #FEF2F2;
          --amber: #F59E0B;
          --amber-light: #FFFBEB;
          --text: #0F172A;
          --text-2: #475569;
          --text-3: #94A3B8;
          --border: #E2E8F0;
          --border-2: #CBD5E1;
          --surface: #F8FAFC;
          --white: #FFFFFF;
          --radius: 16px;
          --radius-sm: 10px;
          --radius-xs: 8px;
          --shadow-sm: 0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
          --shadow: 0 4px 16px rgba(0,0,0,0.06), 0 2px 6px rgba(0,0,0,0.04);
          --shadow-lg: 0 20px 40px rgba(0,0,0,0.08), 0 8px 16px rgba(0,0,0,0.04);
        }
        
        .dark {
          --brand-light: #1f1307;
          --indigo-light: #1b1f3a;
          --green-light: #102417;
          --red-light: #2a1518;
          --amber-light: #2b210f;
          --text: #E2E8F0;
          --text-2: #CBD5E1;
          --text-3: #94A3B8;
          --border: #334155;
          --border-2: #475569;
          --surface: #0F172A;
          --white: #020617;
          --shadow-sm: 0 1px 3px rgba(0,0,0,0.45), 0 1px 2px rgba(0,0,0,0.35);
          --shadow: 0 6px 18px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.4);
          --shadow-lg: 0 20px 40px rgba(0,0,0,0.55), 0 8px 16px rgba(0,0,0,0.45);
        }
        
        .input-field {
          background: var(--surface);
          border: 1px solid var(--border);
          color: var(--text);
          transition: all 0.3s ease;
          font-family: 'DM Sans', sans-serif;
        }
        .input-field:focus {
          outline: none;
          border-color: var(--brand);
          box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.1);
          background: var(--white);
        }
        .input-field::placeholder {
          color: var(--text-3);
        }
      `}</style>
      
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2" style={{ color: "var(--text)" }}>
            Create account
          </h1>
          <p className="text-base" style={{ color: "var(--text-3)" }}>
            Join us to convert ideas into action
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl backdrop-blur-xl" style={{
          background: `var(--white)`,
          border: `1px solid var(--border)`,
          boxShadow: `var(--shadow-lg)`
        }}>
          <div className="p-8 sm:p-10">
            <form onSubmit={onSubmit} className="space-y-5">
              {/* Email */}
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

              {/* Password */}
              <div>
                <label htmlFor="password" className="text-sm font-semibold block mb-2" style={{ color: "var(--text)", fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    calculatePasswordStrength(e.target.value);
                  }}
                  required
                  minLength={6}
                  className="input-field w-full px-4 py-3 rounded-lg text-sm"
                />
                {password && (
                  <div className="mt-2">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className="flex-1 h-1 rounded-full transition-all"
                          style={{
                            background: i < passwordStrength ? getPasswordStrengthColor() : "var(--border)"
                          }}
                        />
                      ))}
                    </div>
                    <p className="text-xs mt-1" style={{ color: getPasswordStrengthColor() }}>
                      {passwordStrength < 2 && "Weak password"}
                      {passwordStrength === 2 && "Fair password"}
                      {passwordStrength === 3 && "Good password"}
                      {passwordStrength === 4 && "Strong password"}
                      {passwordStrength === 5 && "Very strong password"}
                    </p>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-semibold mb-2" style={{ color: "var(--text)", fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                  Confirm password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={6}
                  className="input-field w-full px-4 py-3 rounded-lg text-sm"
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-3 rounded-lg flex items-start gap-3" style={{ background: "var(--red-light)", color: "var(--red)" }}>
                  <span className="text-lg leading-none mt-0.5">⚠️</span>
                  <p className="text-sm">{error}</p>
                </div>
              )}

              {/* Success Message */}
              {message && (
                <div className="p-3 rounded-lg flex items-start gap-3" style={{ background: "var(--green-light)", color: "var(--green)" }}>
                  <span className="text-lg leading-none mt-0.5">✓</span>
                  <p className="text-sm">{message}</p>
                </div>
              )}

              {/* Create Account Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-300 transform active:scale-95" style={{
                  background: loading ? "var(--text-3)" : "var(--brand)",
                  opacity: loading ? 0.7 : 1,
                  cursor: loading ? "not-allowed" : "pointer",
                  fontFamily: "'Bricolage Grotesque', sans-serif"
                }}
                onMouseEnter={(e) => !loading && (e.currentTarget.style.background = "var(--brand-dark)")}
                onMouseLeave={(e) => !loading && (e.currentTarget.style.background = "var(--brand)")}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Creating account...
                  </span>
                ) : (
                  "Create account"
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-3">
              <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
              <span className="text-xs font-medium" style={{ color: "var(--text-3)", fontFamily: "'DM Sans', sans-serif" }}>OR</span>
              <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
            </div>

            {/* Google Sign Up */}
            <button
              type="button"
              onClick={signUpWithGoogle}
              disabled={googleLoading}
              className="w-full py-3 px-4 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-3" style={{
                background: "var(--surface)",
                color: "var(--text)",
                border: `1px solid var(--border)`,
                opacity: googleLoading ? 0.7 : 1,
                cursor: googleLoading ? "not-allowed" : "pointer",
                fontFamily: "'DM Sans', sans-serif"
              }}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              {googleLoading ? "Connecting..." : "Continue with Google"}
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-sm" style={{ color: "var(--text-3)" }}>
          Already have an account?{" "}
          <Link href="/login" className="font-semibold transition" style={{ color: "var(--brand)" }}>
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
