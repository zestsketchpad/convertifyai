"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import type { AIData } from "@/types";

import Insights from "@/components/Insights";
import TopProblem from "@/components/TopProblem";
import Scores from "@/components/Scores";
import Preview from "@/components/Preview";

export default function Home() {
  const [reviews, setReviews] = useState("");
  const [tone, setTone] = useState("professional");
  const [data, setData] = useState<AIData | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // 🔐 Protect route
  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        router.replace("/login");
      }
    };
    checkUser();
  }, [router]);

  // 🚀 Generate AI + Save to DB
  const generate = async () => {
    try {
      setLoading(true);

      const res = await axios.post("/api/generate", {
        reviews,
        tone,
      });

      setData(res.data);

      // 💾 Save to Supabase
      const { data: userData } = await supabase.auth.getUser();

      if (userData.user) {
        await supabase.from("projects").insert([
          {
            user_id: userData.user.id,
            reviews,
            result: res.data,
          },
        ]);
      }

    } catch (err) {
      console.error(err);
      alert("Error generating AI");
    } finally {
      setLoading(false);
    }
  };

  // 🔓 Logout
  const logout = async () => {
    await supabase.auth.signOut();
    router.replace("/login");
  };

  return (
    <div className="min-h-screen bg-black text-white p-10">

      {/* NAVBAR */}
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">
          AI Conversion Generator 🚀
        </h1>

        <button
          onClick={logout}
          className="bg-red-600 px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* INPUT */}
      <textarea
        className="w-full p-4 bg-gray-900 rounded"
        rows={6}
        placeholder="Paste customer reviews here..."
        onChange={(e) => setReviews(e.target.value)}
      />

      {/* TONE */}
      <div className="mt-4 flex gap-4">
        <button
          onClick={() => setTone("professional")}
          className="px-4 py-2 bg-gray-800 rounded"
        >
          Professional
        </button>

        <button
          onClick={() => setTone("casual")}
          className="px-4 py-2 bg-gray-800 rounded"
        >
          Casual
        </button>

        <button
          onClick={() => setTone("luxury")}
          className="px-4 py-2 bg-gray-800 rounded"
        >
          Luxury
        </button>
      </div>

      {/* GENERATE BUTTON */}
      <button
        onClick={generate}
        className="mt-6 px-6 py-3 bg-purple-600 rounded"
      >
        Generate
      </button>

      {/* LOADING */}
      {loading && (
        <p className="mt-4 text-purple-400">
          Analyzing reviews...
        </p>
      )}

      {/* OUTPUT */}
      {data && (
        <div className="mt-10 space-y-6">

          {/* INSIGHTS */}
          <Insights data={data} />

          {/* TOP PROBLEM */}
          <TopProblem data={data} />

          {/* SCORES */}
          <Scores data={data} />

          {/* PREVIEW */}
          <Preview data={data} />

        </div>
      )}
    </div>
  );
}