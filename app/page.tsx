"use client";
import { useState } from "react";
import axios from "axios";
import Insights from "@/components/Insights";
import TopProblem from "@/components/TopProblem";
import Scores from "@/components/Scores";
import Preview from "@/components/Preview";

export default function Home() {
  const [input, setInput] = useState("");
  const [tone, setTone] = useState("Professional");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
        const responseData = err.response?.data as any;
        const message =
          typeof responseData?.error === "string"
            ? responseData.error
            : typeof responseData === "string"
              ? responseData
              : err.message;
        setError(message);
      } else {
        setError("Request failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">
        AI Landing Page Generator {"\u{1F680}"}
      </h1>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste user reviews here..."
        className="w-full max-w-2xl h-40 p-4 rounded-lg bg-white/10 border border-white/20 mb-4"
      />

      <div className="flex gap-3 mb-4">
        {["Professional", "Casual", "Luxury"].map((t) => (
          <button
            key={t}
            onClick={() => setTone(t)}
            className={`px-4 py-2 rounded-lg border ${
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
        className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg font-semibold disabled:opacity-60"
      >
        {loading ? "Generating..." : "Generate"}
      </button>

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

          <details className="bg-white/5 p-4 rounded-xl border border-white/10">
            <summary className="cursor-pointer text-sm text-gray-300">
              View raw JSON
            </summary>
            <pre className="mt-3 overflow-auto text-xs text-gray-200">
              {JSON.stringify(data, null, 2)}
            </pre>
          </details>
        </div>
      )}
    </main>
  );
}
