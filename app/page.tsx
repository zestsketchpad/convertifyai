"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { useRouter } from "next/navigation";
import ConvertifyAIPage from "@/components/reviewflow/ReviewFlowPage";
import AuthModal from "@/components/AuthModal";
import { supabase } from "@/lib/supabase";

const GATED_TEXT_PATTERNS = [
  /get started/i,
  /submit a review/i,
  /submit your first review/i,
  /view live dashboard/i,
  /view live demo/i,
  /sign in/i,
  /log in/i,
  /login/i,
  /dashboard/i,
  /analytics/i,
];

const GATED_HREF_PATTERNS = ["/login", "/register", "#submit", "#reviews", "#dashboard", "#analytics"];

function shouldGateInteractive(target: HTMLElement | null) {
  const interactive = target?.closest("a,button");
  if (!interactive) return false;

  if (interactive.getAttribute("data-auth-skip") === "true") return false;

  const text = (interactive.textContent || "").trim();
  const href = interactive instanceof HTMLAnchorElement ? interactive.getAttribute("href") || "" : "";

  if (GATED_TEXT_PATTERNS.some((pattern) => pattern.test(text))) return true;
  if (GATED_HREF_PATTERNS.some((pattern) => href.toLowerCase().includes(pattern))) return true;

  return false;
}

export default function Home() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoaded, setAuthLoaded] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  useEffect(() => {
    let active = true;

    const loadSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!active) return;

      setIsAuthenticated(Boolean(data.session));
      setAuthLoaded(true);
    };

    loadSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(Boolean(session));
      if (session) setAuthOpen(false);
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  const goToPrompt = () => {
    setAuthOpen(false);
    router.push("/prompt");
  };

  const onLandingClickCapture = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement | null;
    if (!shouldGateInteractive(target)) return;

    event.preventDefault();
    event.stopPropagation();

    if (isAuthenticated) {
      goToPrompt();
      return;
    }

    setAuthOpen(true);
  };

  if (!authLoaded) {
    return (
      <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_35%),linear-gradient(180deg,#09090b,#000)] text-white flex items-center justify-center px-6">
        <p className="text-zinc-300">Loading landing page...</p>
      </main>
    );
  }

  return (
    <>
      <div onClickCapture={onLandingClickCapture}>
        <ConvertifyAIPage />
      </div>

      <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        onSuccess={goToPrompt}
      />
    </>
  );
}