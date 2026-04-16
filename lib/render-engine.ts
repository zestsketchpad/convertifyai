import { GeneratedData, SectionType, Strategy } from "./types";
import { getOpenImageSources } from "./icons";

type LayoutMode = "trust-first" | "data-first" | "story-first";

type ReviewSignals = {
  trust: boolean;
  speed: boolean;
  support: boolean;
  pricing: boolean;
  booking: boolean;
  product: boolean;
  software: boolean;
  food: boolean;
  results: boolean;
};

const UNIVERSAL_SKELETON: SectionType[] = [
  "navbar",
  "hero",
  "trust_badges",
  "benefits",
  "problem_solution",
  "testimonials",
  "cta",
];

function hash(text: string): number {
  let value = 0;
  for (let i = 0; i < text.length; i += 1) {
    value = (value << 5) - value + text.charCodeAt(i);
    value |= 0;
  }
  return Math.abs(value);
}

function uniqueSections(sections: SectionType[]): SectionType[] {
  return Array.from(new Set(sections));
}

function collectReviewText(strategy: Strategy, data: GeneratedData): string {
  const text = [
    data.reviewsText || "",
    strategy.industry || "",
    strategy.targetAudience || "",
    strategy.goal || "",
    strategy.visualDirection || "",
    data.landing?.headline || data.headline || "",
    data.landing?.subheadline || data.subheadline || "",
    ...(data.benefits || []),
    ...(data.keywords || []),
    ...(data.painPoints || []),
  ]
    .join(" ")
    .toLowerCase();

  return text;
}

function inferIndustry(strategyIndustry: string, text: string): string {
  const s = (strategyIndustry || "").toLowerCase();
  if (s && s !== "other" && s !== "general") return s;

  if (/(doctor|clinic|patient|appointment|medical|health|care)/.test(text)) return "healthcare";
  if (/(investment|wealth|portfolio|returns|finance|risk|advisor|financial)/.test(text)) return "finance";
  if (/(software|saas|dashboard|workflow|automation|integration|api|platform)/.test(text)) return "saas";
  if (/(restaurant|dining|menu|dish|chef|food|reservation|table)/.test(text)) return "restaurant";
  if (/(fashion|boutique|collection|style|clothing|lookbook)/.test(text)) return "fashion";
  if (/(checkout|cart|shipping|store|shop|product|delivery)/.test(text)) return "ecommerce";

  return "ecommerce";
}

function detectSignals(text: string): ReviewSignals {
  return {
    trust: /(trust|secure|security|safe|reliable|transparent|certified|credible)/.test(text),
    speed: /(fast|quick|instant|minutes|efficient|smooth|easy)/.test(text),
    support: /(support|help|team|service|respond|care)/.test(text),
    pricing: /(price|pricing|fee|affordable|discount|value|cost)/.test(text),
    booking: /(book|booking|appointment|schedule|consult)/.test(text),
    product: /(product|catalog|cart|checkout|shipping|order|buy|shop)/.test(text),
    software: /(dashboard|automation|integration|workflow|app|platform|saas)/.test(text),
    food: /(menu|dish|taste|restaurant|chef|dining)/.test(text),
    results: /(\b\d+%\b|growth|roi|improve|results|portfolio|retention|success)/.test(text),
  };
}

function chooseLayoutMode(strategy: Strategy, text: string): LayoutMode {
  if (strategy.goal === "trust") return "trust-first";
  if (strategy.goal === "conversion") return "data-first";

  const mode = hash(`${text}-${strategy.style}-${strategy.goal}`) % 3;
  if (mode === 0) return "trust-first";
  if (mode === 1) return "data-first";
  return "story-first";
}

function industryOrgans(industry: string, signals: ReviewSignals): SectionType[] {
  if (industry === "ecommerce" || industry === "fashion") {
    const sections: SectionType[] = ["product_grid"];
    if (signals.product || signals.pricing) sections.push("categories");
    if (signals.trust || signals.support) sections.push("trust_indicators");
    if (signals.results || signals.speed) sections.push("stats");
    return sections;
  }

  if (industry === "healthcare") {
    const sections: SectionType[] = ["about", "services"];
    if (signals.booking) sections.push("appointment");
    if (signals.results) sections.push("stats");
    return sections;
  }

  if (industry === "finance") {
    const sections: SectionType[] = ["stats", "services"];
    if (signals.results || signals.trust) sections.push("case_studies");
    return sections;
  }

  if (industry === "saas") {
    const sections: SectionType[] = ["features", "how_it_works"];
    if (signals.software || signals.speed) sections.push("demo_preview");
    if (signals.results) sections.push("stats");
    return sections;
  }

  if (industry === "restaurant") {
    const sections: SectionType[] = ["menu", "popular_dishes"];
    if (signals.food) sections.push("gallery");
    return sections;
  }

  return signals.results ? ["stats", "features"] : ["features"];
}

function buildDynamicSections(
  strategy: Strategy,
  data: GeneratedData,
  industry: string,
  signals: ReviewSignals,
  mode: LayoutMode,
): SectionType[] {
  const organs = industryOrgans(industry, signals);

  const extras: SectionType[] = [];
  if ((data.painPoints || []).length > 0 || signals.support) extras.push("faq");
  if ((data.keywords || []).length >= 4) extras.push("keywords");
  const statsLead: SectionType[] = organs.includes("stats") ? ["stats"] : [];

  let ordered: SectionType[];

  if (mode === "trust-first") {
    ordered = [
      "navbar",
      "hero",
      "trust_badges",
      ...organs,
      "benefits",
      "problem_solution",
      "testimonials",
      ...extras,
      "cta",
    ];
  } else if (mode === "data-first") {
    ordered = [
      "navbar",
      "hero",
      ...statsLead,
      "benefits",
      ...organs,
      "problem_solution",
      "testimonials",
      ...extras,
      "cta",
    ];
  } else {
    ordered = [
      "navbar",
      "hero",
      "problem_solution",
      "benefits",
      ...organs,
      "testimonials",
      "trust_badges",
      ...extras,
      "cta",
    ];
  }

  const strategyPreferred = (strategy.sectionOrder || []).filter(
    (s) => !UNIVERSAL_SKELETON.includes(s),
  );

  return uniqueSections([...ordered, ...strategyPreferred]);
}

export function pickComponentVariant(
  section: SectionType,
  style: string,
  goal: string,
  industry: string,
): string {
  if (section === "navbar") return "NavbarPremium";

  if (section === "hero") {
    if (style === "luxury") return "HeroLuxury";
    if (style === "bold") return "HeroBold";
    if (style === "minimal") return "HeroMinimal";
    if (goal === "conversion") return "HeroWithStats";
    return "HeroSplit";
  }

  if (section === "trust_badges" || section === "trust_indicators") return "TrustBadges";

  if (section === "benefits") {
    if (industry === "saas") return "BenefitsSteps";
    if (style === "luxury") return "BenefitsIcons";
    if (style === "bold") return "BenefitsCards";
    return "BenefitsGrid";
  }

  if (section === "problem_solution") return "ProblemSolutionPremium";

  if (section === "testimonials") {
    if (style === "luxury") return "TestimonialCarousel";
    if (goal === "conversion") return "TestimonialCards";
    return "TestimonialQuotes";
  }

  if (section === "stats") return goal === "conversion" ? "StatsCounters" : "StatsShowcase";
  if (section === "cta") return goal === "conversion" ? "CTAFullscreen" : "CTABanner";

  if (section === "product_grid") return "EcommerceOrgans";
  if (section === "categories") return "EcommerceCategoriesSection";

  if (section === "about") return "HealthcareAboutSection";
  if (section === "services" && industry === "healthcare") return "HealthcareServicesSection";
  if (section === "appointment") return "HealthcareAppointmentSection";

  if (section === "services" && industry === "finance") return "FinanceServicesSection";
  if (section === "case_studies") return "FinanceCaseStudiesSection";

  if (section === "features") return "SaasFeaturesSection";
  if (section === "how_it_works") return "SaasHowItWorksSection";
  if (section === "demo_preview") return "SaasDemoPreviewSection";

  if (section === "menu") return "RestaurantMenuSection";
  if (section === "popular_dishes") return "RestaurantPopularDishesSection";
  if (section === "gallery" && industry === "restaurant") return "RestaurantGallerySection";

  if (section === "faq") return "FAQListDefault";
  if (section === "keywords") return "KeywordsCloudSection";

  return `${section}Default`;
}

function landingValue(data: GeneratedData, key: "headline" | "subheadline" | "cta"): string {
  if (data.landing && typeof data.landing[key] === "string" && data.landing[key]?.trim()) {
    return data.landing[key] as string;
  }
  const top = data[key];
  if (typeof top === "string" && top.trim()) return top;
  if (key === "headline") return "Built for your audience";
  if (key === "subheadline") return "A high-conversion layout generated from user feedback.";
  return "Get Started";
}

export function createRenderPlan(
  strategy: Strategy,
  data: GeneratedData,
): {
  sections: Array<{
    type: SectionType;
    variant: string;
    props: Record<string, unknown>;
  }>;
  appliedRules: string[];
} {
  const sections: Array<{
    type: SectionType;
    variant: string;
    props: Record<string, unknown>;
  }> = [];
  const appliedRules: string[] = [];

  const reviewText = collectReviewText(strategy, data);
  const industry = inferIndustry(strategy.industry, reviewText);
  const signals = detectSignals(reviewText);
  const mode = chooseLayoutMode(strategy, reviewText);
  const order = buildDynamicSections(strategy, data, industry, signals, mode);

  const benefits = data.benefits?.length ? data.benefits : data.landing?.benefits || [];

  for (const section of order) {
    const variant = pickComponentVariant(section, strategy.style, strategy.goal, industry);

    let props: Record<string, unknown> = {
      industry,
      tone: strategy.style,
      layoutMode: mode,
    };

    switch (section) {
      case "hero": {
        const heroImage = getOpenImageSources(
          industry,
          "hero",
          `${industry}-${strategy.style}-${mode}`,
          data.keywords || [],
        );
        props = {
          ...props,
          headline: landingValue(data, "headline"),
          subheadline: landingValue(data, "subheadline"),
          cta: landingValue(data, "cta"),
          imageUrl: heroImage.sources[0],
          badge: strategy.style === "luxury" ? "Premium Experience" : "Dynamic Experience",
        };
        break;
      }
      case "benefits":
        props = { ...props, benefits: benefits.slice(0, 6) };
        break;
      case "problem_solution":
        props = { ...props, painPoints: data.painPoints || [], benefits: benefits.slice(0, 6) };
        break;
      case "testimonials":
        props = { ...props, testimonials: data.testimonials || [] };
        break;
      case "stats":
        props = {
          ...props,
          stats: [
            { value: `${data.scores?.conversion ?? 80}%`, label: "Conversion Potential" },
            { value: `${data.scores?.clarity ?? 85}%`, label: "Message Clarity" },
            { value: `${data.scores?.emotion ?? 80}%`, label: "Emotional Impact" },
          ],
        };
        break;
      case "trust_badges":
      case "trust_indicators":
        props = {
          ...props,
          badges: signals.trust
            ? ["Secure & Verified", "Trusted by Customers", "Transparent Process"]
            : ["Verified Expertise", "Trusted by Customers", "Secure Experience"],
        };
        break;
      case "faq":
        props = {
          ...props,
          faqs: (data.painPoints || []).slice(0, 4).map((pain) => ({
            question: `How do you address ${pain}?`,
            answer: `We use a measured process focused on clarity, trust, and delivery quality.`,
          })),
        };
        break;
      case "keywords":
        props = {
          ...props,
          keywords: data.keywords || [],
        };
        break;
      case "cta":
        props = {
          ...props,
          headline:
            strategy.goal === "trust"
              ? "Ready to move forward with confidence?"
              : strategy.goal === "conversion"
                ? "Ready to convert more customers?"
                : "Ready to take the next step?",
          cta: landingValue(data, "cta"),
        };
        break;
      default:
        break;
    }

    sections.push({ type: section, variant, props });
    appliedRules.push(`${section}: ${variant}`);
  }

  appliedRules.push(`industry_inferred: ${industry}`);
  appliedRules.push(`layout_mode: ${mode}`);
  appliedRules.push(`signal_trust: ${signals.trust}`);
  appliedRules.push(`signal_results: ${signals.results}`);

  return { sections, appliedRules };
}

export function explainDesignChoices(
  strategy: Strategy,
  appliedRules: string[],
): {
  summary: string;
  reasoning: Array<{ rule: string; explanation: string }>;
} {
  const reasoning: Array<{ rule: string; explanation: string }> = [
    {
      rule: "Universal Skeleton",
      explanation:
        "Every generated page always includes navbar, hero, trust, value, problem-solution, social proof, and CTA.",
    },
    {
      rule: "Review-Signal Planner",
      explanation:
        "Section stack and ordering are generated from review signals (trust, speed, pricing, support, booking, results), not just style toggles.",
    },
    {
      rule: "Industry Organs",
      explanation:
        "Industry-specific sections are injected dynamically to make each site behave like a native website in that business category.",
    },
  ];

  return {
    summary: `Designed for ${strategy.targetAudience} in ${strategy.industry} with a ${strategy.style} style focused on ${strategy.goal}, using dynamic section planning from review intent. (${appliedRules.length} rules applied)`,
    reasoning,
  };
}
