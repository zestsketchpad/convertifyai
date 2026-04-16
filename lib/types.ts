// Strategic decisions from AI
export interface Strategy {
  industry: string;
  targetAudience: string;
  goal: "trust" | "conversion" | "awareness" | "education";
  style: "minimal" | "bold" | "luxury" | "modern" | "playful";
  sections: SectionType[];
  sectionOrder: SectionType[];
  universalStructure?: SectionType[];
  industrySections?: SectionType[];
  visualDirection: string;
  colorScheme: "light" | "dark" | "gradient";
  primaryColor?: string;
  secondaryColor?: string;
}

export type SectionType =
  | "navbar"
  | "hero"
  | "trust_badges"
  | "trust_indicators"
  | "benefits"
  | "problem_solution"
  | "stats"
  | "features"
  | "services"
  | "about"
  | "appointment"
  | "product_grid"
  | "categories"
  | "how_it_works"
  | "demo_preview"
  | "menu"
  | "popular_dishes"
  | "case_studies"
  | "gallery"
  | "testimonials"
  | "faq"
  | "cta"
  | "keywords";

// Component variant mapping
export interface ComponentVariant {
  type: SectionType;
  variant: string; // e.g., "minimal", "bold", "centered", "split"
}

// Render context
export interface RenderContext {
  strategy: Strategy;
  data: GeneratedData;
  theme: ThemeConfig;
}

export interface GeneratedData {
  headline?: string;
  subheadline?: string;
  landing?: {
    headline?: string;
    subheadline?: string;
    benefits?: string[];
    cta?: string;
  };
  benefits: string[];
  painPoints: string[];
  keywords: string[];
  scores: {
    conversion: number;
    clarity: number;
    emotion: number;
  };
  testimonials: Array<{
    name: string;
    review: string;
  }>;
  stats?: Array<{
    value: string;
    label: string;
  }>;
  cta?: string;
  topProblem: string;
  reviewsText?: string;
  layoutMode?: "trust-first" | "data-first" | "story-first";
}

export interface ThemeConfig {
  bg: string;
  text: string;
  primary: string;
  secondary: string;
  accent: string;
  gradients: {
    hero: string;
    btn: string;
    accent: string;
  };
}
