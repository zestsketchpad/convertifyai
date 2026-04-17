export default function LogosStrip() {
  return (
    <div className="logos-strip" style={{ padding: "24px 40px", display: "flex", alignItems: "center", justifyContent: "center", gap: 48, borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
      <span style={{ fontSize: 13, color: "var(--text-3)", whiteSpace: "nowrap" }}>Trusted by 4,000+ businesses</span>
      {["Growfast", "Vectra", "Optimal", "Zapfast", "Graphix", "Lumina"].map((name) => (
        <div key={name} className="logo-item" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 15, fontWeight: 700, color: "var(--text-3)", letterSpacing: -0.3, opacity: 0.6 }}>{name}</div>
      ))}
    </div>
  );
}
