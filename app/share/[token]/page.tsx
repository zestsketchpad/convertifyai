"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import GeneratedWebsiteInteractivity from "@/components/GeneratedWebsiteInteractivity";
import Preview from "@/components/Preview";
import { SystemRenderer } from "@/components/SystemRenderer";

export default function SharedPage() {
  const params = useParams<{ token: string }>();
  const token = typeof params?.token === "string" ? params.token : "";

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);
  const [tone, setTone] = useState("Professional");
  const [useNewSystem, setUseNewSystem] = useState(true);

  useEffect(() => {
    const loadSharedPayload = async () => {
      if (!token) {
        setError("Missing share token.");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`/api/share/view/${encodeURIComponent(token)}`);
        setData(res.data?.data ?? null);
        setTone(typeof res.data?.tone === "string" ? res.data.tone : "Professional");
        setUseNewSystem(Boolean(res.data?.useNewSystem));
      } catch (err) {
        if (axios.isAxiosError(err)) {
          const apiError = err.response?.data?.error;
          setError(typeof apiError === "string" ? apiError : "Failed to load shared page.");
        } else {
          setError("Failed to load shared page.");
        }
      } finally {
        setLoading(false);
      }
    };

    loadSharedPayload();
  }, [token]);

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      {loading && (
        <div className="min-h-screen flex items-center justify-center p-6 text-gray-300">
          Loading shared website...
        </div>
      )}

      {!loading && error && (
        <div className="min-h-screen flex items-center justify-center p-6">
          <div className="rounded-2xl border border-red-300/30 bg-red-400/10 p-6 text-red-200 max-w-xl w-full text-center">
            {error}
          </div>
        </div>
      )}

      {!loading && !error && data && (
        <>
          {!useNewSystem && (
            <GeneratedWebsiteInteractivity>
              <Preview data={data} tone={tone} shareMode={true} />
            </GeneratedWebsiteInteractivity>
          )}

          {useNewSystem && data?._strategy && data?._theme && (
            <GeneratedWebsiteInteractivity>
              <SystemRenderer
                strategy={data._strategy}
                data={data}
                theme={data._theme}
                showExplanation={false}
              />
            </GeneratedWebsiteInteractivity>
          )}
        </>
      )}
    </main>
  );
}
