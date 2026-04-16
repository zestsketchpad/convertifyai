export default function CTA() {
  return (
    <section style={{ background: "linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)", textAlign: "center", padding: "100px 40px" }}>
      <h2 className="display" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 800, letterSpacing: -2, color: "white", maxWidth: 700, margin: "0 auto 20px", lineHeight: 1.1 }}>
        Start turning feedback into <span style={{ color: "var(--brand)" }}>fuel for growth.</span>
      </h2>
      <p style={{ fontSize: 17, color: "var(--text-3)", maxWidth: 480, margin: "0 auto 40px", lineHeight: 1.7 }}>Join 4,000+ businesses already using Convertify AI. Free 14-day trial. No credit card.</p>
      <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
        <a href="#submit" className="btn-primary" style={{ fontSize: 16, padding: "16px 32px", borderRadius: 50, background: "var(--brand)", color: "white", border: "none", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8, boxShadow: "0 4px 16px rgba(249,115,22,0.35)", transition: "all 0.2s", textDecoration: "none", fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>Submit Your First Review →</a>
        <a href="#reviews" className="btn-secondary" style={{ fontSize: 16, padding: "16px 32px", borderRadius: 50, background: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.15)", color: "white", border: "1.5px solid rgba(255,255,255,0.15)", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8, boxShadow: "var(--shadow-sm)", transition: "all 0.2s", textDecoration: "none", fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>View Live Demo</a>
      </div>
    </section>
  );
}
