"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Insights from "@/components/Insights";
import TopProblem from "@/components/TopProblem";
import Scores from "@/components/Scores";
import Preview from "@/components/Preview";
import type { GeneratedPayload, GenerateApiErrorBody } from "@/lib/generated";
import { supabase } from "@/lib/supabase";
import { MAX_REVIEW_INPUT_CHARS } from "@/lib/review-input";

export default function Home() {
  const [input, setInput] = useState("");
  const [tone, setTone] = useState("Professional");
  const [data, setData] = useState<GeneratedPayload | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let mounted = true;

    const checkUser = async () => {
      const { data: userData } = await supabase.auth.getUser();

      if (!mounted) return;

      if (!userData.user) {
        router.replace("/login");
        return;
      }

      setAuthReady(true);
    };

    checkUser();

    return () => {
      mounted = false;
    };
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/login");
  };

  const handleGenerate = async () => {
    const cleanedInput = input.trim();

    if (!cleanedInput) {
      setError("Paste some reviews first.");
      return;
    }

    if (cleanedInput.length > MAX_REVIEW_INPUT_CHARS) {
      setError(
        `Your input is too long for the current AI limit. Keep it under ${MAX_REVIEW_INPUT_CHARS} characters or split into smaller batches.`,
      );
      return;
    }

    setLoading(true);
    setError(null);
    setData(null);

    try {
      const res = await axios.post("/api/generate", {
        reviews: cleanedInput,
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
        const details =
          typeof responseObject?.details === "string" ? responseObject.details : "";

        const parts = [
          message,
          code ? `Code: ${code}` : "",
          hint,
          details,
        ].filter(Boolean);

        setError(parts.join("\n"));
      } else {
        setError("Request failed.");
      }
    } finally {
      setLoading(false);
    }
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
      <div className="absolute w-[500px] h-[500px] bg-purple-500/20 blur-[120px] rounded-full top-[-100px] left-[-100px] pointer-events-none" />
      <div className="absolute w-[500px] h-[500px] bg-blue-500/20 blur-[120px] rounded-full bottom-[-100px] right-[-100px] pointer-events-none" />

      <div className="relative z-10 w-full flex flex-col items-center">
        <div className="w-full max-w-5xl flex justify-end mb-4">
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg border border-white/20 bg-white/5 text-sm hover:bg-white/10 transition"
          >
            Logout
          </button>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          InsightFlow
        </h1>

        <p className="text-gray-400 text-center max-w-xl mb-8">
          Turn user feedback into high-converting landing pages instantly
        </p>

        <textarea
          value={input}
          onChange={(e) => {
            const next = e.target.value;
            if (next.length <= MAX_REVIEW_INPUT_CHARS) {
              setInput(next);
              return;
            }

            setInput(next.slice(0, MAX_REVIEW_INPUT_CHARS));
            setError(
              `Input capped at ${MAX_REVIEW_INPUT_CHARS} characters for reliable generation.`,
            );
          }}
          placeholder="Paste user reviews here..."
          className="w-full max-w-2xl h-40 p-4 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.15)] backdrop-blur-xl mb-4"
        />

        <p className="w-full max-w-2xl -mt-2 mb-4 text-right text-xs text-gray-400">
          {input.length}/{MAX_REVIEW_INPUT_CHARS}
        </p>

        <div className="flex gap-3 mb-4">
          {["Professional", "Casual", "Luxury"].map((t) => (
            <button
              key={t}
              onClick={() => setTone(t)}
              className={`px-4 py-2 rounded-xl border transition ${
                tone === t ? "bg-purple-500" : "bg-white/10 border-white/20"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-purple-500 to-blue-500 hover:scale-105 transition duration-300 shadow-[0_0_20px_rgba(168,85,247,0.4)] disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
        >
          {loading ? "Analyzing..." : "Generate Insights"}
        </button>

        {loading && (
          <div className="mt-6 flex items-center gap-2 text-purple-400">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" />
            <div
              className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
              style={{ animationDelay: "150ms" }}
            />
            <div
              className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
              style={{ animationDelay: "300ms" }}
            />
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
              <summary className="cursor-pointer text-sm text-gray-300">
                View raw JSON
              </summary>
              <pre className="mt-3 overflow-auto text-xs text-gray-200">
                {JSON.stringify(data, null, 2)}
              </pre>
            </details>
          </div>
        )}
      </div>
    </main>
  );
}
