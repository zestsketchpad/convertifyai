export default function Analytics({ onToast }: { onToast: (msg: string) => void }) {
  const monthData = [
    { month: "Nov", pct: 55, val: 154 },
    { month: "Dec", pct: 68, val: 190 },
    { month: "Jan", pct: 82, val: 229 },
    { month: "Feb", pct: 74, val: 208 },
    { month: "Mar", pct: 100, val: 282, highlight: true },
    { month: "Apr", pct: 90, val: 253, highlight: true },
  ];

  const keywords = [
    { label: "shipping (67)", bg: "rgba(249,115,22,0.1)", color: "var(--brand-dark)", msg: "67 reviews mention shipping" },
    { label: "quality (54)", bg: "rgba(34,197,94,0.1)", color: "#166534", msg: "54 reviews mention quality" },
    { label: "support (48)", bg: "rgba(99,102,241,0.1)", color: "var(--indigo)", msg: "48 reviews mention support" },
    { label: "price (41)", bg: "rgba(245,158,11,0.1)", color: "#92400E", msg: "41 reviews mention price" },
    { label: "easy to use (38)", bg: "rgba(16,185,129,0.1)", color: "#065F46", msg: "38 reviews mention easy" },
    { label: "delay (31)", bg: "rgba(239,68,68,0.1)", color: "#991B1B", msg: "31 reviews mention delay" },
    { label: "packaging (29)", bg: "rgba(249,115,22,0.08)", color: "var(--brand-dark)", msg: "29 reviews mention packaging" },
    { label: "refund (22)", bg: "rgba(99,102,241,0.08)", color: "var(--indigo)", msg: "22 reviews mention refund" },
  ];

  const stats = [
    { val: "96%", label: "Response Rate", color: "var(--green)" },
    { val: "2.4h", label: "Avg. Response Time", color: "var(--brand)" },
    { val: "14", label: "Pending Replies", color: "var(--indigo)" },
    { val: "4.8★", label: "Avg. Rating", color: "var(--amber)" },
  ];

  return (
    <section id="analytics" className="section-pad" style={{ background: "var(--white)", padding: "100px 40px" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ display: "inline-block", fontSize: 12, fontWeight: 600, color: "var(--brand)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 16 }}>Analytics</div>
        <h2 className="display" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(30px, 4vw, 48px)", fontWeight: 800, letterSpacing: -1.5, lineHeight: 1.15, maxWidth: 620, margin: "0 auto 16px" }}>Deep insights from every <span style={{ color: "var(--indigo)" }}>piece of feedback</span></h2>
        <p style={{ fontSize: 17, color: "var(--text-2)", maxWidth: 520, margin: "0 auto 60px", lineHeight: 1.7 }}>Understand your customers better than ever. Track, compare, and act on trends in real-time.</p>
      </div>
      <div className="analytics-grid" style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        <div className="analytics-card" style={{ background: "var(--white)", border: "1px solid var(--border)", borderRadius: 20, padding: 28 }}>
          <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 16, fontWeight: 700, marginBottom: 4 }}>Review Volume by Month</div>
          <div style={{ fontSize: 13, color: "var(--text-3)", marginBottom: 20 }}>Total reviews collected per month</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {monthData.map((m) => (
              <div key={m.month} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ fontSize: 12, color: "var(--text-2)", width: 80, flexShrink: 0, textAlign: "right" }}>{m.month}</div>
                <div style={{ flex: 1, height: 10, background: "var(--surface)", borderRadius: 5, overflow: "hidden" }}>
                  <div style={{ height: "100%", borderRadius: 5, background: m.highlight ? "var(--brand)" : "var(--indigo)", width: `${m.pct}%`, transition: "width 1s ease" }} />
                </div>
                <div style={{ fontSize: 12, fontWeight: 600, width: 36, color: m.highlight ? "var(--brand)" : "var(--text)" }}>{m.val}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="analytics-card" style={{ background: "var(--white)", border: "1px solid var(--border)", borderRadius: 20, padding: 28 }}>
          <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 16, fontWeight: 700, marginBottom: 4 }}>Sentiment Breakdown</div>
          <div style={{ fontSize: 13, color: "var(--text-3)", marginBottom: 20 }}>Across all platforms this month</div>
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <svg width="120" height="120" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="50" fill="none" stroke="#F0FDF4" strokeWidth="20" />
              <circle cx="60" cy="60" r="50" fill="none" stroke="#22C55E" strokeWidth="20" strokeDasharray="188 126" strokeDashoffset="-31" strokeLinecap="round" />
              <circle cx="60" cy="60" r="50" fill="none" stroke="#F59E0B" strokeWidth="20" strokeDasharray="63 251" strokeDashoffset="-219" strokeLinecap="round" />
              <circle cx="60" cy="60" r="50" fill="none" stroke="#EF4444" strokeWidth="20" strokeDasharray="38 276" strokeDashoffset="-282" strokeLinecap="round" />
              <text x="60" y="56" textAnchor="middle" fontFamily="'Bricolage Grotesque',sans-serif" fontSize="18" fontWeight="700" fill="var(--text)">60%</text>
              <text x="60" y="70" textAnchor="middle" fontSize="10" fill="var(--text-3)">positive</text>
            </svg>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { color: "var(--green)", label: "Positive", val: "60%" },
                { color: "var(--amber)", label: "Neutral", val: "20%" },
                { color: "var(--red)", label: "Negative", val: "12%" },
                { color: "var(--border)", label: "Unclassified", val: "8%" },
              ].map((d) => (
                <div key={d.label} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: d.color, flexShrink: 0 }} />
                  <span style={{ color: "var(--text-2)", flex: 1 }}>{d.label}</span>
                  <span style={{ fontWeight: 600, color: "var(--text)" }}>{d.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="analytics-card" style={{ background: "var(--white)", border: "1px solid var(--border)", borderRadius: 20, padding: 28 }}>
          <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 16, fontWeight: 700, marginBottom: 4 }}>Top Keywords in Reviews</div>
          <div style={{ fontSize: 13, color: "var(--text-3)", marginBottom: 20 }}>Most mentioned topics this month</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 8 }}>
            {keywords.map((k) => (
              <span key={k.label} onClick={() => onToast(k.msg)} style={{ padding: "6px 14px", borderRadius: 50, background: k.bg, color: k.color, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>{k.label}</span>
            ))}
          </div>
        </div>

        <div className="analytics-card" style={{ background: "var(--white)", border: "1px solid var(--border)", borderRadius: 20, padding: 28 }}>
          <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 16, fontWeight: 700, marginBottom: 4 }}>Response Rate</div>
          <div style={{ fontSize: 13, color: "var(--text-3)", marginBottom: 20 }}>How quickly you're responding</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 8 }}>
            {stats.map((s) => (
              <div key={s.label} style={{ textAlign: "center", padding: "20px 16px", background: "var(--surface)", borderRadius: "var(--radius-xs)" }}>
                <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 36, fontWeight: 800, color: s.color }}>{s.val}</div>
                <div style={{ fontSize: 12, color: "var(--text-3)", marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
