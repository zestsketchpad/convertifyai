"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Insights from "@/components/Insights";
import TopProblem from "@/components/TopProblem";
import Scores from "@/components/Scores";
import Preview from "@/components/Preview";
import { globalStyles } from "@/components/reviewflow/config";
import { getUserDisplayName } from "@/lib/auth-user";
import type { GeneratedPayload, GenerateApiErrorBody } from "@/lib/generated";
import { supabase } from "@/lib/supabase";

export default function PromptPage() {
  const [input, setInput] = useState("");
  const [tone, setTone] = useState("Professional");
  const [data, setData] = useState<GeneratedPayload | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [displayName, setDisplayName] = useState("Account");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let mounted = true;

    const checkUser = async () => {
      const [{ data: sessionData }, { data: userData }] = await Promise.all([
        supabase.auth.getSession(),
        supabase.auth.getUser(),
      ]);

      if (!mounted) {
        return;
      }

      if (!sessionData.session) {
        router.replace("/");
        return;
      }

      setIsAuthenticated(true);
      setDisplayName(getUserDisplayName(userData.user));
      setAuthReady(true);
    };

    checkUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(Boolean(session));
      if (session) {
        setDisplayName(getUserDisplayName(session.user));
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [router]);

  const handleGenerate = async () => {
    if (!input.trim()) {
      setError("Paste some reviews first.");
      return;
    }

    setLoading(true);
    setError(null);
    setData(null);

    try {
      const res = await axios.post("/api/generate", {
        reviews: input,
        tone,
      });
      setData(res.data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const responseData = err.response?.data as GenerateApiErrorBody | string | undefined;
        const responseObject =
          typeof responseData === "string" || !responseData ? undefined : responseData;
        const message =
          typeof responseObject?.error === "string"
            ? responseObject.error
            : typeof responseData === "string"
              ? responseData
              : err.message;
        const code = typeof responseObject?.code === "string" ? responseObject.code : "";
        const hint = typeof responseObject?.hint === "string" ? responseObject.hint : "";
        const details = typeof responseObject?.details === "string" ? responseObject.details : "";

        const parts = [message, code ? `Code: ${code}` : "", hint, details].filter(Boolean);
        setError(parts.join("\n"));
      } else {
        setError("Request failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  const onLogout = async () => {
    await supabase.auth.signOut({ scope: "local" });
    router.replace("/");
  };

  if (!authReady) {
    return (
      <main className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center p-6">
        <p className="text-gray-300">Checking session...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center p-6 relative overflow-hidden">
      <style>{globalStyles}</style>
      <div className="absolute w-125 h-125 bg-purple-500/20 blur-[120px] rounded-full -top-25 -left-25 pointer-events-none" />
      <div className="absolute w-125 h-125 bg-blue-500/20 blur-[120px] rounded-full -bottom-25 -right-25 pointer-events-none" />

      <div className="fixed top-4 right-4 z-20 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-xl">
        <span className="rounded-full bg-white/10 px-3 py-1 text-sm text-white/90">{displayName}</span>
        <button onClick={() => router.replace("/")} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-zinc-200 transition hover:bg-white/10">
          Back to Home
        </button>
        <button onClick={onLogout} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-zinc-200 transition hover:bg-white/10">
          Logout
        </button>
      </div>

      <div className="relative z-10 w-full flex flex-col items-center pt-12">
        <h1 className="display text-4xl md:text-5xl font-bold mb-6 text-center bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          InsightFlow
        </h1>

        <p className="text-gray-400 text-center max-w-xl mb-8">
          Turn user feedback into high-converting landing pages instantly
        </p>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste user reviews here..."
          className="w-full max-w-2xl h-40 p-4 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.15)] backdrop-blur-xl mb-4"
        />

        <div className="flex gap-3 mb-4 flex-wrap justify-center">
          {["Professional", "Casual", "Luxury"].map((t) => (
            <button
              key={t}
              onClick={() => setTone(t)}
              className={`px-4 py-2 rounded-xl border transition ${tone === t ? "bg-purple-500" : "bg-white/10 border-white/20"}`}
            >
              {t}
            </button>
          ))}
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="px-6 py-3 rounded-xl font-semibold bg-linear-to-r from-purple-500 to-blue-500 hover:scale-105 transition duration-300 shadow-[0_0_20px_rgba(168,85,247,0.4)] disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
        >
          {loading ? "Analyzing..." : "Generate Insights"}
        </button>

        {loading && (
          <div className="mt-6 flex items-center gap-2 text-purple-400">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
            <span className="ml-2">Analyzing feedback...</span>
          </div>
        )}

        {error && (
          <p className="mt-4 w-full max-w-2xl text-red-300 whitespace-pre-wrap">
            {error}
          </p>
        )}

        {data && (
          <div className="mt-10 space-y-8 w-full max-w-4xl">
            <Insights data={data} />
            <TopProblem data={data} />
            <Scores data={data} />
            <Preview data={data} />

            <details className="bg-white/5 backdrop-blur-xl p-4 rounded-2xl border border-white/10 shadow-[0_0_25px_rgba(168,85,247,0.08)]">
              <summary className="cursor-pointer text-sm text-gray-300">View raw JSON</summary>
              <pre className="mt-3 overflow-auto text-xs text-gray-200">{JSON.stringify(data, null, 2)}</pre>
            </details>
          </div>
        )}
      </div>
    </main>
  );
}
