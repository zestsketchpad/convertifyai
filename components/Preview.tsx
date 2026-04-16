"use client";

import { useEffect, useState } from "react";
import type { GeneratedPayload } from "@/lib/generated";

type Props = {
  data: GeneratedPayload | null;
};

type Theme = {
  shell: string;
  hero: string;
  heroGlow: string;
  title: string;
  subtitle: string;
  nav: string;
  chip: string;
  ctaPrimary: string;
  ctaSecondary: string;
  card: string;
  sectionTitle: string;
  input: string;
  ring: string;
};

const THEMES: Theme[] = [
  {
    shell:
      "bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100 font-[family-name:'Trebuchet_MS',Verdana,sans-serif]",
    hero: "bg-gradient-to-br from-cyan-500/25 via-blue-500/20 to-slate-900",
    heroGlow: "bg-cyan-400/20",
    title: "text-cyan-100",
    subtitle: "text-cyan-50/85",
    nav: "text-slate-200/90",
    chip: "bg-cyan-500/15 border border-cyan-400/35 text-cyan-100",
    ctaPrimary:
      "bg-cyan-300 text-slate-950 hover:bg-cyan-200 shadow-[0_0_25px_rgba(34,211,238,0.45)]",
    ctaSecondary: "border border-cyan-300/40 text-cyan-100 hover:bg-cyan-400/10",
    card: "bg-slate-900/80 border border-slate-700/80 shadow-[0_12px_30px_rgba(2,6,23,0.45)]",
    sectionTitle: "text-cyan-100",
    input: "bg-slate-900/70 border border-slate-700 text-slate-100 placeholder:text-slate-400",
    ring: "focus:ring-cyan-400/60",
  },
  {
    shell:
      "bg-gradient-to-b from-neutral-950 via-zinc-900 to-neutral-950 text-zinc-100 font-[family-name:'Segoe_UI',Tahoma,sans-serif]",
    hero: "bg-gradient-to-br from-rose-500/25 via-orange-500/20 to-neutral-900",
    heroGlow: "bg-rose-400/20",
    title: "text-rose-100",
    subtitle: "text-orange-50/85",
    nav: "text-zinc-200/90",
    chip: "bg-rose-500/15 border border-rose-400/35 text-rose-100",
    ctaPrimary:
      "bg-rose-300 text-zinc-950 hover:bg-rose-200 shadow-[0_0_25px_rgba(251,113,133,0.45)]",
    ctaSecondary: "border border-rose-300/40 text-rose-100 hover:bg-rose-400/10",
    card: "bg-zinc-900/80 border border-zinc-700/80 shadow-[0_12px_30px_rgba(0,0,0,0.45)]",
    sectionTitle: "text-rose-100",
    input: "bg-zinc-900/70 border border-zinc-700 text-zinc-100 placeholder:text-zinc-400",
    ring: "focus:ring-rose-400/60",
  },
  {
    shell:
      "bg-gradient-to-b from-emerald-950 via-teal-950 to-emerald-950 text-emerald-50 font-[family-name:'Gill_Sans',Calibri,sans-serif]",
    hero: "bg-gradient-to-br from-emerald-500/25 via-teal-500/20 to-emerald-950",
    heroGlow: "bg-emerald-300/20",
    title: "text-emerald-100",
    subtitle: "text-emerald-50/85",
    nav: "text-emerald-100/90",
    chip: "bg-emerald-500/15 border border-emerald-300/35 text-emerald-100",
    ctaPrimary:
      "bg-emerald-300 text-emerald-950 hover:bg-emerald-200 shadow-[0_0_25px_rgba(16,185,129,0.45)]",
    ctaSecondary:
      "border border-emerald-300/40 text-emerald-100 hover:bg-emerald-400/10",
    card: "bg-emerald-950/70 border border-emerald-700/70 shadow-[0_12px_30px_rgba(6,78,59,0.45)]",
    sectionTitle: "text-emerald-100",
    input:
      "bg-emerald-950/70 border border-emerald-700 text-emerald-50 placeholder:text-emerald-300/60",
    ring: "focus:ring-emerald-400/60",
  },
];

function hashString(text: string) {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = (hash << 5) - hash + text.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function toTitleCase(value: string) {
  return value
    .split(" ")
    .map((word) => (word ? `${word[0].toUpperCase()}${word.slice(1).toLowerCase()}` : ""))
    .join(" ");
}

export default function Preview({ data }: Props) {
  const landing = data?.landing;
  const headline = landing?.headline?.trim() || "Your Offer, Reframed for Conversion";
  const subheadline =
    landing?.subheadline?.trim() ||
    "Built from real customer language so your message sounds trusted, clear, and actionable.";
  const benefits: string[] = Array.isArray(landing?.benefits) ? landing.benefits : [];
  const cta = landing?.cta?.trim() || "Book a Free Consultation";

  const keywords: string[] = Array.isArray(data?.keywords) ? data.keywords : [];
  const painPoints: string[] = Array.isArray(data?.painPoints) ? data.painPoints : [];

  const [fullScreen, setFullScreen] = useState(false);

  const rawTestimonials: Array<{ name?: unknown; review?: unknown }> = Array.isArray(
    data?.testimonials,
  )
    ? data.testimonials
    : [];

  const testimonials = rawTestimonials
    .map((t) => ({
      name:
        typeof t?.name === "string" && t.name.trim() ? t.name.trim() : "Anonymous",
      review: typeof t?.review === "string" ? t.review.trim() : "",
    }))
    .filter((t) => t.review.length > 0);

  const seed = [headline, subheadline, ...keywords.slice(0, 4), ...painPoints.slice(0, 2)]
    .join("|")
    .trim();
  const hash = hashString(seed || "fallback");
  const theme = THEMES[hash % THEMES.length];

  const conversion = data?.scores?.conversion ?? 50;
  const clarity = data?.scores?.clarity ?? 50;
  const emotion = data?.scores?.emotion ?? 50;
  const stats = [
    { label: "Conversion Potential", value: `${conversion}%` },
    { label: "Message Clarity", value: `${clarity}%` },
    { label: "Emotional Pull", value: `${emotion}%` },
  ];

  const visibleBenefits = benefits.length > 0 ? benefits.slice(0, 6) : [];
  const visibleKeywords = keywords.length > 0 ? keywords.slice(0, 5) : [];
  const visiblePainPoints = painPoints.length > 0 ? painPoints.slice(0, 3) : [];

  useEffect(() => {
    if (!fullScreen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setFullScreen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [fullScreen]);

  const previewContent = (
    <div className={`relative overflow-hidden rounded-2xl ${theme.shell}`}>
      <div className="absolute inset-0 pointer-events-none">
        <div
          className={`absolute -top-24 -left-16 h-72 w-72 rounded-full blur-3xl ${theme.heroGlow}`}
        />
        <div className="absolute -bottom-28 right-0 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 border-b border-white/10 px-6 py-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="text-sm font-semibold tracking-[0.18em] uppercase">AI Landing Preview</div>
          <nav className={`flex items-center gap-3 text-sm ${theme.nav}`}>
            <a href="#benefits">Benefits</a>
            <a href="#proof">Proof</a>
            <a href="#action">Action</a>
          </nav>
        </div>
      </div>

      <section className={`relative z-10 p-8 md:p-12 ${theme.hero}`}>
        <h1 className={`text-3xl md:text-5xl leading-tight font-black mb-4 ${theme.title}`}>
          {headline}
        </h1>
        <p className={`max-w-2xl text-base md:text-lg mb-6 ${theme.subtitle}`}>{subheadline}</p>

        <div className="flex flex-wrap items-center gap-3 mb-6">
          <button
            type="button"
            className={`px-6 py-3 rounded-full text-sm md:text-base font-bold transition ${theme.ctaPrimary}`}
          >
            {cta}
          </button>
          <button
            type="button"
            className={`px-5 py-3 rounded-full text-sm md:text-base font-semibold transition ${theme.ctaSecondary}`}
          >
            View Portfolio
          </button>
        </div>

        {visibleKeywords.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {visibleKeywords.map((keyword, i) => (
              <span key={`${keyword}-${i}`} className={`px-3 py-1 rounded-full text-xs ${theme.chip}`}>
                {toTitleCase(keyword)}
              </span>
            ))}
          </div>
        )}
      </section>

      <section className="relative z-10 p-6 md:p-8 grid md:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className={`p-5 rounded-xl ${theme.card}`}>
            <p className="text-xs uppercase tracking-[0.16em] text-slate-300/80 mb-2">{stat.label}</p>
            <p className="text-3xl font-black">{stat.value}</p>
          </div>
        ))}
      </section>

      <section id="benefits" className="relative z-10 px-6 md:px-8 pb-6">
        <h2 className={`text-2xl font-bold mb-4 ${theme.sectionTitle}`}>Why Customers Choose This</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {visibleBenefits.length === 0 ? (
            <div className={`md:col-span-3 p-5 rounded-xl ${theme.card}`}>
              <p className="text-center text-slate-300">No benefits generated yet</p>
            </div>
          ) : (
            visibleBenefits.map((benefit, i) => (
              <article key={`${benefit}-${i}`} className={`p-5 rounded-xl ${theme.card}`}>
                <p className="font-semibold text-lg mb-2">{benefit}</p>
                <p className="text-sm text-slate-300/80">
                  Crafted from direct customer feedback to increase trust and conversion.
                </p>
              </article>
            ))
          )}
        </div>
      </section>

      <section id="proof" className="relative z-10 px-6 md:px-8 pb-6">
        <h2 className={`text-2xl font-bold mb-4 ${theme.sectionTitle}`}>What Users Say</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {testimonials.length === 0 ? (
            <div className={`md:col-span-2 p-5 rounded-xl ${theme.card}`}>
              <p className="text-center text-slate-300">No testimonials generated yet</p>
            </div>
          ) : (
            testimonials.slice(0, 6).map((t, i) => (
              <div key={`${t.name}-${i}`} className={`p-5 rounded-xl ${theme.card}`}>
                <p className="mb-3 leading-relaxed">&quot;{t.review}&quot;</p>
                <p className="text-sm text-slate-300/80">- {t.name}</p>
              </div>
            ))
          )}
        </div>
      </section>

      {visiblePainPoints.length > 0 && (
        <section className="relative z-10 px-6 md:px-8 pb-6">
          <h2 className={`text-2xl font-bold mb-4 ${theme.sectionTitle}`}>How We Address Concerns</h2>
          <div className="grid gap-3">
            {visiblePainPoints.map((point, i) => (
              <div key={`${point}-${i}`} className={`p-4 rounded-xl ${theme.card}`}>
                <p className="font-medium">{point}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section id="action" className="relative z-10 px-6 md:px-8 pb-8 md:pb-10">
        <div className={`p-6 md:p-8 rounded-2xl ${theme.card}`}>
          <h3 className={`text-2xl font-bold mb-2 ${theme.sectionTitle}`}>Get A Personalized Plan</h3>
          <p className="text-sm text-slate-300/85 mb-4">
            Semi-functional lead capture preview to demonstrate real landing behavior.
          </p>
          <form
            className="grid md:grid-cols-[1fr_auto] gap-3"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Demo form captured. Connect this to your backend lead endpoint.");
            }}
          >
            <input
              type="email"
              required
              placeholder="Enter your email"
              className={`w-full px-4 py-3 rounded-xl outline-none ring-1 ring-transparent ${theme.input} ${theme.ring}`}
            />
            <button
              type="submit"
              className={`px-5 py-3 rounded-xl font-semibold transition ${theme.ctaPrimary}`}
            >
              {cta}
            </button>
          </form>
        </div>
      </section>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-end">
        <button
          type="button"
          onClick={() => setFullScreen(true)}
          className="px-4 py-2 rounded-xl border border-white/20 bg-white/5 text-sm text-white hover:bg-white/10 transition"
        >
          Open Full Screen Preview
        </button>
      </div>

      {previewContent}

      {fullScreen && (
        <div className="fixed inset-0 z-[90] bg-black/90 p-3 md:p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">
            <div className="mb-3 flex justify-end">
              <button
                type="button"
                onClick={() => setFullScreen(false)}
                className="px-4 py-2 rounded-xl border border-white/30 bg-white/10 text-white hover:bg-white/20 transition"
              >
                Close Preview
              </button>
            </div>

            <div className="min-h-[calc(100vh-7rem)]">{previewContent}</div>
          </div>
        </div>
      )}
    </div>
  );
}
