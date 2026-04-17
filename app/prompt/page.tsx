"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import Insights from "@/components/Insights";
import TopProblem from "@/components/TopProblem";
import Scores from "@/components/Scores";
import Preview from "@/components/Preview";
import GeneratedWebsiteInteractivity from "@/components/GeneratedWebsiteInteractivity";
import { SystemRenderer } from "@/components/SystemRenderer";
import { getUserDisplayName } from "@/lib/auth-user";
import { Strategy } from "@/lib/types";
import { applyRules } from "@/lib/rules";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const [input, setInput] = useState("");
  const [inputMode, setInputMode] = useState<"reviews" | "maps">("reviews");
  const [tone, setTone] = useState("Professional");
  const [data, setData] = useState<any>(null);
  const [strategy, setStrategy] = useState<Strategy | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [useNewSystem, setUseNewSystem] = useState(true);
  const [displayName, setDisplayName] = useState("Account");
  const [shareUrl, setShareUrl] = useState("");
  const [shareExpiresAt, setShareExpiresAt] = useState("");
  const [shareLoading, setShareLoading] = useState(false);
  const [shareError, setShareError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const loadUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (!mounted) return;
      setDisplayName(getUserDisplayName(data.user));
    };

    loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setDisplayName(getUserDisplayName(session?.user));
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const handleGenerate = async () => {
    if (!input.trim()) {
      setError(inputMode === "maps" ? "Paste a Google Maps link first." : "Paste some reviews first.");
      return;
    }

    setLoading(true);
    setError(null);
    setData(null);
    setStrategy(null);
    setShareUrl("");
    setShareExpiresAt("");
    setShareError(null);

    try {
      let reviewsText = input;

      if (inputMode === "maps") {
        const mapsRes = await axios.post("/api/maps", {
          mapsUrl: input,
        });

        const placeName = typeof mapsRes.data?.place?.name === "string" ? mapsRes.data.place.name : "Google Maps place";
        const fetchedReviews = Array.isArray(mapsRes.data?.reviews) ? mapsRes.data.reviews : [];
        const reviewLines = fetchedReviews
          .map((review: { name?: string; review?: string; rating?: number; time?: string }) => {
            const author = review.name || "Google User";
            const text = review.review || "";
            const rating = typeof review.rating === "number" ? `${review.rating}/5` : "";
            const time = review.time ? ` (${review.time})` : "";
            return `${author}${rating ? ` - ${rating}` : ""}${time}: ${text}`;
          })
          .filter(Boolean)
          .join("\n");

        reviewsText = reviewLines || `${placeName} reviews were fetched, but no review text was returned.`;
      }

      // Step 1: Generate insights
      const insightsRes = await axios.post("/api/generate", {
        reviews: reviewsText,
        tone,
      });
      const insightsData = insightsRes.data;
      setData(insightsData);

      // Step 2: Get strategic decisions
      const strategyRes = await axios.post("/api/strategy", {
        reviews: reviewsText,
        tone,
      });
      const strategyData = strategyRes.data;

      // Step 3: Apply rules to refine strategy
      const { strategy: refinedStrategy, theme } = applyRules(strategyData);
      setStrategy(refinedStrategy);

      // Merge data with theme for rendering
      setData({
        ...insightsData,
        _strategy: refinedStrategy,
        _theme: theme,
        reviewsText,
      });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const responseData = err.response?.data as any;
        const message =
          typeof responseData?.error === "string"
            ? responseData.error
            : typeof responseData === "string"
              ? responseData
              : err.message;
        const code = typeof responseData?.code === "string" ? responseData.code : "";
        const hint = typeof responseData?.hint === "string" ? responseData.hint : "";
        const details =
          typeof responseData?.details === "string" ? responseData.details : "";

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

  const handleCreateShareLink = async () => {
    if (!data) {
      setShareError("Generate a page first, then create a share link.");
      return;
    }

    setShareLoading(true);
    setShareError(null);

    try {
      const response = await axios.post("/api/share/create", {
        data,
        tone,
        useNewSystem,
      });

      const nextUrl = typeof response.data?.shareUrl === "string" ? response.data.shareUrl : "";
      const expiresAt =
        typeof response.data?.expiresAt === "string" ? response.data.expiresAt : "";

      if (!nextUrl) {
        throw new Error("Share link was not generated.");
      }

      setShareUrl(nextUrl);
      setShareExpiresAt(expiresAt);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const message =
          typeof err.response?.data?.error === "string"
            ? err.response.data.error
            : err.message;
        setShareError(message || "Failed to create share link.");
      } else {
        setShareError("Failed to create share link.");
      }
    } finally {
      setShareLoading(false);
    }
  };

  const handleCopyShareLink = async () => {
    if (!shareUrl) return;

    try {
      await navigator.clipboard.writeText(shareUrl);
      setShareError("Link copied to clipboard.");
    } catch {
      setShareError("Copy failed. Please copy the link manually.");
    }
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center p-6 relative overflow-hidden">
      <div className="absolute w-125 h-125 bg-purple-500/20 blur-[120px] rounded-full -top-25 -left-25 pointer-events-none" />
      <div className="absolute w-125 h-125 bg-blue-500/20 blur-[120px] rounded-full -bottom-25 -right-25 pointer-events-none" />

      <div className="relative z-10 w-full flex flex-col items-center">
        <nav className="w-full max-w-5xl mb-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-4 py-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium hover:bg-white/15 transition"
          >
            Back to Home
          </Link>

          <div className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-black/25 p-1">
            <button
              onClick={() => setUseNewSystem(false)}
              className={`px-3 py-1.5 rounded-lg text-sm border transition ${
                !useNewSystem
                  ? "bg-purple-500 border-purple-500"
                  : "bg-transparent border-transparent text-gray-300 hover:text-white"
              }`}
            >
              Classic
            </button>
            <button
              onClick={() => setUseNewSystem(true)}
              className={`px-3 py-1.5 rounded-lg text-sm border transition ${
                useNewSystem
                  ? "bg-blue-500 border-blue-500"
                  : "bg-transparent border-transparent text-gray-300 hover:text-white"
              }`}
            >
              Strategic
            </button>
          </div>

          <div className="inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-gray-100">
            {displayName}
          </div>
        </nav>

        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          InsightFlow
        </h1>

        <p className="text-gray-400 text-center max-w-xl mb-8">
          Turn user feedback into high-converting landing pages instantly
        </p>

        <div className="mb-4 inline-flex rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur-xl">
          <button
            type="button"
            onClick={() => setInputMode("reviews")}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              inputMode === "reviews"
                ? "bg-purple-500 text-white"
                : "text-gray-300 hover:text-white"
            }`}
          >
            Reviews
          </button>
          <button
            type="button"
            onClick={() => setInputMode("maps")}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              inputMode === "maps"
                ? "bg-blue-500 text-white"
                : "text-gray-300 hover:text-white"
            }`}
          >
            Google Map Link
          </button>
        </div>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            inputMode === "maps"
              ? "Paste a Google Maps place link here..."
              : "Paste user reviews here..."
          }
          className="w-full max-w-2xl h-40 p-4 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.15)] backdrop-blur-xl mb-4"
        />

        <div className="flex flex-wrap justify-center gap-3 mb-4">
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
          className="px-6 py-3 rounded-xl font-semibold bg-linear-to-r from-purple-500 to-blue-500 hover:scale-105 transition duration-300 shadow-[0_0_20px_rgba(168,85,247,0.4)] disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
        >
          {loading ? "Analyzing..." : "Generate Insights"}
        </button>

        <div className="mt-4 w-full max-w-2xl rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleCreateShareLink}
              disabled={shareLoading || !data}
              className="px-4 py-2 rounded-lg font-medium bg-white/10 border border-white/20 hover:bg-white/15 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {shareLoading ? "Creating 24h link..." : "Create 24h Share Link"}
            </button>

            {shareUrl && (
              <button
                type="button"
                onClick={handleCopyShareLink}
                className="px-4 py-2 rounded-lg font-medium bg-white/10 border border-white/20 hover:bg-white/15 transition"
              >
                Copy Link
              </button>
            )}
          </div>

          {shareUrl && (
            <div className="mt-3 space-y-1">
              <p className="text-xs text-gray-400">Share link (valid for 24 hours)</p>
              <a
                href={shareUrl}
                target="_blank"
                rel="noreferrer"
                className="text-sm break-all text-blue-300 hover:text-blue-200 underline"
              >
                {shareUrl}
              </a>
              {shareExpiresAt && (
                <p className="text-xs text-gray-400">
                  Expires: {new Date(shareExpiresAt).toLocaleString()}
                </p>
              )}
            </div>
          )}

          {shareError && (
            <p className="mt-3 text-sm text-gray-200">{shareError}</p>
          )}
        </div>

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
          <div className="mt-10 space-y-8 w-full">
            {/* Sidebar analysis */}
            <div className="max-w-4xl mx-auto space-y-4">
              {!useNewSystem && (
                <>
                  <Insights data={data} />
                  <TopProblem data={data} />
                  <Scores data={data} />
                  <GeneratedWebsiteInteractivity>
                    <Preview data={data} tone={tone} />
                  </GeneratedWebsiteInteractivity>
                </>
              )}
            </div>

            {/* New system renderer */}
            {useNewSystem && data._strategy && data._theme && (
              <div className="w-full">
                <GeneratedWebsiteInteractivity>
                  <SystemRenderer
                    strategy={data._strategy}
                    data={data}
                    theme={data._theme}
                    showExplanation={true}
                  />
                </GeneratedWebsiteInteractivity>
              </div>
            )}

            <div className="max-w-4xl mx-auto">
              <details className="bg-white/5 backdrop-blur-xl p-4 rounded-2xl border border-white/10 shadow-[0_0_25px_rgba(168,85,247,0.08)]">
                <summary className="cursor-pointer text-sm text-gray-300">
                  View raw JSON
                </summary>
                <pre className="mt-3 overflow-auto text-xs text-gray-200">
                  {JSON.stringify(data, null, 2)}
                </pre>
              </details>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
