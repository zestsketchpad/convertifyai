export type PageIndustry =
  | "healthcare"
  | "fashion"
  | "real_estate"
  | "restaurant"
  | "saas"
  | "ecommerce"
  | "education"
  | "general";

export type PageMood = "premium" | "warm" | "bold" | "editorial" | "calm";

export type PagePlan = {
  industry: PageIndustry;
  mood: PageMood;
  layoutStyle: "story" | "trust" | "offer";
  sections: PageSection[];
};

export type PageBlock = PageSection;

export type PageSection =
  | {
      type: "hero";
      title: string;
      subtitle: string;
      kicker: string;
      cta: string;
      secondaryCta: string;
      mediaHint: string;
      layout: "split" | "center" | "overlay";
    }
  | {
      type: "signalPanel";
      title: string;
      items: Array<{ label: string; value: string }>;
    }
  | {
      type: "benefitGrid";
      title: string;
      items: Array<{ title: string; description: string }>;
      columns: 2 | 3;
    }
  | {
      type: "testimonialRail";
      title: string;
      items: Array<{ quote: string; author: string }>;
      layout: "grid" | "rail";
    }
  | {
      type: "faq";
      title: string;
      items: Array<{ q: string; a: string }>;
    }
  | {
      type: "cta";
      title: string;
      description: string;
      cta: string;
    }
  | {
      type: "contact";
      title: string;
      description: string;
      cta: string;
    }
  | {
      type: "gallery";
      title: string;
      items: Array<{ label: string; note: string }>;
    }
  | {
      type: "trustBand";
      title: string;
      items: Array<{ label: string; value: string }>;
    }
  | {
      type: "servicePath";
      title: string;
      items: Array<{ title: string; description: string }>;
    };

type BuildPlanInput = {
  headline: string;
  subheadline: string;
  cta: string;
  recommendation: string;
  benefits: string[];
  keywords: string[];
  painPoints: string[];
  testimonials: Array<{ name: string; review: string }>;
  scores: { conversion: number; clarity: number; emotion: number };
  design?: {
    layoutStyle?: "story" | "trust" | "offer";
    vibe?: "bold" | "premium" | "friendly";
    urgency?: "low" | "medium" | "high";
  };
};

type DesignVibe = "bold" | "premium" | "friendly" | undefined;

export function buildPagePlan(input: BuildPlanInput): PagePlan {
  const industry = inferIndustry(
    input.headline,
    input.keywords,
    input.benefits,
    input.painPoints,
    input.testimonials.map((item) => item.review),
  );

  const mood = inferMood(industry, input.design?.vibe, input.scores);
  const layoutStyle = input.design?.layoutStyle || inferLayoutStyle(input);

  const hero = buildHero(input, industry, mood, layoutStyle);

  const sections = pickSections({
    industry,
    mood,
    layoutStyle,
    hero,
    benefits: input.benefits,
    keywords: input.keywords,
    painPoints: input.painPoints,
    testimonials: input.testimonials,
    scores: input.scores,
    recommendation: input.recommendation,
  });

  return {
    industry,
    mood,
    layoutStyle,
    sections,
  };
}

function inferIndustry(
  headline: string,
  keywords: string[],
  benefits: string[],
  painPoints: string[],
  testimonials: string[],
): PageIndustry {
  const text = [headline, ...keywords, ...benefits, ...painPoints, ...testimonials]
    .join(" ")
    .toLowerCase();

  if (/(clinic|hospital|doctor|patient|health|medical|care|consultation|reception|billing|appointment)/.test(text)) {
    return "healthcare";
  }

  if (/(tailor|fashion|boutique|wedding|garment|fabric|suit|clothing|style)/.test(text)) {
    return "fashion";
  }

  if (/(home|property|real estate|villa|apartment|listing|interior|house|neighborhood)/.test(text)) {
    return "real_estate";
  }

  if (/(restaurant|cafe|food|dining|menu|chef|taste|delivery|kitchen)/.test(text)) {
    return "restaurant";
  }

  if (/(software|platform|saas|dashboard|workflow|automation|team|product)/.test(text)) {
    return "saas";
  }

  if (/(course|lesson|learn|student|teacher|education|academy|training)/.test(text)) {
    return "education";
  }

  if (/(shop|store|buy|product|checkout|cart|shipping|ecommerce|purchase)/.test(text)) {
    return "ecommerce";
  }

  return "general";
}

function inferMood(
  industry: PageIndustry,
  vibe: DesignVibe,
  scores: BuildPlanInput["scores"],
): PageMood {
  if (vibe === "premium") return "premium";
  if (vibe === "bold") return "bold";
  if (vibe === "friendly") return "warm";

  if (industry === "healthcare") return scores.clarity >= 85 ? "calm" : "premium";
  if (industry === "fashion") return "editorial";
  if (industry === "real_estate") return "premium";
  return scores.conversion >= 80 ? "bold" : "premium";
}

function inferLayoutStyle(input: BuildPlanInput): "story" | "trust" | "offer" {
  if (input.painPoints.length > 0) return "trust";
  if (input.scores.conversion >= 80) return "offer";
  return "story";
}

function buildHero(
  input: BuildPlanInput,
  industry: PageIndustry,
  mood: PageMood,
  layoutStyle: "story" | "trust" | "offer",
) {
  const title = rewriteHeadline(input.headline, input.benefits, input.painPoints, industry, mood);
  const subtitle = rewriteSubheadline(input.subheadline, input.recommendation, input.benefits, industry);
  const kicker = buildKicker(industry, input.painPoints.length > 0, layoutStyle);
  const cta = rewriteCta(input.cta, industry, layoutStyle);
  const secondaryCta = buildSecondaryCta(industry, layoutStyle);
  const mediaHint = buildMediaHint(industry, mood);

  return { title, subtitle, kicker, cta, secondaryCta, mediaHint };
}

function rewriteHeadline(
  headline: string,
  benefits: string[],
  painPoints: string[],
  industry: PageIndustry,
  mood: PageMood,
) {
  const cleanHeadline = headline.trim();
  if (!isGenericHeadline(cleanHeadline)) return cleanHeadline;

  const strength = benefits[0] || "better experience";
  const problem = painPoints[0] || "less friction";

  const byIndustry: Record<PageIndustry, string> = {
    healthcare: `Trusted care with ${strength.toLowerCase()} and ${problem.toLowerCase()}`,
    fashion: `Tailored style with ${strength.toLowerCase()} and a premium finish`,
    real_estate: `Find the right property with ${strength.toLowerCase()} and confidence`,
    restaurant: `Enjoy better dining with ${strength.toLowerCase()} and a smoother experience`,
    saas: `A smarter workflow with ${strength.toLowerCase()} and fewer bottlenecks`,
    ecommerce: `Shop with ${strength.toLowerCase()} and a more elegant checkout`,
    education: `Learn with ${strength.toLowerCase()} and a clearer path forward`,
    general: `A better experience with ${strength.toLowerCase()} and less friction`,
  };

  const base = byIndustry[industry];
  if (mood === "bold") return base;
  if (mood === "premium") return capitalizeSentence(base);
  return base;
}

function rewriteSubheadline(
  subheadline: string,
  recommendation: string,
  benefits: string[],
  industry: PageIndustry,
) {
  const clean = subheadline.trim();
  if (!isGenericSubheadline(clean)) return clean;

  const benefit = benefits.slice(0, 2).join(" and ") || "clear communication and dependable service";

  const copy: Record<PageIndustry, string> = {
    healthcare: `Built around calm, clear care with ${benefit}. ${recommendation}`,
    fashion: `Designed for polished presentation, fit confidence, and an elegant shopping journey. ${recommendation}`,
    real_estate: `Showcase listings with clarity, trust, and a smoother decision path. ${recommendation}`,
    restaurant: `Make the experience feel inviting, simple, and worth returning for. ${recommendation}`,
    saas: `Communicate value fast and guide users toward a confident next step. ${recommendation}`,
    ecommerce: `Highlight benefits clearly, reduce friction, and create a premium purchase flow. ${recommendation}`,
    education: `Present the path to learning with clarity, confidence, and momentum. ${recommendation}`,
    general: `Turn customer language into a more premium, persuasive, and usable experience. ${recommendation}`,
  };

  return copy[industry];
}

function buildKicker(industry: PageIndustry, hasPainPoints: boolean, layoutStyle: string) {
  if (industry === "healthcare") return hasPainPoints ? "Patient Journey Rebuilt" : "Trusted Care Experience";
  if (industry === "fashion") return "Style, Fit, and Presence";
  if (industry === "real_estate") return "Lifestyle-Driven Living";
  if (industry === "restaurant") return "Memorable Dining Moments";
  if (industry === "saas") return "Product Story With Clarity";
  if (industry === "ecommerce") return "Premium Shopping Flow";
  if (industry === "education") return "A Clear Learning Path";
  return layoutStyle === "trust" ? "Confidence First" : "Customer-Led Story";
}

function buildSecondaryCta(industry: PageIndustry, layoutStyle: string) {
  if (industry === "healthcare") return layoutStyle === "trust" ? "See Care Path" : "View Services";
  if (industry === "fashion") return "Explore Collection";
  if (industry === "real_estate") return "Browse Listings";
  if (industry === "restaurant") return "See Menu";
  if (industry === "saas") return "See Product Demo";
  if (industry === "ecommerce") return "Browse Products";
  if (industry === "education") return "View Curriculum";
  return "Learn More";
}

function buildMediaHint(industry: PageIndustry, mood: PageMood) {
  const styleMap: Record<PageIndustry, string> = {
    healthcare: "clean, calm healthcare scene with doctors, staff, and patient care",
    fashion: "editorial lifestyle photography with refined product presentation",
    real_estate: "premium home or interior showcase with warm natural light",
    restaurant: "premium food and hospitality scene with inviting atmosphere",
    saas: "clean product UI with dashboards and workflow imagery",
    ecommerce: "premium product showcase with elegant cards and catalog feel",
    education: "focused learning environment with students and progress cues",
    general: "premium modern marketing visual that feels polished and trustworthy",
  };

  return `${styleMap[industry]} (${mood})`;
}

function rewriteCta(cta: string, industry: PageIndustry, layoutStyle: string) {
  const clean = cta.trim();
  if (!isGenericCta(clean)) return clean;

  const byIndustry: Record<PageIndustry, string> = {
    healthcare: layoutStyle === "trust" ? "Book Your Consultation" : "Book An Appointment",
    fashion: "Explore The Collection",
    real_estate: "View Available Homes",
    restaurant: "Reserve A Table",
    saas: "See The Product Demo",
    ecommerce: "Shop The Collection",
    education: "Start Learning Today",
    general: "Get Started Now",
  };

  return byIndustry[industry];
}

function pickSections(input: {
  industry: PageIndustry;
  mood: PageMood;
  layoutStyle: "story" | "trust" | "offer";
  hero: ReturnType<typeof buildHero>;
  benefits: string[];
  keywords: string[];
  painPoints: string[];
  testimonials: Array<{ name: string; review: string }>;
  scores: { conversion: number; clarity: number; emotion: number };
  recommendation: string;
}): PageSection[] {
  const sections: PageSection[] = [];

  sections.push({
    type: "hero",
    title: input.hero.title,
    subtitle: input.hero.subtitle,
    kicker: input.hero.kicker,
    cta: input.hero.cta,
    secondaryCta: input.hero.secondaryCta,
    mediaHint: input.hero.mediaHint,
    layout: input.layoutStyle === "trust" ? "split" : input.layoutStyle === "story" ? "split" : "center",
  });

  if (input.industry === "healthcare") {
    sections.push({
      type: "trustBand",
      title: "Care Standards",
      items: [
        { label: "Communication", value: input.benefits[0] || "Clear guidance" },
        { label: "Experience", value: input.benefits[1] || "Less friction" },
        { label: "Confidence", value: input.benefits[2] || "Trust built in" },
      ],
    });
  } else {
    sections.push({
      type: "signalPanel",
      title: input.painPoints.length > 0 ? "Top Signals" : "Performance Signals",
      items: [
        { label: "Conversion", value: `${input.scores.conversion}%` },
        { label: "Clarity", value: `${input.scores.clarity}%` },
        { label: "Emotion", value: `${input.scores.emotion}%` },
      ],
    });
  }

  sections.push({
    type: "benefitGrid",
    title: input.industry === "fashion" ? "What Makes It Stand Out" : "Why Customers Choose This",
    items: buildBenefitItems(input.benefits, input.industry, input.painPoints),
    columns: input.industry === "real_estate" || input.industry === "fashion" ? 2 : 3,
  });

  if (input.industry === "real_estate" || input.industry === "fashion") {
    sections.push({
      type: "gallery",
      title: input.industry === "real_estate" ? "Featured Spaces" : "Collection Highlights",
      items: buildGalleryItems(input.industry, input.benefits, input.keywords),
    });
  }

  if (input.testimonials.length > 0) {
    sections.push({
      type: "testimonialRail",
      title: input.industry === "healthcare" ? "Patient Stories" : "What Customers Say",
      items: input.testimonials.slice(0, 6).map((item) => ({
        quote: item.review,
        author: item.name,
      })),
      layout: input.industry === "saas" || input.industry === "healthcare" ? "grid" : "rail",
    });
  }

  if (input.painPoints.length > 0) {
    sections.push({
      type: "servicePath",
      title: input.industry === "healthcare" ? "How We Address Concerns" : "How We Fix Friction",
      items: input.painPoints.slice(0, 4).map((item, index) => ({
        title: `${index + 1}. ${item}`,
        description: input.recommendation,
      })),
    });
  }

  if (input.industry === "saas" || input.industry === "ecommerce") {
    sections.push({
      type: "faq",
      title: "Common Questions",
      items: buildFaqItems(input.industry, input.recommendation, input.benefits),
    });
  }

  sections.push({
    type: "contact",
    title: input.industry === "healthcare" ? "Book A Consultation" : "Get Started Today",
    description:
      input.industry === "healthcare"
        ? "A calm, direct booking experience that feels polished and reassuring."
        : "A simple lead capture block that keeps momentum and feels premium.",
    cta: input.hero.cta,
  });

  return sections;
}

function buildBenefitItems(benefits: string[], industry: PageIndustry, painPoints: string[]) {
  const source = benefits.length > 0 ? benefits : painPoints.map((item) => `Fix ${item}`);
  const items = source.slice(0, 6).map((item, index) => ({
    title: item,
    description: buildBenefitDescription(industry, item, index),
  }));

  return items;
}

function buildBenefitDescription(industry: PageIndustry, item: string, index: number) {
  const toneMap: Record<PageIndustry, string> = {
    healthcare: "Designed to reduce friction and feel reassuring at every step.",
    fashion: "Built to feel polished, premium, and easy to browse.",
    real_estate: "Helps buyers move with clarity and confidence.",
    restaurant: "Makes the experience feel inviting and worth returning to.",
    saas: "Turns product value into a clear, persuasive workflow.",
    ecommerce: "Makes products feel premium and checkout feel simple.",
    education: "Guides the user toward a clear next step.",
    general: "Keeps the experience clean, sharp, and conversion-friendly.",
  };

  return `${toneMap[industry]} Feature ${index + 1} spotlights ${item.toLowerCase()}.`;
}

function buildGalleryItems(industry: PageIndustry, benefits: string[], keywords: string[]) {
  const source = [...benefits, ...keywords].filter(Boolean);
  const fallback = industry === "real_estate"
    ? ["Premium exterior", "Living space", "Lifestyle moment"]
    : ["Curated view", "Signature detail", "Premium finish"];

  return (source.length > 0 ? source.slice(0, 3) : fallback).map((item, index) => ({
    label: item,
    note:
      industry === "fashion"
        ? index === 0
          ? "Tailored, editorial, and premium"
          : "Elegant visual presentation"
        : index === 0
          ? "Beautiful, believable, and conversion-ready"
          : "Supports the brand story visually",
  }));
}

function buildFaqItems(
  industry: PageIndustry,
  recommendation: string,
  benefits: string[],
): Array<{ q: string; a: string }> {
  const defaultQuestions =
    industry === "ecommerce"
      ? [
          { q: "How fast is the checkout?", a: recommendation },
          { q: "Can customers trust the brand?", a: benefits[0] || recommendation },
        ]
      : [
          { q: "How does this improve conversion?", a: recommendation },
          { q: "What makes it different?", a: benefits[0] || recommendation },
        ];

  return defaultQuestions;
}

function isGenericHeadline(value: string) {
  const t = value.trim().toLowerCase();
  if (!t) return true;
  return ["experience exceptional", "best", "amazing", "welcome to", "your best", "modern home"].some(
    (needle) => t.includes(needle),
  );
}

function isGenericSubheadline(value: string) {
  const t = value.trim().toLowerCase();
  if (!t) return true;
  return ["discover", "get personalized", "expert care", "premium", "best experience"].some((needle) =>
    t.includes(needle),
  );
}

function isGenericCta(value: string) {
  const t = value.trim().toLowerCase();
  if (!t) return true;
  return ["book", "learn more", "get started", "view portfolio", "contact us", "request a quote"].some(
    (needle) => t.includes(needle),
  );
}

function capitalizeSentence(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}