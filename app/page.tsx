"use client";
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [reviews, setReviews] = useState("");
  const [tone, setTone] = useState("professional");
  const [data, setData] = useState<any>(null);

  const generate = async () => {
    const res = await axios.post("/api/generate", {
      reviews,
      tone,
    });
    setData(res.data);
  };

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-3xl mb-6">AI Landing Page Generator 🚀</h1>

      <textarea
        className="w-full p-4 bg-gray-900 rounded"
        rows={6}
        placeholder="Paste reviews..."
        onChange={(e) => setReviews(e.target.value)}
      />

      <div className="mt-4 flex gap-4">
        <button onClick={()=>setTone("professional")}>Professional</button>
        <button onClick={()=>setTone("casual")}>Casual</button>
        <button onClick={()=>setTone("luxury")}>Luxury</button>
      </div>

      <button
        onClick={generate}
        className="mt-6 px-6 py-3 bg-purple-600 rounded"
      >
        Generate
      </button>

      {data && (
        <pre className="mt-6 bg-gray-900 p-4 rounded">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
}