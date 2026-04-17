export type Sentiment = "positive" | "neutral" | "negative";
export type Platform = "google" | "trustpilot" | "yelp" | "appstore" | "direct";

export interface Review {
  id: number;
  name: string;
  initials: string;
  color: string;
  textColor: string;
  rating: number;
  platform: Platform;
  sentiment: Sentiment;
  text: string;
  time: string;
  unread: boolean;
  replied: boolean;
}

export interface Filter {
  sentiment: string;
  rating: string;
  platform: string;
  unread: boolean;
}

export const INITIAL_REVIEWS: Review[] = [
  { id: 1, name: "Arjun Mehta", initials: "AM", color: "#EEF2FF", textColor: "#6366F1", rating: 5, platform: "google", sentiment: "positive", text: "Absolutely fantastic service! The product arrived two days early and was packaged beautifully. The quality exceeded my expectations. Will definitely order again and recommend to all my friends!", time: "2 hours ago", unread: true, replied: false },
  { id: 2, name: "Sneha Patel", initials: "SP", color: "#FFF7ED", textColor: "#EA580C", rating: 3, platform: "yelp", sentiment: "neutral", text: "The product itself is decent but the shipping took much longer than expected. Customer support was eventually helpful when I reached out, but getting there was a bit of a hassle. Room for improvement on logistics.", time: "5 hours ago", unread: true, replied: false },
  { id: 3, name: "Vikram Singh", initials: "VS", color: "#F0FDF4", textColor: "#166534", rating: 5, platform: "trustpilot", sentiment: "positive", text: "Outstanding! I was skeptical at first but this has completely changed my workflow. The interface is intuitive and the results speak for themselves. Best purchase I've made this quarter.", time: "1 day ago", unread: false, replied: true },
  { id: 4, name: "Kavya Reddy", initials: "KR", color: "#FEF2F2", textColor: "#991B1B", rating: 2, platform: "google", sentiment: "negative", text: "Very disappointed. The product description was misleading - what I received was quite different from what was shown in the photos. Spent two hours trying to get a refund. The support team was unhelpful and kept giving me scripted responses.", time: "1 day ago", unread: true, replied: false },
  { id: 5, name: "Rohit Nair", initials: "RN", color: "#FFFBEB", textColor: "#92400E", rating: 4, platform: "appstore", sentiment: "positive", text: "Really good app overall. The UI is clean and modern, and most features work exactly as advertised. Knocked off one star because the search functionality feels a bit slow. Looking forward to future updates!", time: "2 days ago", unread: false, replied: true },
  { id: 6, name: "Divya Kumar", initials: "DK", color: "#EEF2FF", textColor: "#4338CA", rating: 5, platform: "trustpilot", sentiment: "positive", text: "Convertify AI has transformed how we handle customer feedback. We went from drowning in reviews to responding to all of them within hours. The AI suggestions are incredibly accurate and on-brand.", time: "3 days ago", unread: false, replied: true },
  { id: 7, name: "Arun Sharma", initials: "AS", color: "#FFF7ED", textColor: "#C2410C", rating: 1, platform: "yelp", sentiment: "negative", text: "Terrible experience from start to finish. The product stopped working after three days. Customer service kept me waiting for over a week with no resolution. Requesting a full refund and I will never shop here again.", time: "4 days ago", unread: true, replied: false },
  { id: 8, name: "Meera Iyer", initials: "MI", color: "#F0FDF4", textColor: "#15803D", rating: 5, platform: "google", sentiment: "positive", text: "Hands down the best platform I've used for managing reviews. The analytics dashboard is insanely useful - we discovered a recurring theme in negative reviews and fixed the issue within a week. Our ratings went up by 0.4 stars!", time: "5 days ago", unread: false, replied: true },
];

export const AI_REPLIES: Record<Sentiment, string[]> = {
  positive: [
    "Thank you so much for your wonderful review! 🙏 We're thrilled to hear that you had such a positive experience. Your satisfaction is our top priority, and it's feedback like yours that keeps our team motivated. We look forward to serving you again soon!",
    "What an amazing review - thank you! 😊 We work really hard to deliver quality, and it's incredibly rewarding to know we hit the mark. We'd love to see you back and will continue doing our best to exceed your expectations every time.",
  ],
  neutral: [
    "Thank you for taking the time to share your feedback. We genuinely appreciate your honesty - your experience highlights areas where we can do better. We've shared your comments with our team and are actively working on improving our shipping timelines. Please don't hesitate to reach out directly and we'll make it right.",
    "We appreciate your candid review! Your feedback is invaluable to us. We're sorry to hear the experience wasn't perfect - please reach out to our support team at support@convertify.ai and we'll personally ensure things are improved for your next order.",
  ],
  negative: [
    "We are truly sorry to hear about your experience and sincerely apologize for falling short of your expectations. This is absolutely not the standard we hold ourselves to. I'd like to personally make this right - please reach out to us at priority@convertify.ai and we'll resolve this immediately with a full refund or replacement.",
    "Thank you for bringing this to our attention. Your experience is unacceptable and we take full responsibility. Our quality team has already been alerted. Please contact us directly so we can urgently resolve your situation - we are committed to making this right for you.",
  ],
};

export const RATING_LABELS: Record<number, string> = {
  1: "😞 Poor",
  2: "😐 Fair",
  3: "😊 Okay",
  4: "😄 Good",
  5: "🤩 Excellent!",
};

export const AVATAR_COLORS = [
  { bg: "#EEF2FF", text: "#6366F1" },
  { bg: "#FFF7ED", text: "#EA580C" },
  { bg: "#F0FDF4", text: "#166534" },
  { bg: "#FFFBEB", text: "#92400E" },
  { bg: "#FEF2F2", text: "#991B1B" },
];

export const globalStyles = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300;12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

:root {
  --brand: #F97316;
  --brand-light: #FFF7ED;
  --brand-dark: #EA580C;
  --indigo: #6366F1;
  --indigo-light: #EEF2FF;
  --green: #22C55E;
  --green-light: #F0FDF4;
  --red: #EF4444;
  --red-light: #FEF2F2;
  --amber: #F59E0B;
  --amber-light: #FFFBEB;
  --text: #0F172A;
  --text-2: #475569;
  --text-3: #94A3B8;
  --border: #E2E8F0;
  --border-2: #CBD5E1;
  --surface: #F8FAFC;
  --white: #FFFFFF;
  --radius: 16px;
  --radius-sm: 10px;
  --radius-xs: 8px;
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
  --shadow: 0 4px 16px rgba(0,0,0,0.06), 0 2px 6px rgba(0,0,0,0.04);
  --shadow-lg: 0 20px 40px rgba(0,0,0,0.08), 0 8px 16px rgba(0,0,0,0.04);
}

.dark {
  --brand-light: #1f1307;
  --indigo-light: #1b1f3a;
  --green-light: #102417;
  --red-light: #2a1518;
  --amber-light: #2b210f;
  --text: #E2E8F0;
  --text-2: #CBD5E1;
  --text-3: #94A3B8;
  --border: #334155;
  --border-2: #475569;
  --surface: #0F172A;
  --white: #020617;
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.45), 0 1px 2px rgba(0,0,0,0.35);
  --shadow: 0 6px 18px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.4);
  --shadow-lg: 0 20px 40px rgba(0,0,0,0.55), 0 8px 16px rgba(0,0,0,0.45);
}

html { scroll-behavior: smooth; }

body {
  font-family: 'DM Sans', sans-serif;
  background: var(--white);
  color: var(--text);
  overflow-x: hidden;
  line-height: 1.6;
}

.dark .hero-section,
.dark .section-pad,
.dark .analytics-card,
.dark .bento-card,
.dark .pricing-card,
.dark .testimonial-card,
.dark .review-card,
.dark .float-card-1,
.dark .float-card-2,
.dark .float-card-3,
.dark .reviews-sidebar,
.dark .logos-strip {
  background: var(--surface) !important;
}

.dark .platform-badge:hover,
.dark .review-action-btn:hover,
.dark .btn-ghost-nav:hover,
.dark .btn-secondary:hover,
.dark .step-card:hover .step-num,
.dark .testimonial-card:hover {
  background: #1E293B !important;
}

@keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.7)} }
@keyframes floatAnim { 0%,100%{ transform: translateY(0) } 50%{ transform: translateY(-8px) } }
@keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

.display { font-family: 'Bricolage Grotesque', sans-serif; }

.hero-badge-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--brand); animation: pulse 2s infinite; }

.float-card-1 { animation: floatAnim 4s ease-in-out infinite; }
.float-card-2 { animation: floatAnim 4s 1s ease-in-out infinite; }
.float-card-3 { animation: floatAnim 4s 0.5s ease-in-out infinite; }

.fade-in-0 { animation: fadeUp 0.6s ease both; }
.fade-in-1 { animation: fadeUp 0.6s 0.1s ease both; }
.fade-in-2 { animation: fadeUp 0.6s 0.2s ease both; }
.fade-in-3 { animation: fadeUp 0.6s 0.3s ease both; }
.fade-in-4 { animation: fadeUp 0.8s 0.4s ease both; }

.step-card:hover .step-num {
  background: var(--brand) !important;
  border-color: var(--brand) !important;
  color: white !important;
  transform: scale(1.1);
}

.bento-card { transition: box-shadow 0.25s, transform 0.25s; }
.bento-card:hover { box-shadow: var(--shadow-lg); transform: translateY(-3px); }

.platform-badge { transition: all 0.2s; cursor: pointer; }
.platform-badge:hover { border-color: var(--border-2) !important; background: var(--surface) !important; }

.review-card { transition: all 0.2s; cursor: pointer; }
.review-card:hover { border-color: var(--border-2) !important; box-shadow: var(--shadow); transform: translateY(-1px); }

.analytics-card { transition: box-shadow 0.25s, transform 0.25s; }
.analytics-card:hover { box-shadow: var(--shadow-lg); transform: translateY(-2px); }

.pricing-card { transition: all 0.25s; }
.pricing-card:hover { box-shadow: var(--shadow-lg); transform: translateY(-4px); }

.testimonial-card { transition: all 0.25s; }
.testimonial-card:hover { background: white !important; box-shadow: var(--shadow); transform: translateY(-2px); }

.logo-item { transition: opacity 0.2s; cursor: default; }
.logo-item:hover { opacity: 1 !important; }

.footer-link { transition: color 0.2s; }
.footer-link:hover { color: var(--brand) !important; }

.nav-link { transition: color 0.2s; }
.nav-link:hover { color: var(--text) !important; }

.btn-ghost-nav:hover { background: var(--surface) !important; color: var(--text) !important; }
.btn-brand-nav:hover { background: var(--brand-dark) !important; box-shadow: 0 4px 16px rgba(249,115,22,0.4) !important; transform: translateY(-1px); }

.btn-primary:hover { background: var(--brand-dark) !important; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(249,115,22,0.4) !important; }
.btn-secondary:hover { border-color: var(--border-2) !important; box-shadow: var(--shadow) !important; transform: translateY(-1px); }

.review-action-btn:hover { background: var(--surface) !important; color: var(--text) !important; }
.review-action-btn.primary-action:hover { background: var(--brand-dark) !important; }

.reviews-feed { scrollbar-width: thin; scrollbar-color: var(--border) transparent; }

@media (max-width: 900px) {
  .rf-navbar {
    top: 10px !important;
    height: 60px !important;
    padding: 0 10px !important;
    width: calc(100% - 16px) !important;
  }
  .nav-links-desktop { display: none !important; }
  .bento-grid { grid-template-columns: 1fr !important; }
  .bento-span-2, .bento-span-3 { grid-column: span 1 !important; }
  .steps-grid { grid-template-columns: 1fr 1fr !important; }
  .steps-connector { display: none !important; }
  .reviews-layout { grid-template-columns: 1fr !important; }
  .reviews-sidebar { position: static !important; }
  .analytics-grid { grid-template-columns: 1fr !important; }
  .analytics-sentiment-row { flex-direction: column !important; align-items: flex-start !important; }
  .pricing-grid { grid-template-columns: 1fr !important; }
  .testimonials-grid { grid-template-columns: 1fr !important; }
  .form-row { grid-template-columns: 1fr !important; }
  .footer-grid { grid-template-columns: 1fr 1fr !important; }
  .footer-bottom { flex-direction: column !important; align-items: flex-start !important; gap: 8px !important; }
  .logos-strip { gap: 24px !important; flex-wrap: wrap !important; }
  .hero-section { padding: 100px 20px 60px !important; }
  .section-pad { padding: 70px 20px !important; }
  .hero-dashboard-grid { grid-template-columns: 1fr !important; }
  .hero-review-row { align-items: flex-start !important; }
  .bento-highlight-grid { grid-template-columns: 1fr !important; }
  .analytics-stats-grid { grid-template-columns: 1fr !important; }
  .float-card-1, .float-card-2, .float-card-3 { display: none !important; }
}

@media (max-width: 640px) {
  .rf-navbar {
    height: 56px !important;
    padding: 0 8px !important;
    width: calc(100% - 12px) !important;
  }
  .nav-brand { gap: 8px !important; }
  .nav-brand-text { display: none !important; }
  .nav-actions { gap: 6px !important; }
  .nav-display-name,
  .nav-secondary-action { display: none !important; }
  .btn-brand-nav { padding: 8px 14px !important; font-size: 12px !important; }
  .hero-section { padding: 92px 16px 54px !important; }
  .section-pad { padding: 56px 16px !important; }
  .footer-grid { grid-template-columns: 1fr !important; gap: 28px !important; }
}
`;

