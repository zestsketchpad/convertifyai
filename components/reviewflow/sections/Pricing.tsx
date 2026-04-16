export default function Pricing({ onToast }: { onToast: (msg: string) => void }) {
  const plans = [
    {
      name: "Starter", price: "₹999", period: "/mo", desc: "Perfect for small businesses just getting started.", featured: false,
      features: [
        { included: true, text: "Up to 500 reviews/month" },
        { included: true, text: "3 platform integrations" },
        { included: true, text: "Email alerts" },
        { included: true, text: "Basic sentiment analysis" },
        { included: false, text: "AI reply suggestions" },
        { included: false, text: "Team collaboration" },
      ],
      btnLabel: "Start Free Trial", btnMsg: "Starting free trial...",
    },
    {
      name: "Growth", price: "₹2,999", period: "/mo", desc: "For growing businesses that need AI-powered tools.", featured: true, badge: "Most Popular",
      features: [
        { included: true, text: "Up to 5,000 reviews/month" },
        { included: true, text: "All platform integrations" },
        { included: true, text: "AI reply suggestions" },
        { included: true, text: "Advanced analytics" },
        { included: true, text: "5 team members" },
        { included: false, text: "Custom AI training" },
      ],
      btnLabel: "Start Free Trial", btnMsg: "Starting free trial...",
    },
    {
      name: "Enterprise", price: "Custom", period: "", desc: "For large teams with custom needs and SLA requirements.", featured: false,
      features: [
        { included: true, text: "Unlimited reviews" },
        { included: true, text: "Custom AI voice training" },
        { included: true, text: "Unlimited team members" },
        { included: true, text: "Dedicated support" },
        { included: true, text: "SLA guarantee" },
        { included: true, text: "API access" },
      ],
      btnLabel: "Contact Sales", btnMsg: "Connecting you with sales...",
    },
  ];

  return (
    <section id="pricing" className="section-pad" style={{ background: "var(--surface)", padding: "100px 40px" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ display: "inline-block", fontSize: 12, fontWeight: 600, color: "var(--brand)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 16 }}>Pricing</div>
        <h2 className="display" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(30px, 4vw, 48px)", fontWeight: 800, letterSpacing: -1.5, lineHeight: 1.15, maxWidth: 620, margin: "0 auto 16px" }}>Simple pricing, <span style={{ color: "var(--brand)" }}>serious results</span></h2>
        <p style={{ fontSize: 17, color: "var(--text-2)", maxWidth: 520, margin: "0 auto 60px", lineHeight: 1.7 }}>No hidden fees. Cancel anytime. Every plan includes a 14-day free trial.</p>
      </div>
      <div className="pricing-grid" style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
        {plans.map((p) => (
          <div key={p.name} className="pricing-card" style={{ background: "var(--white)", border: `1.5px solid ${p.featured ? "var(--brand)" : "var(--border)"}`, borderRadius: 24, padding: 32, position: "relative", boxShadow: p.featured ? "0 0 0 4px rgba(249,115,22,0.08)" : "none" }}>
            {p.featured && p.badge && <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", background: "var(--brand)", color: "white", fontSize: 12, fontWeight: 700, padding: "5px 16px", borderRadius: 50, whiteSpace: "nowrap" }}>{p.badge}</div>}
            <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-2)", marginBottom: 8 }}>{p.name}</div>
            <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 42, fontWeight: 800, letterSpacing: -2, marginBottom: 4 }}>{p.price}<span style={{ fontSize: 16, fontWeight: 500, color: "var(--text-3)", letterSpacing: 0 }}>{p.period}</span></div>
            <div style={{ fontSize: 13, color: "var(--text-3)", marginBottom: 24 }}>{p.desc}</div>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
              {p.features.map((f) => (
                <li key={f.text} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14, color: "var(--text-2)" }}>
                  <div style={{ width: 18, height: 18, borderRadius: "50%", background: f.included ? "var(--green-light)" : "var(--surface)", color: f.included ? "#166534" : "var(--text-3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, flexShrink: 0, marginTop: 1 }}>{f.included ? "✓" : "–"}</div>
                  {f.text}
                </li>
              ))}
            </ul>
            <button onClick={() => onToast(p.btnMsg)} style={{ width: "100%", padding: 13, borderRadius: 50, fontSize: 15, fontWeight: 600, fontFamily: "'DM Sans', sans-serif", cursor: "pointer", transition: "all 0.2s", border: p.featured ? "1.5px solid var(--brand)" : "1.5px solid var(--border)", background: p.featured ? "var(--brand)" : "transparent", color: p.featured ? "white" : "var(--text)", boxShadow: p.featured ? "0 4px 14px rgba(249,115,22,0.3)" : "none" }}>{p.btnLabel}</button>
          </div>
        ))}
      </div>
    </section>
  );
}
