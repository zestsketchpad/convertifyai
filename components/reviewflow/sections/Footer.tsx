export default function Footer() {
  const cols = [
    { title: "Product", links: ["Features", "Analytics", "Pricing", "API Docs"] },
    { title: "Company", links: ["About", "Blog", "Careers", "Contact"] },
    { title: "Legal", links: ["Privacy Policy", "Terms of Service", "Cookie Policy", "GDPR"] },
  ];

  return (
    <footer style={{ background: "var(--surface)", borderTop: "1px solid var(--border)", padding: "60px 40px 32px" }}>
      <div className="footer-grid" style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 48 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, position: "relative", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #F97316 0%, #FB923C 40%, #6366F1 100%)", boxShadow: "0 0 0 1px rgba(255,255,255,0.12) inset" }}>
              <span style={{ position: "absolute", top: 3, right: 4, fontSize: 8, color: "#FFFFFF", opacity: 0.95 }}>✦</span>
              <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 11, fontWeight: 800, letterSpacing: -0.3, color: "#FFFFFF" }}>CA</span>
            </div>
            <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 20, color: "var(--text)" }}>Convertify AI</span>
          </div>
          <div style={{ fontSize: 14, color: "var(--text-2)", maxWidth: 260, lineHeight: 1.6 }}>The complete platform for businesses to collect, manage, and grow from customer reviews.</div>
        </div>
        {cols.map((col) => (
          <div key={col.title}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text)", marginBottom: 16, textTransform: "uppercase", letterSpacing: 0.5 }}>{col.title}</div>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
              {col.links.map((link) => (
                <li key={link}><a href="#" className="footer-link" style={{ fontSize: 14, color: "var(--text-2)", textDecoration: "none" }}>{link}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="footer-bottom" style={{ maxWidth: 1100, margin: "0 auto", paddingTop: 24, borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 13, color: "var(--text-3)" }}>
        <div>© 2025 Convertify AI. All rights reserved.</div>
        <div>Made with ♥ for businesses everywhere</div>
      </div>
    </footer>
  );
}
