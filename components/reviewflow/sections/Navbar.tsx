
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { supabase } from "@/lib/supabase";

export default function Navbar() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    let active = true;

    const loadSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (active) {
        setIsAuthenticated(Boolean(data.session));
      }
    };

    loadSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(Boolean(session));
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  const onLogout = async () => {
    await supabase.auth.signOut({ scope: "local" });
    setIsAuthenticated(false);
    router.refresh();
  };

  return (
    <nav className="rf-navbar" style={{ position: "fixed", top: 14, left: "50%", transform: "translateX(-50%)", zIndex: 120, width: "min(1120px, calc(100% - 28px))", background: "color-mix(in srgb, var(--white) 84%, transparent)", backdropFilter: "blur(16px)", border: "1px solid color-mix(in srgb, var(--border) 78%, transparent)", borderRadius: 999, padding: "0 16px 0 14px", height: 66, display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 12px 28px rgba(2,6,23,0.14), 0 2px 8px rgba(2,6,23,0.08)" }}>
      <a href="#home" style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 20, color: "var(--text)", textDecoration: "none" }}>
        <div style={{ width: 36, height: 36, borderRadius: 11, position: "relative", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #F97316 0%, #FB923C 40%, #6366F1 100%)", boxShadow: "0 0 0 1px rgba(255,255,255,0.12) inset, 0 8px 22px rgba(99,102,241,0.35)" }}>
          <span style={{ position: "absolute", top: 3, right: 4, fontSize: 9, color: "#FFFFFF", opacity: 0.95 }}>✦</span>
          <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 12, fontWeight: 800, letterSpacing: -0.3, color: "#FFFFFF", textShadow: "0 1px 8px rgba(0,0,0,0.2)" }}>CA</span>
        </div>
        Convertify AI
      </a>
      <ul className="nav-links-desktop" style={{ display: "flex", alignItems: "center", gap: 32, listStyle: "none" }}>
        {["Features", "Dashboard", "Analytics", "Pricing"].map((item) => (
          <li key={item}>
            <a href={`#${item.toLowerCase()}`} className="nav-link" style={{ fontSize: 14, fontWeight: 500, color: "var(--text-2)", textDecoration: "none" }}>
              {item}
            </a>
          </li>
        ))}
      </ul>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {isAuthenticated ? (
          <button onClick={onLogout} className="btn-ghost-nav" style={{ padding: "9px 20px", borderRadius: 50, fontSize: 14, fontFamily: "'DM Sans', sans-serif", fontWeight: 500, cursor: "pointer", border: "1.5px solid var(--border)", background: "color-mix(in srgb, var(--white) 65%, transparent)", color: "var(--text-2)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6 }}>
            Logout
          </button>
        ) : (
          <a href="/login" className="btn-ghost-nav" style={{ padding: "9px 20px", borderRadius: 50, fontSize: 14, fontFamily: "'DM Sans', sans-serif", fontWeight: 500, cursor: "pointer", border: "1.5px solid var(--border)", background: "color-mix(in srgb, var(--white) 65%, transparent)", color: "var(--text-2)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6 }}>Sign In</a>
        )}
        <a href="/register" className="btn-brand-nav" style={{ padding: "9px 20px", borderRadius: 50, fontSize: 14, fontFamily: "'DM Sans', sans-serif", fontWeight: 500, cursor: "pointer", border: "none", background: "var(--brand)", color: "white", boxShadow: "0 2px 8px rgba(249,115,22,0.3)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6, transition: "all 0.2s" }}>Get Started ↗</a>
        <AnimatedThemeToggler style={{ width: 34, height: 34, borderRadius: 999, border: "1px solid var(--border)", background: "color-mix(in srgb, var(--white) 70%, transparent)", color: "var(--text)", display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }} aria-label="Toggle theme" />
      </div>
    </nav>
  );
}
