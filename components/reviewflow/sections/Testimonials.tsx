import { Avatar } from "../ui";

export default function Testimonials() {
  const testimonials = [
    { stars: 5, text: "Convertify AI cut our review response time from 3 days to under 2 hours. The AI suggestions are scarily good — almost always publish them as-is.", name: "Priya Krishnan", role: "Head of CX, Nykaa", initials: "PK", bg: "#EEF2FF", color: "#6366F1" },
    { stars: 5, text: "The keyword insights alone are worth it. We discovered our packaging was a recurring complaint and fixed it — our ratings went up 0.4 stars in 6 weeks.", name: "Rohan Verma", role: "Founder, BloomCart", initials: "RV", bg: "var(--brand-light)", color: "var(--brand-dark)" },
    { stars: 5, text: "Managing reviews used to take half our team's day. Now it takes 20 minutes. Convertify AI is the most impactful SaaS we've adopted this year.", name: "Anjali Sharma", role: "COO, UrbanVault", initials: "AS", bg: "var(--green-light)", color: "#166534" },
  ];

  return (
    <section className="section-pad" style={{ background: "var(--white)", padding: "100px 40px" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ display: "inline-block", fontSize: 12, fontWeight: 600, color: "var(--brand)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 16 }}>What People Say</div>
        <h2 className="display" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(30px, 4vw, 48px)", fontWeight: 800, letterSpacing: -1.5, lineHeight: 1.15, maxWidth: 620, margin: "0 auto 16px" }}>Businesses love <span style={{ color: "var(--brand)" }}>Convertify AI</span></h2>
        <p style={{ fontSize: 17, color: "var(--text-2)", maxWidth: 520, margin: "0 auto 60px", lineHeight: 1.7 }}>Join thousands of businesses who've transformed their review management.</p>
      </div>
      <div className="testimonials-grid" style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
        {testimonials.map((t) => (
          <div key={t.name} className="testimonial-card" style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 20, padding: 28 }}>
            <div style={{ display: "flex", gap: 3, marginBottom: 14 }}>{Array.from({ length: t.stars }, (_, i) => <span key={i} style={{ fontSize: 14, color: "var(--amber)" }}>★</span>)}</div>
            <div style={{ fontSize: 15, color: "var(--text-2)", lineHeight: 1.7, marginBottom: 20, fontStyle: "italic" }}>
              "{t.text}"
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <Avatar initials={t.initials} color={t.bg} textColor={t.color} size={42} />
              <div>
                <div style={{ fontSize: 14, fontWeight: 700 }}>{t.name}</div>
                <div style={{ fontSize: 12, color: "var(--text-3)" }}>{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
