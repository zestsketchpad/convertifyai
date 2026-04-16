import { Strategy, ThemeConfig, SectionType } from "./types";

/**
 * RULE ENGINE
 * Applied after AI strategist makes decisions
 * Ensures consistent, proven patterns based on industry + goal
 */

export const INDUSTRY_RULES: Record<string, {
  defaultStyle: string;
  colorScheme: string;
  mustIncludeSections: SectionType[];
  earlyPriority: SectionType[];
  avoidSections: string[];
  tone: "calm" | "energetic" | "professional" | "playful" | "luxury";
}> = {
  healthcare: {
    defaultStyle: "minimal",
    colorScheme: "light",
    mustIncludeSections: ["hero", "trust_badges", "benefits", "testimonials", "cta"],
    earlyPriority: ["trust_badges", "testimonials"],
    avoidSections: [],
    tone: "calm",
  },
  finance: {
    defaultStyle: "luxury",
    colorScheme: "dark",
    mustIncludeSections: ["hero", "trust_badges", "stats", "benefits", "testimonials", "cta"],
    earlyPriority: ["trust_badges", "stats"],
    avoidSections: ["playful"],
    tone: "professional",
  },
  saas: {
    defaultStyle: "modern",
    colorScheme: "gradient",
    mustIncludeSections: ["hero", "features", "benefits", "stats", "testimonials", "cta"],
    earlyPriority: ["features", "benefits"],
    avoidSections: [],
    tone: "energetic",
  },
  ecommerce: {
    defaultStyle: "bold",
    colorScheme: "light",
    mustIncludeSections: ["hero", "benefits", "gallery", "testimonials", "cta"],
    earlyPriority: ["gallery", "benefits"],
    avoidSections: [],
    tone: "playful",
  },
  fashion: {
    defaultStyle: "luxury",
    colorScheme: "dark",
    mustIncludeSections: ["hero", "gallery", "benefits", "testimonials", "cta"],
    earlyPriority: ["gallery"],
    avoidSections: [],
    tone: "luxury",
  },
  restaurant: {
    defaultStyle: "bold",
    colorScheme: "light",
    mustIncludeSections: ["hero", "benefits", "gallery", "testimonials", "cta"],
    earlyPriority: ["gallery"],
    avoidSections: [],
    tone: "playful",
  },
};

export const GOAL_RULES: Record<string, {
  reorderSections: (sections: SectionType[]) => SectionType[];
  emphasizeSection: SectionType;
  ctaStyle: "soft" | "medium" | "aggressive";
}> = {
  trust: {
    reorderSections: (sections) => {
      // Move trust_badges and testimonials to top
      const trust = sections.filter(s => s === "trust_badges");
      const testimonials = sections.filter(s => s === "testimonials");
      const rest = sections.filter(s => s !== "trust_badges" && s !== "testimonials");
      return [...trust, ...testimonials, ...rest];
    },
    emphasizeSection: "trust_badges",
    ctaStyle: "soft",
  },
  conversion: {
    reorderSections: (sections) => {
      // Move benefits, stats, cta to top
      const benefits = sections.filter(s => s === "benefits");
      const stats = sections.filter(s => s === "stats");
      const cta = sections.filter(s => s === "cta");
      const rest = sections.filter(s => !["benefits", "stats", "cta"].includes(s));
      return [...stats, ...benefits, ...rest, ...cta];
    },
    emphasizeSection: "benefits",
    ctaStyle: "aggressive",
  },
  awareness: {
    reorderSections: (sections) => {
      // Keep hero prominent, shuffle features
      return sections;
    },
    emphasizeSection: "hero",
    ctaStyle: "medium",
  },
  education: {
    reorderSections: (sections) => {
      // Move features/faq early
      const features = sections.filter(s => s === "features");
      const faq = sections.filter(s => s === "faq");
      const rest = sections.filter(s => !["features", "faq"].includes(s));
      return [...features, ...faq, ...rest];
    },
    emphasizeSection: "features",
    ctaStyle: "medium",
  },
};

export const STYLE_COLOR_MAP: Record<string, ThemeConfig> = {
  "minimal-light": {
    bg: "bg-white",
    text: "text-gray-900",
    primary: "text-gray-900",
    secondary: "text-gray-600",
    accent: "bg-blue-50 border border-blue-200",
    gradients: {
      hero: "from-white to-gray-50",
      btn: "from-gray-900 to-gray-700",
      accent: "from-blue-50 to-white",
    },
  },
  "luxury-dark": {
    bg: "bg-slate-950",
    text: "text-white",
    primary: "text-white",
    secondary: "text-gray-300",
    accent: "bg-yellow-400/10 border border-yellow-500/30",
    gradients: {
      hero: "from-slate-950 via-slate-900 to-slate-950",
      btn: "from-yellow-500 to-yellow-600",
      accent: "from-yellow-500/20 to-yellow-600/10",
    },
  },
  "modern-gradient": {
    bg: "bg-gradient-to-br from-blue-600 to-purple-600",
    text: "text-white",
    primary: "text-white",
    secondary: "text-blue-100",
    accent: "bg-white/10 border border-white/20",
    gradients: {
      hero: "from-blue-600 via-purple-500 to-pink-500",
      btn: "from-white to-gray-100",
      accent: "from-white/20 to-white/5",
    },
  },
  "bold-light": {
    bg: "bg-white",
    text: "text-gray-900",
    primary: "text-red-600",
    secondary: "text-gray-600",
    accent: "bg-red-50 border border-red-200",
    gradients: {
      hero: "from-white to-red-50",
      btn: "from-red-600 to-red-700",
      accent: "from-red-100 to-white",
    },
  },
  "playful-light": {
    bg: "bg-white",
    text: "text-gray-900",
    primary: "text-orange-500",
    secondary: "text-gray-600",
    accent: "bg-orange-50 border border-orange-200",
    gradients: {
      hero: "from-white to-orange-50",
      btn: "from-orange-500 to-orange-600",
      accent: "from-orange-100 to-white",
    },
  },
};

/**
 * Apply rules to refine strategy
 */
export function applyRules(strategy: Strategy): {
  strategy: Strategy;
  theme: ThemeConfig;
  appliedRules: string[];
} {
  const applied: string[] = [];
  const normalized: Strategy = {
    ...strategy,
    sections: [...(strategy.sections || [])],
    sectionOrder: [...(strategy.sectionOrder || [])],
    universalStructure:
      strategy.universalStructure && strategy.universalStructure.length > 0
        ? [...strategy.universalStructure]
        : [
            "navbar",
            "hero",
            "trust_badges",
            "benefits",
            "problem_solution",
            "testimonials",
            "cta",
          ],
    industrySections: [...(strategy.industrySections || [])],
  };
  
  // 1. Apply industry rules
  const industryRule = INDUSTRY_RULES[normalized.industry];
  if (industryRule) {
    // Ensure must-include sections
    for (const section of industryRule.mustIncludeSections) {
      if (!normalized.sections.includes(section)) {
        normalized.sections.push(section);
        applied.push(`industry: added ${section}`);
      }
    }

    normalized.sectionOrder = [
      ...industryRule.earlyPriority.filter((s) => normalized.sectionOrder.includes(s)),
      ...normalized.sectionOrder.filter((s) => !industryRule.earlyPriority.includes(s)),
    ];
    applied.push(`industry: reordered by ${strategy.industry} priority`);
  }

  // 2. Apply goal rules
  const goalRule = GOAL_RULES[normalized.goal];
  if (goalRule) {
    normalized.sectionOrder = goalRule.reorderSections(normalized.sectionOrder);
    applied.push(`goal: reordered for ${normalized.goal}`);
  }

  // 3. Map style + colorScheme to theme
  const themeKey = `${normalized.style}-${normalized.colorScheme}`;
  const theme = STYLE_COLOR_MAP[themeKey] || STYLE_COLOR_MAP["minimal-light"];
  applied.push(`theme: mapped ${normalized.style} + ${normalized.colorScheme}`);

  return { strategy: normalized, theme, appliedRules: applied };
}
