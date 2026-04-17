export default function HowItWorks() {
  const steps = [
    { num: "1", title: "Connect Your Platforms", desc: "Link Google, Yelp, App Store, and more with one-click integrations." },
    { num: "2", title: "Reviews Flow In", desc: "All reviews sync to your unified inbox in real-time, auto-categorized by sentiment." },
    { num: "3", title: "AI Drafts Replies", desc: "Get personalized reply suggestions trained on your brand voice, ready in one click." },
    { num: "4", title: "Analyze & Improve", desc: "Track trends, uncover patterns, and turn feedback into product improvements." },
  ];

  return (
    <section className="section-pad" style={{ background: "var(--white)", padding: "100px 40px" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ display: "inline-block", fontSize: 12, fontWeight: 600, color: "var(--brand)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 16 }}>How It Works</div>
        <h2 className="display" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(30px, 4vw, 48px)", fontWeight: 800, letterSpacing: -1.5, lineHeight: 1.15, maxWidth: 620, margin: "0 auto 16px" }}>Up and running in <span style={{ color: "var(--brand)" }}>4 simple steps</span></h2>
        <p style={{ fontSize: 17, color: "var(--text-2)", maxWidth: 520, margin: "0 auto 60px", lineHeight: 1.7 }}>No technical setup. No developers needed. Start collecting and responding in minutes.</p>
      </div>
      <div className="steps-grid" style={{ maxWidth: 980, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32, position: "relative" }}>
        <div className="steps-connector" style={{ content: "", position: "absolute", top: 28, left: "10%", right: "10%", height: 1, background: "repeating-linear-gradient(90deg, var(--border) 0, var(--border) 6px, transparent 6px, transparent 12px)" }} />
        {steps.map((s) => (
          <div key={s.num} className="step-card" style={{ textAlign: "center", position: "relative" }}>
            <div className="step-num" style={{ width: 56, height: 56, borderRadius: "50%", background: "var(--white)", border: "2px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 18, fontWeight: 800, margin: "0 auto 20px", position: "relative", zIndex: 1, transition: "all 0.3s" }}>{s.num}</div>
            <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{s.title}</div>
            <div style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.6 }}>{s.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
