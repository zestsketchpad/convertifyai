"use client";

import { useEffect } from "react";
import type { Sentiment } from "./config";

export function Stars({ count, size = 13, dimEmpty = false }: { count: number; size?: number; dimEmpty?: boolean }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} style={{ fontSize: size, color: i < count ? "var(--amber)" : dimEmpty ? "var(--border)" : "var(--border)" }}>★</span>
      ))}
    </div>
  );
}

export function SentimentTag({ sentiment }: { sentiment: Sentiment }) {
  const styles: Record<Sentiment, { bg: string; color: string }> = {
    positive: { bg: "var(--green-light)", color: "#166534" },
    neutral: { bg: "var(--amber-light)", color: "#92400E" },
    negative: { bg: "var(--red-light)", color: "#991B1B" },
  };

  return (
    <span style={{ padding: "3px 10px", borderRadius: 50, fontSize: 11, fontWeight: 600, background: styles[sentiment].bg, color: styles[sentiment].color }}>
      {sentiment.charAt(0).toUpperCase() + sentiment.slice(1)}
    </span>
  );
}

export function Avatar({ initials, color, textColor, size = 38 }: { initials: string; color: string; textColor: string; size?: number }) {
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", background: color, color: textColor, display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.34, fontWeight: 700, flexShrink: 0 }}>
      {initials}
    </div>
  );
}

export function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div style={{ position: "fixed", bottom: 28, right: 28, zIndex: 999, background: "var(--text)", color: "white", borderRadius: 12, padding: "14px 22px", fontSize: 14, fontWeight: 500, boxShadow: "var(--shadow-lg)", display: "flex", alignItems: "center", gap: 10, animation: "fadeUp 0.3s ease" }}>
      {message}
    </div>
  );
}

export function AIModal({ reply, onClose, onPublish }: { reply: string; onClose: () => void; onPublish: () => void }) {
  return (
    <div onClick={(e) => { if (e.target === e.currentTarget) onClose(); }} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", backdropFilter: "blur(6px)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", animation: "fadeUp 0.2s ease" }}>
      <div style={{ background: "var(--white)", borderRadius: 24, padding: 36, width: "90%", maxWidth: 520, boxShadow: "var(--shadow-lg)", animation: "fadeUp 0.25s ease", maxHeight: "85vh", overflowY: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
          <div>
            <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 20, fontWeight: 800 }}>🤖 AI Reply Suggestion</div>
            <div style={{ fontSize: 13, color: "var(--text-3)", marginTop: 4 }}>Generated based on review content and your brand tone</div>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "var(--text-3)", padding: 4 }}>✕</button>
        </div>
        <div style={{ background: "var(--surface)", borderRadius: "var(--radius-xs)", padding: 16, fontSize: 14, color: "var(--text-2)", lineHeight: 1.7, marginBottom: 16, border: "1px solid var(--border)" }}>
          {reply}
        </div>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <button onClick={onClose} style={{ padding: "10px 20px", borderRadius: 50, border: "1.5px solid var(--border)", background: "transparent", fontSize: 14, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>Edit First</button>
          <button onClick={onPublish} style={{ padding: "10px 20px", borderRadius: 50, background: "var(--brand)", border: "none", color: "white", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>Publish Reply</button>
        </div>
      </div>
    </div>
  );
}
