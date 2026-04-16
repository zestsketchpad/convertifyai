import Particles from "@/components/ui/Particles";
import { Avatar } from "../ui";

export default function Hero() {
  return (
    <section id="home" className="hero-section" style={{ minHeight: "100vh", padding: "120px 40px 80px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", position: "relative", overflow: "hidden", background: "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(249,115,22,0.08) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 60%, rgba(99,102,241,0.06) 0%, transparent 50%), radial-gradient(ellipse 50% 40% at 20% 80%, rgba(34,197,94,0.05) 0%, transparent 50%), var(--white)" }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.55, pointerEvents: "none" }}>
        <Particles
          particleCount={700}
          particleSpread={10}
          speed={0.2}
          particleColors={["var(--text)"]}
          moveParticlesOnHover={true}
          alphaParticles={false}
          particleBaseSize={100}
          disableRotation={false}
        />
      </div>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, color-mix(in srgb, var(--white) 82%, transparent) 0%, color-mix(in srgb, var(--white) 48%, transparent) 35%, color-mix(in srgb, var(--white) 90%, transparent) 100%)", pointerEvents: "none" }} />
      <div className="fade-in-0" style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "6px 16px", borderRadius: 50, background: "var(--brand-light)", border: "1px solid rgba(249,115,22,0.2)", fontSize: 13, fontWeight: 500, color: "var(--brand-dark)", marginBottom: 28 }}>
        <div className="hero-badge-dot" />
        New — AI-powered reply suggestions
      </div>
      <h1 className="fade-in-1 display" style={{ fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 800, lineHeight: 1.1, letterSpacing: -2, color: "var(--text)", marginBottom: 22, maxWidth: 820 }}>
        Turn Customer Reviews<br />Into <span style={{ color: "var(--brand)" }}>Real Growth.</span>
      </h1>
      <p className="fade-in-2" style={{ fontSize: 18, color: "var(--text-2)", maxWidth: 520, marginBottom: 40, lineHeight: 1.7 }}>
        Collect, monitor, and respond to reviews across every platform. Let AI surface insights and craft perfect replies — all in one dashboard.
      </p>
      <div className="fade-in-3" style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 64 }}>
        <a href="#submit" className="btn-primary" style={{ padding: "14px 28px", borderRadius: 50, fontSize: 15, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, background: "var(--brand)", color: "white", border: "none", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8, boxShadow: "0 4px 16px rgba(249,115,22,0.35)", transition: "all 0.2s", textDecoration: "none" }}>Submit a Review ↗</a>
        <a href="#reviews" className="btn-secondary" style={{ padding: "14px 28px", borderRadius: 50, fontSize: 15, fontFamily: "'DM Sans', sans-serif", fontWeight: 500, background: "var(--white)", color: "var(--text)", border: "1.5px solid var(--border)", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8, boxShadow: "var(--shadow-sm)", transition: "all 0.2s", textDecoration: "none" }}>▶ View Live Dashboard</a>
      </div>

      <div className="fade-in-4" style={{ position: "relative", width: "100%", maxWidth: 880 }}>
        <div className="float-card-1" style={{ position: "absolute", top: 10, left: -60, background: "var(--white)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "14px 18px", boxShadow: "var(--shadow-lg)", fontSize: 13, minWidth: 180, zIndex: 2 }}>
          <div style={{ fontSize: 11, color: "var(--text-3)", fontWeight: 500, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>Avg. Rating</div>
          <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 22, fontWeight: 700, color: "var(--text)" }}>4.8 ★</div>
          <div style={{ fontSize: 12, color: "var(--green)", fontWeight: 500, marginTop: 2 }}>↑ +0.3 this month</div>
        </div>
        <div className="float-card-2" style={{ position: "absolute", top: 20, right: -50, background: "var(--white)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "14px 18px", boxShadow: "var(--shadow-lg)", fontSize: 13, minWidth: 180, zIndex: 2 }}>
          <div style={{ fontSize: 11, color: "var(--text-3)", fontWeight: 500, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>Response Rate</div>
          <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 22, fontWeight: 700, color: "var(--text)" }}>96%</div>
          <div style={{ fontSize: 12, color: "var(--indigo)", fontWeight: 500, marginTop: 2 }}>Top 5% of accounts</div>
        </div>
        <div className="float-card-3" style={{ position: "absolute", bottom: 10, left: -40, background: "var(--white)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "14px 18px", boxShadow: "var(--shadow-lg)", fontSize: 12, minWidth: 160, zIndex: 2 }}>
          <div style={{ fontSize: 11, color: "var(--text-3)", fontWeight: 500, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>Latest Review</div>
          <div style={{ display: "flex", gap: 2, marginBottom: 4 }}>{Array.from({ length: 5 }, (_, i) => <span key={i} style={{ color: "var(--amber)", fontSize: 14 }}>★</span>)}</div>
          <div style={{ color: "var(--text-2)" }}>
            "Amazing service!"
          </div>
        </div>

        <div style={{ width: "100%", background: "var(--white)", border: "1px solid var(--border)", borderRadius: 20, boxShadow: "var(--shadow-lg)", overflow: "hidden" }}>
          <div style={{ background: "var(--surface)", borderBottom: "1px solid var(--border)", padding: "12px 20px", display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#EF4444" }} />
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#F59E0B" }} />
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#22C55E" }} />
            <span style={{ fontSize: 12, color: "var(--text-3)", marginLeft: 8 }}>Convertify AI — Dashboard</span>
          </div>
          <div style={{ padding: 24, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
            {[
              { label: "Total Reviews", value: "2,847", color: "var(--indigo)", change: "↑ +12% this month", changeColor: "var(--green)" },
              { label: "Avg. Rating", value: "4.8 ★", color: "var(--amber)", change: "↑ Up from 4.5", changeColor: "var(--green)" },
              { label: "Pending Reply", value: "14", color: "var(--brand)", change: "Needs attention", changeColor: "var(--text-3)" },
            ].map((s) => (
              <div key={s.label} style={{ background: "var(--surface)", borderRadius: "var(--radius-sm)", padding: "16px 18px", border: "1px solid var(--border)" }}>
                <div style={{ fontSize: 11, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>{s.label}</div>
                <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 24, fontWeight: 700, color: s.color }}>{s.value}</div>
                <div style={{ fontSize: 11, fontWeight: 500, marginTop: 4, color: s.changeColor }}>{s.change}</div>
              </div>
            ))}
            <div style={{ gridColumn: "1/-1", background: "var(--surface)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)", overflow: "hidden" }}>
              {[
                { initials: "RK", bg: "#EEF2FF", color: "#6366F1", name: "Rahul Krishnan", text: "Absolutely love the product. Fast delivery and great quality!", rating: 5, sentiment: "Positive", sBg: "var(--green-light)", sColor: "#166534" },
                { initials: "SM", bg: "#FFF7ED", color: "#EA580C", name: "Sneha Murthy", text: "Took longer than expected but support team was helpful.", rating: 4, sentiment: "Neutral", sBg: "var(--amber-light)", sColor: "#92400E" },
              ].map((r) => (
                <div key={r.name} style={{ padding: "14px 18px", display: "flex", alignItems: "center", gap: 14, borderBottom: "1px solid var(--border)" }}>
                  <Avatar initials={r.initials} color={r.bg} textColor={r.color} size={36} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, color: "var(--text)", fontSize: 13 }}>{r.name}</div>
                    <div style={{ fontSize: 13, color: "var(--text-2)" }}>{r.text}</div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                    <div style={{ display: "flex", gap: 2, fontSize: 11, color: "var(--amber)" }}>{"★".repeat(r.rating)}{"★".repeat(5 - r.rating).split("").map((_, i) => <span key={i} style={{ color: "var(--border)" }}>★</span>)}</div>
                    <span style={{ padding: "3px 10px", borderRadius: 50, fontSize: 11, fontWeight: 600, background: r.sBg, color: r.sColor }}>{r.sentiment}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
