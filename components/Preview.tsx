"use client";

import { useEffect, useState } from "react";
import type { GeneratedPayload } from "@/lib/generated";
import type { PageBlock, PageIndustry, PageMood } from "@/lib/page-plan";

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

const THEMES: Record<PageMood, Theme> = {
  premium: {
    shell: "bg-gradient-to-b from-zinc-950 via-neutral-950 to-black text-zinc-100 font-[family-name:'Segoe_UI',Tahoma,sans-serif]",
    hero: "bg-gradient-to-br from-rose-500/22 via-orange-500/16 to-zinc-950",
    heroGlow: "bg-rose-300/18",
    title: "text-rose-50",
    subtitle: "text-rose-50/80",
    nav: "text-zinc-200/90",
    chip: "bg-rose-500/15 border border-rose-300/30 text-rose-50",
    ctaPrimary: "bg-rose-300 text-zinc-950 hover:bg-rose-200 shadow-[0_0_28px_rgba(251,113,133,0.4)]",
    ctaSecondary: "border border-rose-300/35 text-rose-100 hover:bg-rose-400/10",
    card: "bg-zinc-900/75 border border-zinc-700/80 shadow-[0_18px_50px_rgba(0,0,0,0.36)]",
    sectionTitle: "text-rose-50",
    input: "bg-zinc-900/70 border border-zinc-700 text-zinc-100 placeholder:text-zinc-400",
    ring: "focus:ring-rose-400/60",
  },
  warm: {
    shell: "bg-gradient-to-b from-stone-950 via-neutral-950 to-black text-stone-100 font-[family-name:'Trebuchet_MS',Verdana,sans-serif]",
    hero: "bg-gradient-to-br from-amber-500/18 via-orange-500/12 to-stone-950",
    heroGlow: "bg-amber-300/16",
    title: "text-amber-50",
    subtitle: "text-amber-50/80",
    nav: "text-stone-200/90",
    chip: "bg-amber-500/15 border border-amber-300/30 text-amber-50",
    ctaPrimary: "bg-amber-300 text-stone-950 hover:bg-amber-200 shadow-[0_0_28px_rgba(245,158,11,0.35)]",
    ctaSecondary: "border border-amber-300/35 text-amber-50 hover:bg-amber-400/10",
    card: "bg-stone-900/75 border border-stone-700/80 shadow-[0_18px_50px_rgba(0,0,0,0.34)]",
    sectionTitle: "text-amber-50",
    input: "bg-stone-900/70 border border-stone-700 text-stone-100 placeholder:text-stone-400",
    ring: "focus:ring-amber-400/60",
  },
  bold: {
    shell: "bg-gradient-to-b from-slate-950 via-slate-900 to-black text-slate-100 font-[family-name:'Trebuchet_MS',Verdana,sans-serif]",
    hero: "bg-gradient-to-br from-cyan-500/22 via-blue-500/14 to-slate-950",
    heroGlow: "bg-cyan-300/16",
    title: "text-cyan-50",
    subtitle: "text-cyan-50/80",
    nav: "text-slate-200/90",
    chip: "bg-cyan-500/15 border border-cyan-300/30 text-cyan-50",
    ctaPrimary: "bg-cyan-300 text-slate-950 hover:bg-cyan-200 shadow-[0_0_28px_rgba(34,211,238,0.34)]",
    ctaSecondary: "border border-cyan-300/35 text-cyan-50 hover:bg-cyan-400/10",
    card: "bg-slate-900/75 border border-slate-700/80 shadow-[0_18px_50px_rgba(0,0,0,0.34)]",
    sectionTitle: "text-cyan-50",
    input: "bg-slate-900/70 border border-slate-700 text-slate-100 placeholder:text-slate-400",
    ring: "focus:ring-cyan-400/60",
  },
  editorial: {
    shell: "bg-gradient-to-b from-neutral-950 via-stone-950 to-zinc-950 text-neutral-100 font-[family-name:'Georgia',serif]",
    hero: "bg-gradient-to-br from-neutral-100/14 via-white/8 to-zinc-950",
    heroGlow: "bg-white/10",
    title: "text-white",
    subtitle: "text-neutral-200/85",
    nav: "text-neutral-200/90",
    chip: "bg-white/8 border border-white/15 text-white",
    ctaPrimary: "bg-white text-zinc-950 hover:bg-neutral-200 shadow-[0_0_24px_rgba(255,255,255,0.22)]",
    ctaSecondary: "border border-white/15 text-white hover:bg-white/10",
    card: "bg-white/6 border border-white/10 shadow-[0_18px_50px_rgba(0,0,0,0.34)]",
    sectionTitle: "text-white",
    input: "bg-white/6 border border-white/10 text-white placeholder:text-white/45",
    ring: "focus:ring-white/40",
  },
  calm: {
    shell: "bg-gradient-to-b from-teal-950 via-slate-950 to-black text-teal-50 font-[family-name:'Gill_Sans',Calibri,sans-serif]",
    hero: "bg-gradient-to-br from-teal-500/20 via-cyan-500/12 to-teal-950",
    heroGlow: "bg-teal-300/16",
    title: "text-teal-50",
    subtitle: "text-teal-50/82",
    nav: "text-teal-100/90",
    chip: "bg-teal-500/15 border border-teal-300/30 text-teal-50",
    ctaPrimary: "bg-teal-300 text-teal-950 hover:bg-teal-200 shadow-[0_0_28px_rgba(45,212,191,0.32)]",
    ctaSecondary: "border border-teal-300/35 text-teal-50 hover:bg-teal-400/10",
    card: "bg-teal-950/70 border border-teal-700/70 shadow-[0_18px_50px_rgba(0,0,0,0.34)]",
    sectionTitle: "text-teal-50",
    input: "bg-teal-950/70 border border-teal-700 text-teal-50 placeholder:text-teal-200/50",
    ring: "focus:ring-teal-400/60",
  },
};

function hashString(text: string) {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = (hash << 5) - hash + text.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function getTheme(mood: PageMood) {
  return THEMES[mood] || THEMES.premium;
}

function getPlan(data: GeneratedPayload | null) {
  const plan = data?.pagePlan;
  if (plan) return plan;

  const industry: PageIndustry = "general";
  const mood: PageMood = "premium";
  const layoutStyle: "story" | "trust" | "offer" = data?.painPoints?.length ? "trust" : "story";

  return {
    industry,
    mood,
    layoutStyle,
    sections: fallbackSections(data, layoutStyle),
  };
}

function fallbackSections(data: GeneratedPayload | null, layoutStyle: "story" | "trust" | "offer"): PageBlock[] {
  const headline = data?.landing?.headline?.trim() || "Your Offer, Reframed for Conversion";
  const subheadline = data?.landing?.subheadline?.trim() || "Built from real customer language so your message sounds trusted, clear, and actionable.";
  const cta = data?.landing?.cta?.trim() || "Book A Consultation";
  const keywords = Array.isArray(data?.keywords) ? data.keywords.slice(0, 5) : [];
  const benefits = Array.isArray(data?.benefits) ? data.benefits.slice(0, 6) : [];
  const painPoints = Array.isArray(data?.painPoints) ? data.painPoints.slice(0, 3) : [];
  const testimonials = Array.isArray(data?.testimonials) ? data.testimonials.slice(0, 4) : [];

  return [
    {
      type: "hero",
      title: headline,
      subtitle: subheadline,
      kicker: layoutStyle === "trust" ? "Trust First" : "Customer-Led Story",
      cta,
      secondaryCta: "View Details",
      mediaHint: "premium placeholder visual",
      layout: layoutStyle === "trust" ? "split" : "center",
    },
    {
      type: "signalPanel",
      title: "Performance Signals",
      items: [
        { label: "Conversion", value: `${data?.scores?.conversion ?? 50}%` },
        { label: "Clarity", value: `${data?.scores?.clarity ?? 50}%` },
        { label: "Emotion", value: `${data?.scores?.emotion ?? 50}%` },
      ],
    },
    {
      type: "benefitGrid",
      title: "Why Customers Choose This",
      items: benefits.map((benefit) => ({ title: benefit, description: "Derived from direct review language." })),
      columns: 3,
    },
    ...(testimonials.length > 0
      ? [
          {
            type: "testimonialRail" as const,
            title: "What Users Say",
            items: testimonials.map((item) => ({ quote: item.review, author: item.name })),
            layout: "grid" as const,
          },
        ]
      : []),
    ...(painPoints.length > 0
      ? [
          {
            type: "faq" as const,
            title: "How We Address Concerns",
            items: painPoints.map((point) => ({ q: point, a: "Resolve friction with a clearer process and stronger reassurance." })),
          },
        ]
      : []),
    {
      type: "contact",
      title: "Get A Personalized Plan",
      description: `A premium lead capture flow built from ${keywords.join(", ") || "customer feedback"}.`,
      cta,
    },
  ];
}

export default function Preview({ data }: Props) {
  const plan = getPlan(data);
  const theme = getTheme(plan.mood);
  const [fullScreen, setFullScreen] = useState(false);

  const seed = JSON.stringify(plan.sections).slice(0, 240);
  const accentIndex = hashString(seed) % 3;
  const accentStyle = accentIndex === 0 ? "glow-cyan" : accentIndex === 1 ? "glow-rose" : "glow-teal";

  useEffect(() => {
    if (!fullScreen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setFullScreen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [fullScreen]);

  const preview = (
    <div className={`relative overflow-hidden rounded-3xl ${theme.shell}`}>
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute -top-24 -left-16 h-72 w-72 rounded-full blur-3xl ${theme.heroGlow}`} />
        <div className={`absolute -bottom-28 right-0 h-80 w-80 rounded-full ${accentStyle === "glow-cyan" ? "bg-cyan-500/10" : accentStyle === "glow-rose" ? "bg-rose-500/10" : "bg-teal-500/10"} blur-3xl`} />
      </div>

      <div className="relative z-10 border-b border-white/10 px-6 py-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-sm font-semibold tracking-[0.18em] uppercase">AI Landing Preview</div>
          <div className="text-[11px] text-white/50 mt-1">{plan.industry} / {plan.mood} / {plan.layoutStyle}</div>
        </div>
        <nav className={`flex items-center gap-3 text-sm ${theme.nav}`}>
          <a href="#benefits">Benefits</a>
          <a href="#proof">Proof</a>
          <a href="#action">Action</a>
        </nav>
      </div>

      <div className="relative z-10">
        {plan.sections.map((section) => renderSection(section, theme))}
      </div>
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

      {preview}

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
            <div className="min-h-[calc(100vh-7rem)]">{preview}</div>
          </div>
        </div>
      )}
    </div>
  );
}

function renderSection(section: PageBlock, theme: Theme) {
  switch (section.type) {
    case "hero":
      return renderHero(section, theme);
    case "signalPanel":
      return renderSignalPanel(section, theme);
    case "benefitGrid":
      return renderBenefitGrid(section, theme);
    case "testimonialRail":
      return renderTestimonialRail(section, theme);
    case "faq":
      return renderFaq(section, theme);
    case "cta":
      return renderCta(section, theme);
    case "contact":
      return renderContact(section, theme);
    case "gallery":
      return renderGallery(section, theme);
    case "trustBand":
      return renderTrustBand(section, theme);
    case "servicePath":
      return renderServicePath(section, theme);
    default:
      return null;
  }
}

function renderHero(section: Extract<PageBlock, { type: "hero" }>, theme: Theme) {
  return (
    <section className={`relative z-10 p-8 md:p-12 ${theme.hero}`}>
      <div className={`grid gap-8 ${section.layout === "split" ? "md:grid-cols-[1.1fr_0.9fr]" : ""} items-center`}>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] mb-3 text-white/70">{section.kicker}</p>
          <h1 className={`text-3xl md:text-5xl leading-tight font-black mb-4 ${theme.title}`}>{section.title}</h1>
          <p className={`max-w-2xl text-base md:text-lg mb-6 ${theme.subtitle}`}>{section.subtitle}</p>
          <div className="flex flex-wrap items-center gap-3">
            <button className={`px-6 py-3 rounded-full text-sm md:text-base font-bold transition ${theme.ctaPrimary}`}>
              {section.cta}
            </button>
            <button className={`px-5 py-3 rounded-full text-sm md:text-base font-semibold transition ${theme.ctaSecondary}`}>
              {section.secondaryCta}
            </button>
          </div>
        </div>
        {section.layout !== "center" && (
          <div className={`rounded-3xl p-5 ${theme.card}`}>
            <p className="text-xs uppercase tracking-[0.16em] text-white/60 mb-3">Visual Direction</p>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 min-h-[220px] flex items-end justify-start">
              <p className="max-w-sm text-sm text-white/80">{section.mediaHint}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function renderSignalPanel(section: Extract<PageBlock, { type: "signalPanel" }>, theme: Theme) {
  return (
    <section className="relative z-10 p-6 md:p-8">
      <h2 className={`text-2xl font-bold mb-4 ${theme.sectionTitle}`}>{section.title}</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {section.items.map((item) => (
          <div key={`${item.label}-${item.value}`} className={`p-5 rounded-2xl ${theme.card}`}>
            <p className="text-xs uppercase tracking-[0.16em] text-white/60 mb-2">{item.label}</p>
            <p className="text-3xl font-black">{item.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function renderBenefitGrid(section: Extract<PageBlock, { type: "benefitGrid" }>, theme: Theme) {
  return (
    <section id="benefits" className="relative z-10 px-6 md:px-8 pb-6">
      <h2 className={`text-2xl font-bold mb-4 ${theme.sectionTitle}`}>{section.title}</h2>
      <div className={`grid gap-4 ${section.columns === 2 ? "md:grid-cols-2" : "md:grid-cols-3"}`}>
        {section.items.map((item) => (
          <article key={item.title} className={`p-5 rounded-2xl ${theme.card}`}>
            <p className="font-semibold text-lg mb-2">{item.title}</p>
            <p className="text-sm text-white/75">{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function renderTestimonialRail(section: Extract<PageBlock, { type: "testimonialRail" }>, theme: Theme) {
  return (
    <section id="proof" className="relative z-10 px-6 md:px-8 pb-6">
      <h2 className={`text-2xl font-bold mb-4 ${theme.sectionTitle}`}>{section.title}</h2>
      <div className={section.layout === "grid" ? "grid md:grid-cols-2 gap-4" : "grid md:grid-cols-3 gap-4"}>
        {section.items.map((item) => (
          <div key={`${item.author}-${item.quote}`} className={`p-5 rounded-2xl ${theme.card}`}>
            <p className="mb-3 leading-relaxed">&quot;{item.quote}&quot;</p>
            <p className="text-sm text-white/70">- {item.author}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function renderFaq(section: Extract<PageBlock, { type: "faq" }>, theme: Theme) {
  return (
    <section className="relative z-10 px-6 md:px-8 pb-6">
      <h2 className={`text-2xl font-bold mb-4 ${theme.sectionTitle}`}>{section.title}</h2>
      <div className="grid gap-3">
        {section.items.map((item) => (
          <details key={item.q} className={`p-4 rounded-2xl ${theme.card}`}>
            <summary className="cursor-pointer font-semibold">{item.q}</summary>
            <p className="mt-3 text-sm text-white/75">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function renderCta(section: Extract<PageBlock, { type: "cta" }>, theme: Theme) {
  return (
    <section id="action" className="relative z-10 px-6 md:px-8 pb-8 md:pb-10">
      <div className={`p-6 md:p-8 rounded-3xl ${theme.card}`}>
        <h3 className={`text-2xl font-bold mb-2 ${theme.sectionTitle}`}>{section.title}</h3>
        <p className="text-sm text-white/75 mb-4">{section.description}</p>
        <button className={`px-6 py-3 rounded-full font-semibold transition ${theme.ctaPrimary}`}>
          {section.cta}
        </button>
      </div>
    </section>
  );
}

function renderContact(section: Extract<PageBlock, { type: "contact" }>, theme: Theme) {
  return (
    <section id="action" className="relative z-10 px-6 md:px-8 pb-8 md:pb-10">
      <div className={`p-6 md:p-8 rounded-3xl ${theme.card}`}>
        <h3 className={`text-2xl font-bold mb-2 ${theme.sectionTitle}`}>{section.title}</h3>
        <p className="text-sm text-white/75 mb-4">{section.description}</p>
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
          <button type="submit" className={`px-5 py-3 rounded-xl font-semibold transition ${theme.ctaPrimary}`}>
            {section.cta}
          </button>
        </form>
      </div>
    </section>
  );
}

function renderGallery(section: Extract<PageBlock, { type: "gallery" }>, theme: Theme) {
  return (
    <section className="relative z-10 px-6 md:px-8 pb-6">
      <h2 className={`text-2xl font-bold mb-4 ${theme.sectionTitle}`}>{section.title}</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {section.items.map((item, index) => (
          <article key={`${item.label}-${index}`} className={`p-4 rounded-2xl ${theme.card}`}>
            <div className="h-40 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 mb-4 flex items-end p-4">
              <span className="text-xs uppercase tracking-[0.16em] text-white/70">Visual Placeholder</span>
            </div>
            <p className="font-semibold mb-1">{item.label}</p>
            <p className="text-sm text-white/75">{item.note}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function renderTrustBand(section: Extract<PageBlock, { type: "trustBand" }>, theme: Theme) {
  return (
    <section className="relative z-10 px-6 md:px-8 pb-6">
      <h2 className={`text-2xl font-bold mb-4 ${theme.sectionTitle}`}>{section.title}</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {section.items.map((item) => (
          <div key={item.label} className={`p-5 rounded-2xl ${theme.card}`}>
            <p className="text-xs uppercase tracking-[0.16em] text-white/60 mb-2">{item.label}</p>
            <p className="text-lg font-semibold">{item.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function renderServicePath(section: Extract<PageBlock, { type: "servicePath" }>, theme: Theme) {
  return (
    <section className="relative z-10 px-6 md:px-8 pb-6">
      <h2 className={`text-2xl font-bold mb-4 ${theme.sectionTitle}`}>{section.title}</h2>
      <div className="grid gap-3">
        {section.items.map((item, index) => (
          <div key={`${item.title}-${index}`} className={`p-5 rounded-2xl ${theme.card}`}>
            <p className="font-semibold mb-2">{item.title}</p>
            <p className="text-sm text-white/75">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
