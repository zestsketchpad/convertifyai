"use client";

import { useEffect, useState, type ReactNode } from "react";
import { inferIndustry, getDesign } from "@/lib/page-plan";
import { buildImageIntentKeywords, getImagePlaceholder, getOpenImageSources } from "@/lib/icons";

type Props = {
  data: any;
  tone?: string;
  shareMode?: boolean;
};

const CheckIcon = () => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

const StarIcon = () => (
  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const TrendIcon = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l4-4 3 3 5-5" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 7h5v5" />
  </svg>
);

const ShieldIcon = () => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
  </svg>
);

const SparklesIcon = () => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 2l1.2 3.3L14.5 6l-3.3 1.2L10 10.5 8.8 7.2 5.5 6l3.3-.7L10 2zm6.5 7.5l.7 1.9 1.9.7-1.9.7-.7 1.9-.7-1.9-1.9-.7 1.9-.7.7-1.9zM4.5 11l.9 2.5L8 14.4l-2.6.9-.9 2.6-.9-2.6L1 14.4l2.6-.9.9-2.5z" />
  </svg>
);

function initials(name: unknown) {
  if (typeof name !== "string" || !name.trim()) return "A";
  return name.trim().charAt(0).toUpperCase();
}

function labelName(name: unknown) {
  if (typeof name !== "string" || !name.trim()) return "Anonymous";
  return name.trim();
}

function accentTextClass(accent: string) {
  if (accent === "pink") return "text-pink-300";
  if (accent === "indigo") return "text-indigo-300";
  if (accent === "orange") return "text-orange-300";
  return "text-cyan-300";
}

function avatarGradient(accent: string) {
  if (accent === "pink") return "from-pink-500 to-rose-500";
  if (accent === "indigo") return "from-indigo-500 to-purple-500";
  if (accent === "orange") return "from-orange-500 to-rose-500";
  return "from-cyan-500 to-blue-500";
}

function Badge({ text, tint }: { text: string; tint: string }) {
  return (
    <p className={`mb-4 inline-flex rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] ${tint}`}>
      {text}
    </p>
  );
}

function SmartImage({
  sources,
  alt,
  className,
  fit = "cover",
}: {
  sources: string[];
  alt: string;
  className?: string;
  fit?: "cover" | "contain";
}) {
  const [sourceIndex, setSourceIndex] = useState(0);

  useEffect(() => {
    setSourceIndex(0);
  }, [sources]);

  const src = sources[sourceIndex] || sources[sources.length - 1] || "";

  const onImageError = () => {
    setSourceIndex((prev) => {
      if (prev < sources.length - 1) return prev + 1;
      return prev;
    });
  };

  return (
    <img
      src={src}
      alt={alt}
      className={`${className || ""} ${fit === "contain" ? "object-contain" : "object-cover"}`.trim()}
      loading="lazy"
      onError={onImageError}
      referrerPolicy="no-referrer"
    />
  );
}

function SectionTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <header className="mb-10 text-center">
      <h2 className="text-3xl font-black md:text-4xl">{title}</h2>
      <p className="mx-auto mt-3 max-w-2xl text-slate-300">{subtitle}</p>
    </header>
  );
}

function PlaceholderImage({
  hint,
  bg,
  label,
  sources,
  alt,
  fit = "cover",
  minHeightClass = "h-72",
}: {
  hint: string;
  bg: string;
  label: string;
  sources: string[];
  alt: string;
  fit?: "cover" | "contain";
  minHeightClass?: string;
}) {
  return (
    <div className={`relative ${minHeightClass} overflow-hidden rounded-2xl border border-white/15 bg-linear-to-br ${bg}`}>
      <SmartImage sources={sources} alt={alt} fit={fit} className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 bg-linear-to-b from-black/10 via-black/25 to-black/65" />
      <div className="relative z-10 flex h-full flex-col items-center justify-end p-4 text-center">
        <p className="mb-2 text-xs uppercase tracking-[0.24em] text-slate-300">{label}</p>
        <p className="text-lg font-semibold text-white">{hint}</p>
      </div>
    </div>
  );
}

function TestimonialCard({ t, accent }: { t: any; accent: string }) {
  const review = typeof t?.review === "string" ? t.review : "Amazing experience and high quality service.";
  const starsClass = accentTextClass(accent);
  const avatarClass = avatarGradient(accent);

  return (
    <article className="rounded-2xl border border-white/15 bg-slate-900/55 p-6 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div className={`mb-4 flex gap-1 ${starsClass}`}>
        {[...Array(5)].map((_, i) => (
          <StarIcon key={i} />
        ))}
      </div>
      <p className="mb-5 line-clamp-4 text-sm leading-relaxed text-slate-200">"{review}"</p>
      <div className="flex items-center gap-3 border-t border-white/10 pt-4">
        <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-r ${avatarClass} text-white`}>
          {initials(t?.name)}
        </div>
        <div>
          <p className="text-sm font-semibold text-white">{labelName(t?.name)}</p>
          <p className="text-xs text-slate-400">Verified Customer</p>
        </div>
      </div>
    </article>
  );
}

function hashString(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export default function Preview({ data, tone = "Professional", shareMode = false }: Props) {
  const [fullscreen, setFullscreen] = useState(false);

  const industry = inferIndustry(data);
  const colors = getDesign(industry).colors;

  const landing = data?.landing || {};
  const testimonials = Array.isArray(data?.testimonials) ? data.testimonials : [];
  const benefits = Array.isArray(landing.benefits) ? landing.benefits : [];
  const keywords = Array.isArray(data?.keywords) ? data.keywords : [];
  const painPoints = Array.isArray(data?.painPoints) ? data.painPoints : [];

  const headline = landing.headline || "Transform Your Experience";
  const subheadline = landing.subheadline || "Get better results with our service";
  const cta = landing.cta || "Get Started";

  const heroImage = getImagePlaceholder(industry, "hero");
  const galleryImage = getImagePlaceholder(industry, "gallery");
  const teamImage = getImagePlaceholder(industry, "team");

  const contextSeed = `${tone}-${headline}-${keywords.join("-")}-${benefits.slice(0, 3).join("-")}`;
  const toneNormalized = tone.toLowerCase();
  const toneOffset = toneNormalized === "casual" ? 1 : toneNormalized === "luxury" ? 2 : 0;
  const layoutVariant = (hashString(`${industry}-${toneNormalized}-${headline}-${keywords.join("-")}`) + toneOffset) % 3;
  const benefitColumns = layoutVariant === 1 ? "md:grid-cols-2" : "md:grid-cols-3";

  const heroIntent = buildImageIntentKeywords({
    industry,
    section: "hero",
    tone,
    headline,
    keywords,
    benefits,
    painPoints,
  });
  const galleryIntent = buildImageIntentKeywords({
    industry,
    section: "gallery",
    tone,
    headline,
    keywords,
    benefits,
    painPoints,
  });
  const teamIntent = buildImageIntentKeywords({
    industry,
    section: "team",
    tone,
    headline,
    keywords,
    benefits,
    painPoints,
  });
  const creativeIntent = buildImageIntentKeywords({
    industry,
    section: "creative",
    tone,
    headline,
    keywords,
    benefits,
    painPoints,
  });

  const heroVisual = getOpenImageSources(industry, "hero", contextSeed, heroIntent);
  const galleryVisual = getOpenImageSources(industry, "gallery", contextSeed, galleryIntent);
  const teamVisual = getOpenImageSources(industry, "team", contextSeed, teamIntent);
  const creativeVisual = getOpenImageSources(industry, "creative", contextSeed, creativeIntent);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape" && fullscreen) setFullscreen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [fullscreen]);

  const metricCards = {
    healthcare: [
      { label: "Patients Served", value: "50K+", icon: ShieldIcon },
      { label: "Care Score", value: "98%", icon: CheckIcon },
      { label: "Specialists", value: "120+", icon: TrendIcon },
    ],
    fashion: [
      { label: "New Drops", value: "48", icon: SparklesIcon },
      { label: "Repeat Buyers", value: "67%", icon: CheckIcon },
      { label: "Avg Order", value: "$148", icon: TrendIcon },
    ],
    saas: [
      { label: "Monthly Active", value: "120K", icon: TrendIcon },
      { label: "Uptime", value: "99.99%", icon: ShieldIcon },
      { label: "Saved Hours", value: "18K", icon: CheckIcon },
    ],
    ecommerce: [
      { label: "Orders", value: "12K+", icon: TrendIcon },
      { label: "Satisfaction", value: "4.9/5", icon: SparklesIcon },
      { label: "Fast Delivery", value: "24h", icon: CheckIcon },
    ],
  } as const;

  const accent = colors.accent;
  const selectedMetrics = metricCards[(industry as keyof typeof metricCards)] || metricCards.ecommerce;

  const toneBadgeText =
    toneNormalized === "luxury"
      ? "Premium Conversion Mode"
      : toneNormalized === "casual"
        ? "Human-Friendly Story Mode"
        : "Performance Landing Mode";

  const renderSectionFlow = (parts: {
    hero: ReactNode;
    metrics: ReactNode;
    benefits: ReactNode;
    gallery: ReactNode;
    testimonials: ReactNode;
    keywords: ReactNode;
    cta: ReactNode;
  }) => {
    if (layoutVariant === 1) {
      return (
        <>
          {parts.hero}
          {parts.benefits}
          {parts.testimonials}
          {parts.metrics}
          {parts.gallery}
          {parts.keywords}
          {parts.cta}
        </>
      );
    }

    if (layoutVariant === 2) {
      return (
        <>
          {parts.hero}
          {parts.gallery}
          {parts.metrics}
          {parts.benefits}
          {parts.keywords}
          {parts.testimonials}
          {parts.cta}
        </>
      );
    }

    return (
      <>
        {parts.hero}
        {parts.metrics}
        {parts.benefits}
        {parts.gallery}
        {parts.testimonials}
        {parts.keywords}
        {parts.cta}
      </>
    );
  };

  const renderHero = (badge: string, badgeTone: string) => (
    <section className="relative overflow-hidden px-6 py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(255,255,255,0.1),transparent_34%),radial-gradient(circle_at_100%_95%,rgba(255,255,255,0.08),transparent_42%)]" />
      <div className="relative mx-auto max-w-6xl">
        {layoutVariant === 0 && (
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <Badge text={badge} tint={badgeTone} />
              <p className="mb-3 text-xs uppercase tracking-[0.18em] text-white/70">{toneBadgeText}</p>
              <h1 className={`mb-6 bg-linear-to-r ${colors.primary} bg-clip-text text-5xl font-black leading-[1.05] text-transparent md:text-6xl`}>
                {headline}
              </h1>
              <p className="mb-8 text-lg text-slate-200">{subheadline}</p>
              <div className="flex flex-wrap gap-4">
                <button className={`rounded-xl bg-linear-to-r ${colors.primary} px-8 py-4 font-semibold text-white shadow-xl transition duration-300 hover:scale-[1.03]`}>
                  {cta}
                </button>
                <button className="rounded-xl border border-white/20 bg-white/5 px-8 py-4 font-semibold text-slate-100 transition hover:bg-white/10">
                  View Details
                </button>
              </div>
            </div>
            <PlaceholderImage hint={heroImage.hint} bg={heroImage.bg} label="Hero Visual" sources={heroVisual.sources} alt={heroVisual.alt} minHeightClass="h-80" />
          </div>
        )}

        {layoutVariant === 1 && (
          <div className="space-y-8">
            <div className="mx-auto max-w-4xl text-center">
              <Badge text={badge} tint={badgeTone} />
              <p className="mb-3 text-xs uppercase tracking-[0.18em] text-white/70">{toneBadgeText}</p>
              <h1 className={`mb-6 bg-linear-to-r ${colors.primary} bg-clip-text text-5xl font-black leading-[1.05] text-transparent md:text-7xl`}>
                {headline}
              </h1>
              <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-200">{subheadline}</p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <button className={`rounded-xl bg-linear-to-r ${colors.primary} px-8 py-4 font-semibold text-white shadow-xl transition duration-300 hover:scale-[1.03]`}>
                  {cta}
                </button>
                <button className="rounded-xl border border-white/20 bg-white/5 px-8 py-4 font-semibold text-slate-100 transition hover:bg-white/10">
                  View Details
                </button>
              </div>
            </div>
            <PlaceholderImage hint={heroImage.hint} bg={heroImage.bg} label="Brand Visual" sources={heroVisual.sources} alt={heroVisual.alt} minHeightClass="h-96" />
          </div>
        )}

        {layoutVariant === 2 && (
          <div className="grid items-center gap-10 md:grid-cols-[0.9fr_1.1fr]">
            <div>
              <PlaceholderImage hint={heroImage.hint} bg={heroImage.bg} label="Hero Visual" sources={heroVisual.sources} alt={heroVisual.alt} minHeightClass="h-80" fit="contain" />
            </div>
            <div>
              <Badge text={badge} tint={badgeTone} />
              <p className="mb-3 text-xs uppercase tracking-[0.18em] text-white/70">{toneBadgeText}</p>
              <h1 className={`mb-6 bg-linear-to-r ${colors.primary} bg-clip-text text-5xl font-black leading-[1.05] text-transparent md:text-6xl`}>
                {headline}
              </h1>
              <p className="mb-8 text-lg text-slate-200">{subheadline}</p>
              <div className="flex flex-wrap gap-4">
                <button className={`rounded-xl bg-linear-to-r ${colors.primary} px-8 py-4 font-semibold text-white shadow-xl transition duration-300 hover:scale-[1.03]`}>
                  {cta}
                </button>
                <button className="rounded-xl border border-white/20 bg-white/5 px-8 py-4 font-semibold text-slate-100 transition hover:bg-white/10">
                  View Details
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );

  const renderMetrics = (tone: string) => (
    <section className="px-6 pb-14">
      <div className={`mx-auto max-w-6xl gap-5 ${layoutVariant === 2 ? "flex flex-col md:flex-row" : "grid md:grid-cols-3"}`}>
        {selectedMetrics.map((item) => {
          const Icon = item.icon;
          return (
            <article key={item.label} className={`rounded-2xl border ${tone} bg-slate-900/55 p-6 transition hover:-translate-y-1 ${layoutVariant === 2 ? "md:flex-1" : ""}`}>
              <div className="mb-4 inline-flex rounded-lg bg-white/10 p-2 text-white">
                <Icon />
              </div>
              <p className="text-3xl font-black">{item.value}</p>
              <p className="mt-2 text-slate-300">{item.label}</p>
            </article>
          );
        })}
      </div>
    </section>
  );

  const renderBenefits = (title: string, subtitle: string, tone: string, icon: ReactNode) => (
    benefits.length > 0 && (
      <section className="bg-slate-900/30 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <SectionTitle title={title} subtitle={subtitle} />
          <div className={`grid gap-6 ${benefitColumns}`}>
            {benefits.slice(0, 6).map((benefit: string, idx: number) => {
              const benefitIntent = buildImageIntentKeywords({
                industry,
                section: "gallery",
                tone,
                headline: benefit,
                keywords,
                benefits,
                painPoints,
              });
              const benefitVisual = getOpenImageSources(
                industry,
                "gallery",
                `${contextSeed}-benefit-${idx}-${benefit}`,
                benefitIntent,
              );

              return (
              <article key={idx} className={`rounded-2xl border ${tone} bg-slate-900/55 p-6 transition hover:-translate-y-1 hover:shadow-xl`}>
                <div className="mb-4 overflow-hidden rounded-xl border border-white/10">
                  <SmartImage
                    sources={benefitVisual.sources}
                    alt={`${industry} benefit visual`}
                    className="h-28 w-full object-cover"
                  />
                </div>
                <div className="mb-4 inline-flex rounded-lg bg-white/10 p-2 text-white">{icon}</div>
                <p className="text-slate-100">{benefit}</p>
              </article>
              );
            })}
          </div>
        </div>
      </section>
    )
  );

  const renderTestimonials = (title: string, subtitle: string, cols: string) => (
    testimonials.length > 0 && (
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <SectionTitle title={title} subtitle={subtitle} />
          <div className={`grid gap-6 ${cols}`}>
            {testimonials.slice(0, 4).map((t: any, idx: number) => (
              <TestimonialCard key={idx} t={t} accent={accent} />
            ))}
          </div>
        </div>
      </section>
    )
  );

  const renderKeywords = (tone: string) => (
    keywords.length > 0 && (
      <section className="px-6 pb-14">
        <div className="mx-auto max-w-6xl">
          <h3 className="mb-5 text-center text-xl font-semibold text-slate-200">Top Keyword Cluster</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {keywords.slice(0, 8).map((keyword: string, idx: number) => (
              <div key={idx} className={`cursor-default rounded-full border ${tone} px-4 py-2 text-sm font-medium`}>
                {keyword}
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  );

  const renderGallery = () => (
    <section className="px-6 py-16">
      <div className={`mx-auto grid max-w-6xl gap-6 ${layoutVariant === 1 ? "md:grid-cols-2" : "md:grid-cols-3"}`}>
        <PlaceholderImage hint={galleryImage.hint} bg={galleryImage.bg} label="Gallery" sources={galleryVisual.sources} alt={galleryVisual.alt} minHeightClass={layoutVariant === 0 ? "h-80" : "h-72"} />
        <PlaceholderImage hint={teamImage.hint} bg={teamImage.bg} label="Team" sources={teamVisual.sources} alt={teamVisual.alt} minHeightClass={layoutVariant === 2 ? "h-80" : "h-72"} fit={layoutVariant === 2 ? "contain" : "cover"} />
        {layoutVariant !== 1 && (
          <PlaceholderImage hint="Campaign-ready composition" bg="from-slate-500/30 to-slate-700/30" label="Creative" sources={creativeVisual.sources} alt={creativeVisual.alt} minHeightClass="h-72" fit="contain" />
        )}
      </div>
    </section>
  );

  const renderCta = (title: string, subtitle: string, btnColor: string, btnText: string) => (
    <section className={`bg-linear-to-r ${colors.secondary} px-6 py-24`}>
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="mb-5 text-4xl font-black md:text-5xl">{title}</h2>
        <p className="mx-auto mb-10 max-w-2xl text-lg text-slate-100">{subtitle}</p>
        <button className={`rounded-xl bg-white px-10 py-4 text-lg font-bold ${btnColor} transition hover:scale-[1.03] hover:shadow-2xl`}>
          {btnText}
        </button>
      </div>
    </section>
  );

  const PreviewContent = (
    <div className={`min-h-screen w-full bg-linear-to-b ${colors.bg} text-white`}>
      {industry === "healthcare" && (
        renderSectionFlow({
          hero: renderHero("Precision Care Studio", "border-cyan-400/30 bg-cyan-500/15 text-cyan-200"),
          metrics: renderMetrics("border-cyan-300/25"),
          benefits: renderBenefits(
            "Why Patients Convert Fast",
            "Stronger trust architecture, cleaner messaging hierarchy, and premium clarity.",
            "border-cyan-300/25",
            <CheckIcon />,
          ),
          gallery: renderGallery(),
          testimonials: renderTestimonials(
            "Trusted By Real Patients",
            "Conversion-focused trust wall with richer testimonial cards.",
            "md:grid-cols-2",
          ),
          keywords: renderKeywords("border-cyan-300/35 bg-cyan-500/10 text-cyan-200"),
          cta: renderCta("Ready for Expert Care?", "This output now feels like a polished premium landing page.", "text-cyan-700", cta),
        })
      )}

      {industry === "fashion" && (
        renderSectionFlow({
          hero: renderHero("Editorial Commerce", "border-pink-300/30 bg-pink-500/15 text-pink-200"),
          metrics: renderMetrics("border-pink-300/25"),
          benefits: renderBenefits(
            "Why Fashion Buyers Convert",
            "Campaign-like structure, sharper visual rhythm, premium feel.",
            "border-pink-300/25",
            <SparklesIcon />,
          ),
          gallery: renderGallery(),
          testimonials: renderTestimonials(
            "Style-Led Social Proof",
            "Testimonials now read like campaign proof, not plain cards.",
            "md:grid-cols-3",
          ),
          keywords: renderKeywords("border-pink-300/35 bg-pink-500/10 text-pink-200"),
          cta: renderCta("New Collection Live", "Landing structure now feels bold, intentional, and sales-ready.", "text-rose-600", "Shop The Drop"),
        })
      )}

      {industry === "saas" && (
        renderSectionFlow({
          hero: renderHero("Pipeline Automation", "border-indigo-300/30 bg-indigo-500/15 text-indigo-200"),
          metrics: renderMetrics("border-indigo-300/25"),
          benefits: renderBenefits(
            "Feature System",
            "From headline to CTA, this is now product-grade SaaS storytelling.",
            "border-indigo-300/25",
            <ShieldIcon />,
          ),
          gallery: renderGallery(),
          testimonials: renderTestimonials(
            "Teams Already Scaling",
            "Enterprise-ready social proof flow with tighter hierarchy.",
            "md:grid-cols-2",
          ),
          keywords: renderKeywords("border-indigo-300/35 bg-indigo-500/10 text-indigo-200"),
          cta: renderCta("From Feedback To Pipeline Growth", "Generator output now feels stronger, cleaner, and conversion-first.", "text-indigo-700", "Launch Workspace"),
        })
      )}

      {(industry === "ecommerce" || !["healthcare", "fashion", "saas"].includes(industry)) && (
        renderSectionFlow({
          hero: renderHero("High-Intent Commerce", "border-orange-300/30 bg-orange-500/15 text-orange-200"),
          metrics: renderMetrics("border-orange-300/25"),
          benefits: renderBenefits(
            "Conversion Drivers",
            "More depth, stronger scannability, and campaign-ready composition.",
            "border-orange-300/25",
            <SparklesIcon />,
          ),
          gallery: renderGallery(),
          testimonials: renderTestimonials(
            "Social Proof Stack",
            "Trust section now matches premium ecommerce landing pages.",
            "md:grid-cols-2",
          ),
          keywords: renderKeywords("border-orange-300/35 bg-orange-500/10 text-orange-200"),
          cta: renderCta(
            "Built To Convert On First Scroll",
            "Generator now outputs a much higher quality commerce page by default.",
            "text-orange-700",
            "Shop Now",
          ),
        })
      )}
    </div>
  );

  if (shareMode) {
    return <div className="w-full">{PreviewContent}</div>;
  }

  if (fullscreen) {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black">
        <button
          onClick={() => setFullscreen(false)}
          className="fixed right-4 top-4 z-60 rounded bg-linear-to-r from-purple-500 to-blue-500 px-4 py-2 font-semibold transition hover:from-purple-600 hover:to-blue-600"
        >
          Exit Fullscreen (ESC)
        </button>
        {PreviewContent}
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Landing Page Preview</h2>
          <p className="mt-1 text-xs text-slate-400">Design: {industry}</p>
        </div>
        <button
          onClick={() => setFullscreen(true)}
          className="rounded bg-purple-500 px-3 py-1 text-sm font-semibold transition hover:bg-purple-600"
        >
          Fullscreen
        </button>
      </div>

      <div className="max-h-125 w-full overflow-y-auto rounded-lg border border-white/10 bg-slate-900">
        {PreviewContent}
      </div>
    </div>
  );
}
