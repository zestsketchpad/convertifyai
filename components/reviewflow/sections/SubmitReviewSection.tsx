"use client";

import { useState } from "react";
import { AVATAR_COLORS, RATING_LABELS, type Platform, type Review, type Sentiment } from "../config";

export default function SubmitReviewSection({ onAddReview, onToast }: { onAddReview: (r: Review) => void; onToast: (msg: string) => void }) {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ firstname: "", lastname: "", email: "", platform: "google", text: "", product: "", recommend: "yes" });

  const handleSubmit = () => {
    if (!form.firstname) {
      onToast("⚠️ Please enter your first name");
      return;
    }
    if (!form.email) {
      onToast("⚠️ Please enter your email");
      return;
    }
    if (rating === 0) {
      onToast("⚠️ Please select a rating");
      return;
    }
    if (form.text.length < 20) {
      onToast("⚠️ Please write at least 20 characters");
      return;
    }

    const initials = ((form.firstname[0] || "") + (form.lastname[0] || "")).toUpperCase();
    const ac = AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)];
    const sentiment: Sentiment = rating >= 4 ? "positive" : rating === 3 ? "neutral" : "negative";

    onAddReview({ id: Date.now(), name: `${form.firstname} ${form.lastname}`.trim(), initials, color: ac.bg, textColor: ac.text, rating, platform: form.platform as Platform, sentiment, text: form.text, time: "just now", unread: true, replied: false });
    setSubmitted(true);
  };

  const reset = () => {
    setSubmitted(false);
    setRating(0);
    setHovered(0);
    setForm({ firstname: "", lastname: "", email: "", platform: "google", text: "", product: "", recommend: "yes" });
  };

  const inputStyle = { padding: "11px 14px", border: "1.5px solid var(--border)", borderRadius: "var(--radius-xs)", fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "var(--text)", outline: "none", width: "100%", background: "var(--white)" };

  return (
    <section id="submit" className="section-pad" style={{ background: "var(--surface)", padding: "100px 40px" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ display: "inline-block", fontSize: 12, fontWeight: 600, color: "var(--brand)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 16 }}>Submit a Review</div>
        <h2 className="display" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(30px, 4vw, 48px)", fontWeight: 800, letterSpacing: -1.5, lineHeight: 1.15, maxWidth: 620, margin: "0 auto 16px" }}>Share your <span style={{ color: "var(--brand)" }}>experience</span></h2>
        <p style={{ fontSize: 17, color: "var(--text-2)", maxWidth: 520, margin: "0 auto 60px", lineHeight: 1.7 }}>Your feedback helps businesses improve and helps other customers make better decisions.</p>
      </div>

      <div style={{ maxWidth: 680, margin: "0 auto", background: "var(--white)", border: "1px solid var(--border)", borderRadius: 24, padding: 44, boxShadow: "var(--shadow-lg)" }}>
        {submitted ? (
          <div style={{ textAlign: "center", padding: 40 }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
            <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 22, fontWeight: 800, marginBottom: 8 }}>Thank you for your review!</div>
            <div style={{ fontSize: 15, color: "var(--text-2)" }}>Your feedback has been added to the dashboard. Businesses typically respond within 24 hours.</div>
            <button onClick={reset} style={{ marginTop: 24, padding: "12px 28px", borderRadius: 50, border: "1.5px solid var(--border)", background: "var(--white)", fontSize: 14, fontWeight: 500, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>Submit Another Review</button>
          </div>
        ) : (
          <>
            <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 26, fontWeight: 800, letterSpacing: -0.5, marginBottom: 6 }}>Leave a Review</div>
            <div style={{ fontSize: 14, color: "var(--text-2)", marginBottom: 32 }}>Takes less than 2 minutes. Your honest feedback matters.</div>

            <div style={{ marginBottom: 18 }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: "var(--text-2)", marginBottom: 8 }}>Your Rating</div>
              <div style={{ display: "flex", gap: 6 }}>
                {[1, 2, 3, 4, 5].map((v) => (
                  <button key={v} onClick={() => setRating(v)} onMouseEnter={() => setHovered(v)} onMouseLeave={() => setHovered(0)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 28, color: v <= (hovered || rating) ? "var(--amber)" : "var(--border)", transition: "all 0.15s", padding: 2, transform: v <= (hovered || rating) ? "scale(1.1)" : "scale(1)" }}>★</button>
                ))}
              </div>
              <div style={{ fontSize: 13, color: rating >= 4 ? "var(--green)" : rating >= 3 ? "var(--amber)" : rating > 0 ? "var(--red)" : "var(--text-3)", marginTop: 4 }}>{rating ? RATING_LABELS[rating] : "Click to rate"}</div>
            </div>

            <div className="form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ fontSize: 13, fontWeight: 500, color: "var(--text-2)" }}>First Name</label>
                <input value={form.firstname} onChange={(e) => setForm((f) => ({ ...f, firstname: e.target.value }))} placeholder="Arjun" style={inputStyle} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ fontSize: 13, fontWeight: 500, color: "var(--text-2)" }}>Last Name</label>
                <input value={form.lastname} onChange={(e) => setForm((f) => ({ ...f, lastname: e.target.value }))} placeholder="Sharma" style={inputStyle} />
              </div>
            </div>

            <div className="form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ fontSize: 13, fontWeight: 500, color: "var(--text-2)" }}>Email</label>
                <input type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} placeholder="arjun@example.com" style={inputStyle} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ fontSize: 13, fontWeight: 500, color: "var(--text-2)" }}>Platform</label>
                <select value={form.platform} onChange={(e) => setForm((f) => ({ ...f, platform: e.target.value }))} style={{ ...inputStyle, appearance: "none", background: `var(--white) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='7'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%2394A3B8' fill='none' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E") no-repeat right 12px center`, paddingRight: 36 }}>
                  <option value="google">Google</option>
                  <option value="trustpilot">Trustpilot</option>
                  <option value="yelp">Yelp</option>
                  <option value="appstore">App Store</option>
                  <option value="direct">Direct</option>
                </select>
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 13, fontWeight: 500, color: "var(--text-2)", display: "block", marginBottom: 6 }}>Your Review</label>
              <textarea value={form.text} onChange={(e) => setForm((f) => ({ ...f, text: e.target.value }))} placeholder="Share your experience in detail. What went well? What could be improved?" style={{ ...inputStyle, resize: "vertical", minHeight: 110 }} />
            </div>

            <div className="form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ fontSize: 13, fontWeight: 500, color: "var(--text-2)" }}>Product / Service</label>
                <input value={form.product} onChange={(e) => setForm((f) => ({ ...f, product: e.target.value }))} placeholder="e.g. Premium Plan, Mobile App" style={inputStyle} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ fontSize: 13, fontWeight: 500, color: "var(--text-2)" }}>Would you recommend?</label>
                <select value={form.recommend} onChange={(e) => setForm((f) => ({ ...f, recommend: e.target.value }))} style={{ ...inputStyle, appearance: "none", background: `var(--white) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='7'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%2394A3B8' fill='none' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E") no-repeat right 12px center`, paddingRight: 36 }}>
                  <option value="yes">Yes, definitely!</option>
                  <option value="maybe">Maybe</option>
                  <option value="no">Probably not</option>
                </select>
              </div>
            </div>

            <button onClick={handleSubmit} style={{ width: "100%", padding: 14, background: "var(--brand)", color: "white", border: "none", borderRadius: "var(--radius-xs)", fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 16, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "all 0.2s", boxShadow: "0 4px 14px rgba(249,115,22,0.3)", marginTop: 6 }}>
              Submit Review ✓
            </button>
          </>
        )}
      </div>
    </section>
  );
}
