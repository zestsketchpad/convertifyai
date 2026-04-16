"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { getUserDisplayName } from "@/lib/auth-user";
import { supabase } from "@/lib/supabase";

type NavbarVariant = "landing" | "prompt";

type NavbarProps = {
  variant?: NavbarVariant;
};

export default function Navbar({ variant = "landing" }: NavbarProps) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [displayName, setDisplayName] = useState("Account");

  useEffect(() => {
    let active = true;

    const loadSession = async () => {
      const [{ data: sessionData }, { data: userData }] = await Promise.all([
        supabase.auth.getSession(),
        supabase.auth.getUser(),
      ]);

      if (!active) {
        return;
      }

      setIsAuthenticated(Boolean(sessionData.session));
      setDisplayName(getUserDisplayName(userData.user));
    };

    loadSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(Boolean(session));
      setDisplayName(getUserDisplayName(session?.user ?? null));
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  const onLogout = async () => {
    await supabase.auth.signOut({ scope: "local" });
    setIsAuthenticated(false);
    setDisplayName("Account");
    router.refresh();

    if (variant === "prompt") {
      router.replace("/");
    }
  };

  const homeHref = variant === "prompt" ? "/" : "#home";

  return (
    <nav
      className="rf-navbar"
      style={{
        position: "fixed",
        top: 14,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 120,
        width: "min(1120px, calc(100% - 28px))",
        background: "color-mix(in srgb, var(--white) 84%, transparent)",
        backdropFilter: "blur(16px)",
        border: "1px solid color-mix(in srgb, var(--border) 78%, transparent)",
        borderRadius: 999,
        padding: "0 16px 0 14px",
        height: 66,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 12px 28px rgba(2,6,23,0.14), 0 2px 8px rgba(2,6,23,0.08)",
      }}
    >
      <a
        href={homeHref}
        data-auth-skip="true"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          fontFamily: "'Bricolage Grotesque', sans-serif",
          fontWeight: 700,
          fontSize: 20,
          color: "var(--text)",
          textDecoration: "none",
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 11,
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, #F97316 0%, #FB923C 40%, #6366F1 100%)",
            boxShadow: "0 0 0 1px rgba(255,255,255,0.12) inset, 0 8px 22px rgba(99,102,241,0.35)",
          }}
        >
          <span
            style={{
              position: "absolute",
              top: 3,
              right: 4,
              fontSize: 9,
              color: "#FFFFFF",
              opacity: 0.95,
            }}
          >
            ✦
          </span>
          <span
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontSize: 12,
              fontWeight: 800,
              letterSpacing: -0.3,
              color: "#FFFFFF",
              textShadow: "0 1px 8px rgba(0,0,0,0.2)",
            }}
          >
            CA
          </span>
        </div>
        Convertify AI
      </a>

      {variant === "landing" ? (
        <ul
          className="nav-links-desktop"
          style={{ display: "flex", alignItems: "center", gap: 32, listStyle: "none" }}
        >
          {[
            "Features",
            "Dashboard",
            "Analytics",
            "Pricing",
          ].map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                className="nav-link"
                data-auth-skip="true"
                style={{ fontSize: 14, fontWeight: 500, color: "var(--text-2)", textDecoration: "none" }}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <div style={{ display: "flex", alignItems: "center", gap: 10, color: "var(--text-2)", fontSize: 14, fontWeight: 500 }}>
          <span style={{ opacity: 0.7 }}>Main prompt window</span>
        </div>
      )}

      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {isAuthenticated ? (
          <>
            <span
              data-auth-skip="true"
              title={displayName}
              style={{
                padding: "9px 16px",
                borderRadius: 999,
                fontSize: 13,
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600,
                border: "1px solid var(--border)",
                background: "color-mix(in srgb, var(--white) 72%, transparent)",
                color: "var(--text)",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                maxWidth: 180,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 999,
                  background: "linear-gradient(135deg, #FB923C 0%, #6366F1 100%)",
                  flex: "none",
                }}
              />
              <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>{displayName}</span>
            </span>

            {variant === "prompt" ? (
              <button
                type="button"
                data-auth-skip="true"
                onClick={() => router.replace("/")}
                className="btn-ghost-nav"
                style={{ padding: "9px 18px", borderRadius: 50, fontSize: 14, fontFamily: "'DM Sans', sans-serif", fontWeight: 500, cursor: "pointer", border: "1.5px solid var(--border)", background: "color-mix(in srgb, var(--white) 65%, transparent)", color: "var(--text-2)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6 }}
              >
                Back to Home
              </button>
            ) : (
              <a
                href="/prompt"
                data-auth-skip="true"
                className="btn-ghost-nav"
                style={{ padding: "9px 18px", borderRadius: 50, fontSize: 14, fontFamily: "'DM Sans', sans-serif", fontWeight: 500, cursor: "pointer", border: "1.5px solid var(--border)", background: "color-mix(in srgb, var(--white) 65%, transparent)", color: "var(--text-2)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6 }}
              >
                Open Prompt
              </a>
            )}

            <button
              type="button"
              data-auth-skip="true"
              onClick={onLogout}
              className="btn-ghost-nav"
              style={{ padding: "9px 20px", borderRadius: 50, fontSize: 14, fontFamily: "'DM Sans', sans-serif", fontWeight: 500, cursor: "pointer", border: "1.5px solid var(--border)", background: "color-mix(in srgb, var(--white) 65%, transparent)", color: "var(--text-2)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6 }}
            >
              Logout
            </button>
          </>
        ) : variant === "prompt" ? (
          <button
            type="button"
            data-auth-skip="true"
            onClick={() => router.replace("/")}
            className="btn-ghost-nav"
            style={{ padding: "9px 18px", borderRadius: 50, fontSize: 14, fontFamily: "'DM Sans', sans-serif", fontWeight: 500, cursor: "pointer", border: "1.5px solid var(--border)", background: "color-mix(in srgb, var(--white) 65%, transparent)", color: "var(--text-2)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6 }}
          >
            Back to Home
          </button>
        ) : (
          <button
            type="button"
            className="btn-ghost-nav"
            style={{ padding: "9px 20px", borderRadius: 50, fontSize: 14, fontFamily: "'DM Sans', sans-serif", fontWeight: 500, cursor: "pointer", border: "1.5px solid var(--border)", background: "color-mix(in srgb, var(--white) 65%, transparent)", color: "var(--text-2)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6 }}
          >
            Sign In
          </button>
        )}

        {variant === "landing" ? (
          <a
            href="/register"
            className="btn-brand-nav"
            data-auth-skip="true"
            style={{ padding: "9px 20px", borderRadius: 50, fontSize: 14, fontFamily: "'DM Sans', sans-serif", fontWeight: 500, cursor: "pointer", border: "none", background: "var(--brand)", color: "white", boxShadow: "0 2px 8px rgba(249,115,22,0.3)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6, transition: "all 0.2s" }}
          >
            Get Started ↗
          </a>
        ) : null}

        <AnimatedThemeToggler
          style={{ width: 34, height: 34, borderRadius: 999, border: "1px solid var(--border)", background: "color-mix(in srgb, var(--white) 70%, transparent)", color: "var(--text)", display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
          aria-label="Toggle theme"
          data-auth-skip="true"
        />
      </div>
    </nav>
  );
}
