import { Avatar } from "../ui";

export default function Features({ onToast }: { onToast: (msg: string) => void }) {
  const miniBarData = [
    { label: "Google", pct: 92, val: "4.8", color: "var(--brand)" },
    { label: "Trustpilot", pct: 85, val: "4.3", color: "var(--indigo)" },
    { label: "Yelp", pct: 76, val: "3.8", color: "var(--green)" },
    { label: "App Store", pct: 88, val: "4.4", color: "var(--amber)" },
  ];

  return (
    <section id="features" className="section-pad" style={{ background: "var(--surface)", padding: "100px 40px" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ display: "inline-block", fontSize: 12, fontWeight: 600, color: "var(--brand)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 16 }}>Valuable Features</div>
        <h2 className="display" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(30px, 4vw, 48px)", fontWeight: 800, letterSpacing: -1.5, lineHeight: 1.15, maxWidth: 620, margin: "0 auto 16px", textAlign: "center" }}>Everything you need to <span style={{ color: "var(--brand)" }}>win with reviews</span></h2>
        <p style={{ fontSize: 17, color: "var(--text-2)", maxWidth: 520, margin: "0 auto 60px", textAlign: "center", lineHeight: 1.7 }}>From collection to response to analysis — one platform that does it all, automatically.</p>
      </div>

      <div className="bento-grid" style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
        <div className="bento-card" style={{ background: "var(--white)", border: "1px solid var(--border)", borderRadius: 20, padding: 32, position: "relative", overflow: "hidden" }}>
          <div style={{ width: 48, height: 48, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, marginBottom: 18, background: "var(--brand-light)" }}>📥</div>
          <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Multi-Platform Collection</div>
          <div style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.65 }}>Pull reviews from Google, Yelp, Trustpilot, App Store, and 15+ platforms into one unified inbox.</div>
        </div>
        <div className="bento-card" style={{ background: "var(--white)", border: "1px solid var(--border)", borderRadius: 20, padding: 32, position: "relative", overflow: "hidden" }}>
          <div style={{ width: 48, height: 48, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, marginBottom: 18, background: "var(--indigo-light)" }}>🤖</div>
          <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 18, fontWeight: 700, marginBottom: 8 }}>AI-Powered Replies</div>
          <div style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.65 }}>Generate on-brand, personalized responses in seconds. Train on your voice and tone.</div>
        </div>
        <div className="bento-card" style={{ background: "var(--white)", border: "1px solid var(--border)", borderRadius: 20, padding: 32, position: "relative", overflow: "hidden" }}>
          <div style={{ width: 48, height: 48, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, marginBottom: 18, background: "var(--green-light)" }}>📊</div>
          <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Sentiment Analytics</div>
          <div style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.65 }}>Understand what customers love and hate. Track trends over time with smart NLP.</div>
        </div>
        <div className="bento-card bento-span-2" style={{ gridColumn: "span 2", background: "var(--white)", border: "1px solid var(--border)", borderRadius: 20, padding: 32 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
            <div>
              <div style={{ width: 48, height: 48, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, marginBottom: 12, background: "var(--amber-light)" }}>📈</div>
              <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Rating Trend Tracking</div>
              <div style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.65 }}>See how your ratings evolve across all platforms over daily, weekly, and monthly views.</div>
            </div>
          </div>
          {miniBarData.map((b) => (
            <div key={b.label} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <div style={{ fontSize: 12, color: "var(--text-2)", width: 70, flexShrink: 0 }}>{b.label}</div>
              <div style={{ flex: 1, height: 7, background: "var(--surface)", borderRadius: 4, overflow: "hidden" }}>
                <div style={{ height: "100%", borderRadius: 4, background: b.color, width: `${b.pct}%` }} />
              </div>
              <div style={{ fontSize: 12, fontWeight: 600, width: 32, textAlign: "right", color: b.color }}>{b.val}</div>
            </div>
          ))}
        </div>
        <div className="bento-card" style={{ background: "var(--white)", border: "1px solid var(--border)", borderRadius: 20, padding: 32 }}>
          <div style={{ width: 48, height: 48, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, marginBottom: 18, background: "rgba(239,68,68,0.1)" }}>🔔</div>
          <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Smart Alerts</div>
          <div style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.65 }}>Get notified instantly when a negative review lands. Never miss a critical moment again.</div>
        </div>
        <div className="bento-card bento-span-3" style={{ gridColumn: "span 3", background: "linear-gradient(135deg,#0F172A,#1E293B)", border: "1px solid #1E293B", borderRadius: 20, padding: 32, color: "white" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, alignItems: "center" }}>
            <div>
              <div style={{ width: 48, height: 48, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, marginBottom: 18, background: "rgba(249,115,22,0.2)" }}>⚡</div>
              <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 22, fontWeight: 700, color: "white", marginBottom: 10 }}>One inbox for every review,<br />every platform.</div>
              <div style={{ fontSize: 14, color: "var(--text-3)", lineHeight: 1.65 }}>Stop juggling tabs. Convertify AI syncs every platform in real-time, so your team always sees the full picture.</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { initials: "AP", bg: "#FFF7ED", color: "#EA580C", name: "Aisha Patel", review: '★★★★★ "Best service ever!"', platform: "Google", platformBg: "rgba(34,197,94,0.15)", platformColor: "#4ADE80" },
                { initials: "VR", bg: "#EEF2FF", color: "#6366F1", name: "Vikram Rao", review: '★★★☆☆ "Could be faster"', platform: "Yelp", platformBg: "rgba(99,102,241,0.2)", platformColor: "#A5B4FC" },
              ].map((r) => (
                <div key={r.name} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "14px 16px", display: "flex", alignItems: "center", gap: 12 }}>
                  <Avatar initials={r.initials} color={r.bg} textColor={r.color} size={36} />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "white" }}>{r.name}</div>
                    <div style={{ fontSize: 12, color: "var(--text-3)" }}>{r.review}</div>
                  </div>
                  <span style={{ marginLeft: "auto", fontSize: 10, padding: "2px 8px", borderRadius: 20, background: r.platformBg, color: r.platformColor, fontWeight: 600 }}>{r.platform}</span>
                </div>
              ))}
              <div style={{ background: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.25)", borderRadius: 12, padding: "14px 16px", display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 18 }}>🤖</span>
                <div style={{ fontSize: 12, color: "#FED7AA", flex: 1 }}>AI reply ready: "Thank you Vikram! We hear you on speed — we're rolling out same-day…"</div>
                <button onClick={() => onToast("✨ AI reply copied!")} style={{ padding: "4px 12px", borderRadius: 20, background: "var(--brand)", border: "none", color: "white", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>Use</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
