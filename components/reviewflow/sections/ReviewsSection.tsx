"use client";

import { useState } from "react";
import { AI_REPLIES, type Filter, type Platform, type Review, type Sentiment } from "../config";
import { AIModal, Avatar, SentimentTag, Stars } from "../ui";

function ReviewCard({ review, onToast, onReviewsChange, reviews }: { review: Review; onToast: (msg: string) => void; onReviewsChange: (reviews: Review[]) => void; reviews: Review[] }) {
  const [replyOpen, setReplyOpen] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [aiReply, setAiReply] = useState<string | null>(null);

  const markRead = () => {
    onReviewsChange(reviews.map((r) => r.id === review.id ? { ...r, unread: false } : r));
  };

  const sendReply = () => {
    if (!replyText.trim()) {
      onToast("⚠️ Please write a reply first");
      return;
    }
    onReviewsChange(reviews.map((r) => r.id === review.id ? { ...r, replied: true, unread: false } : r));
    onToast("✅ Reply sent successfully!");
  };

  const showAIReply = () => {
    const options = AI_REPLIES[review.sentiment];
    setAiReply(options[Math.floor(Math.random() * options.length)]);
  };

  const publishAI = () => {
    onReviewsChange(reviews.map((r) => r.id === review.id ? { ...r, replied: true, unread: false } : r));
    setAiReply(null);
    onToast("✅ Reply published!");
  };

  return (
    <>
      {aiReply && <AIModal reply={aiReply} onClose={() => setAiReply(null)} onPublish={publishAI} />}
      <div className="review-card" style={{ background: "var(--white)", border: `${review.unread ? "3px" : "1px"} solid ${review.unread ? "var(--brand)" : "var(--border)"}`, borderRadius: "var(--radius)", padding: "20px 22px", position: "relative" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Avatar initials={review.initials} color={review.color} textColor={review.textColor} />
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
                {review.name}
                {review.unread && <span style={{ width: 7, height: 7, background: "var(--brand)", borderRadius: "50%", display: "inline-block" }} />}
              </div>
              <div style={{ fontSize: 12, color: "var(--text-3)", display: "flex", alignItems: "center", gap: 6 }}>
                {review.platform.charAt(0).toUpperCase() + review.platform.slice(1)}
                <span style={{ width: 3, height: 3, borderRadius: "50%", background: "var(--text-3)", display: "inline-block" }} />
                {review.time}
                {review.replied && <><span style={{ width: 3, height: 3, borderRadius: "50%", background: "var(--text-3)", display: "inline-block" }} /><span style={{ color: "var(--green)", fontWeight: 600 }}>Replied</span></>}
              </div>
            </div>
          </div>
          <Stars count={review.rating} dimEmpty />
        </div>
        <div style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.65, marginBottom: 12 }}>
          "{review.text}"
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
          <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
            <SentimentTag sentiment={review.sentiment} />
            <span style={{ padding: "3px 10px", borderRadius: 50, fontSize: 11, fontWeight: 600, background: "var(--surface)", color: "var(--text-2)", border: "1px solid var(--border)" }}>{review.platform}</span>
            {!review.replied && <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 10px", borderRadius: 50, fontSize: 11, fontWeight: 600, background: "var(--indigo-light)", color: "var(--indigo)", border: "1px solid rgba(99,102,241,0.2)" }}>✨ AI Reply Ready</span>}
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {!review.replied && <button className="review-action-btn primary-action" onClick={showAIReply} style={{ padding: "5px 12px", borderRadius: 50, fontSize: 12, fontWeight: 500, border: "1px solid var(--brand)", background: "var(--brand)", cursor: "pointer", color: "white", fontFamily: "'DM Sans', sans-serif", transition: "all 0.15s" }}>Reply with AI</button>}
            <button className="review-action-btn" onClick={() => setReplyOpen(!replyOpen)} style={{ padding: "5px 12px", borderRadius: 50, fontSize: 12, fontWeight: 500, border: "1px solid var(--border)", background: "transparent", cursor: "pointer", color: "var(--text-2)", fontFamily: "'DM Sans', sans-serif", transition: "all 0.15s" }}>Manual Reply</button>
            {review.unread && <button className="review-action-btn" onClick={markRead} style={{ padding: "5px 12px", borderRadius: 50, fontSize: 12, fontWeight: 500, border: "1px solid var(--border)", background: "transparent", cursor: "pointer", color: "var(--text-2)", fontFamily: "'DM Sans', sans-serif", transition: "all 0.15s" }}>Mark Read</button>}
          </div>
        </div>
        {replyOpen && (
          <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid var(--border)" }}>
            <textarea value={replyText} onChange={(e) => setReplyText(e.target.value)} placeholder={`Write your reply to ${review.name}...`} style={{ width: "100%", padding: "10px 14px", border: "1px solid var(--border)", borderRadius: "var(--radius-xs)", fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "var(--text)", background: "var(--surface)", resize: "none", minHeight: 70, outline: "none" }} />
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 8 }}>
              <button onClick={() => setReplyOpen(false)} style={{ padding: "5px 12px", borderRadius: 50, fontSize: 12, fontWeight: 500, border: "1px solid var(--border)", background: "transparent", cursor: "pointer", color: "var(--text-2)", fontFamily: "'DM Sans', sans-serif" }}>Cancel</button>
              <button onClick={sendReply} style={{ padding: "5px 12px", borderRadius: 50, fontSize: 12, fontWeight: 500, border: "1px solid var(--brand)", background: "var(--brand)", cursor: "pointer", color: "white", fontFamily: "'DM Sans', sans-serif" }}>Send Reply</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default function ReviewsSection({ reviews, onReviewsChange, onToast }: { reviews: Review[]; onReviewsChange: (r: Review[]) => void; onToast: (msg: string) => void }) {
  const [filter, setFilter] = useState<Filter>({ sentiment: "", rating: "", platform: "", unread: false });

  const filtered = reviews.filter((r) => {
    if (filter.sentiment && r.sentiment !== filter.sentiment) return false;
    if (filter.platform && r.platform !== filter.platform) return false;
    if (filter.unread && !r.unread) return false;
    if (filter.rating) {
      if (filter.rating === "1-2" && r.rating > 2) return false;
      if (filter.rating !== "1-2" && r.rating !== parseInt(filter.rating)) return false;
    }
    return true;
  });

  return (
    <section id="dashboard" className="section-pad" style={{ background: "var(--white)", padding: "100px 40px" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ display: "inline-block", fontSize: 12, fontWeight: 600, color: "var(--brand)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 16 }}>Live Dashboard</div>
        <h2 className="display" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(30px, 4vw, 48px)", fontWeight: 800, letterSpacing: -1.5, lineHeight: 1.15, maxWidth: 620, margin: "0 auto 16px" }}>Your <span style={{ color: "var(--brand)" }}>review inbox,</span> reimagined</h2>
        <p style={{ fontSize: 17, color: "var(--text-2)", maxWidth: 520, margin: "0 auto 60px", lineHeight: 1.7 }}>Filter, reply, and manage every review. Try clicking Reply to see AI-powered responses.</p>
      </div>
      <div className="reviews-layout" style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "380px 1fr", gap: 40, alignItems: "start" }}>
        <div className="reviews-sidebar" style={{ position: "sticky", top: 90 }}>
          <div className="analytics-card" style={{ background: "var(--white)", border: "1px solid var(--border)", borderRadius: 20, padding: 28, marginBottom: 16, textAlign: "center" }}>
            <div style={{ width: 120, height: 120, borderRadius: "50%", background: "conic-gradient(var(--brand) 0deg 338deg, var(--surface) 0)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", position: "relative" }}>
              <div style={{ position: "absolute", inset: 8, background: "var(--white)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 30, fontWeight: 800 }}>4.8</div>
                <div style={{ fontSize: 11, color: "var(--text-3)" }}>Overall</div>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 4, marginBottom: 12 }}>
              {[1, 2, 3, 4].map((i) => <span key={i} style={{ fontSize: 18, color: "var(--amber)" }}>★</span>)}
              <span style={{ fontSize: 18, color: "var(--amber)", opacity: 0.3 }}>★</span>
            </div>
            <div style={{ fontSize: 13, color: "var(--text-3)" }}>Based on 2,847 reviews</div>
          </div>

          <div style={{ marginBottom: 8, fontSize: 13, fontWeight: 600, color: "var(--text-2)" }}>BY PLATFORM</div>
          {[
            { emoji: "🔍", name: "Google", platform: "google", count: "1,204 reviews", avg: "4.9", stars: 5 },
            { emoji: "✅", name: "Trustpilot", platform: "trustpilot", count: "843 reviews", avg: "4.3", stars: 4 },
            { emoji: "🌟", name: "Yelp", platform: "yelp", count: "521 reviews", avg: "3.7", stars: 3 },
            { emoji: "📱", name: "App Store", platform: "appstore", count: "279 reviews", avg: "4.4", stars: 4 },
          ].map((p) => (
            <div key={p.platform} className="platform-badge" onClick={() => setFilter((f) => ({ ...f, platform: f.platform === p.platform ? "" : p.platform as Platform }))} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", border: `1px solid ${filter.platform === p.platform ? "var(--brand)" : "var(--border)"}`, borderRadius: "var(--radius-xs)", marginBottom: 8, background: filter.platform === p.platform ? "var(--brand-light)" : "var(--white)" }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{p.emoji} {p.name}</div>
                <div style={{ fontSize: 12, color: "var(--text-3)" }}>{p.count}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ display: "flex", gap: 2 }}>{Array.from({ length: 5 }, (_, i) => <span key={i} style={{ fontSize: 12, color: i < p.stars ? "var(--amber)" : "var(--border)" }}>★</span>)}</div>
                <div style={{ fontSize: 11, color: "var(--text-3)" }}>{p.avg} avg</div>
              </div>
            </div>
          ))}

          <div style={{ marginTop: 16, padding: 16, background: "var(--indigo-light)", borderRadius: "var(--radius-sm)", border: "1px solid rgba(99,102,241,0.15)" }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--indigo)", marginBottom: 6 }}>🤖 AI Insight</div>
            <div style={{ fontSize: 12, color: "var(--indigo)", lineHeight: 1.6 }}>
              "Shipping speed is your top pain point — mentioned in 34% of 3-star reviews this week."
            </div>
          </div>
        </div>

        <div>
          <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
            <select value={filter.sentiment} onChange={(e) => setFilter((f) => ({ ...f, sentiment: e.target.value }))} style={{ padding: "8px 14px", border: "1.5px solid var(--border)", borderRadius: 50, fontSize: 13, fontFamily: "'DM Sans', sans-serif", color: "var(--text)", outline: "none", cursor: "pointer", background: "var(--white)" }}>
              <option value="">All Sentiments</option>
              <option value="positive">Positive</option>
              <option value="neutral">Neutral</option>
              <option value="negative">Negative</option>
            </select>
            <select value={filter.rating} onChange={(e) => setFilter((f) => ({ ...f, rating: e.target.value }))} style={{ padding: "8px 14px", border: "1.5px solid var(--border)", borderRadius: 50, fontSize: 13, fontFamily: "'DM Sans', sans-serif", color: "var(--text)", outline: "none", cursor: "pointer", background: "var(--white)" }}>
              <option value="">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="1-2">1-2 Stars</option>
            </select>
            <button onClick={() => setFilter((f) => ({ ...f, unread: !f.unread }))} style={{ padding: "8px 16px", border: `1.5px solid ${filter.unread ? "var(--brand)" : "var(--border)"}`, borderRadius: 50, fontSize: 13, fontFamily: "'DM Sans', sans-serif", cursor: "pointer", background: filter.unread ? "var(--brand-light)" : "var(--white)", color: filter.unread ? "var(--brand-dark)" : "var(--text-2)", transition: "all 0.2s" }}>Unread only</button>
            <div style={{ marginLeft: "auto", fontSize: 13, color: "var(--text-3)", display: "flex", alignItems: "center" }}>{filtered.length} review{filtered.length !== 1 ? "s" : ""}</div>
          </div>
          <div className="reviews-feed" style={{ display: "flex", flexDirection: "column", gap: 14, maxHeight: 600, overflowY: "auto", paddingRight: 4 }}>
            {filtered.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 20px", color: "var(--text-3)" }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
                <div>No reviews match your filters</div>
              </div>
            ) : (
              filtered.map((review) => (
                <ReviewCard key={review.id} review={review} onToast={onToast} onReviewsChange={onReviewsChange} reviews={reviews} />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
