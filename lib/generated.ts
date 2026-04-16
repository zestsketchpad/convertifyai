export type GeneratedScores = {
  conversion: number;
  clarity: number;
  emotion: number;
};

export type GeneratedLanding = {
  headline: string;
  subheadline: string;
  benefits: string[];
  cta: string;
};

export type GeneratedDesignHints = {
  layoutStyle?: "story" | "trust" | "offer";
  vibe?: "bold" | "premium" | "friendly";
  urgency?: "low" | "medium" | "high";
};

export type GeneratedTestimonial = {
  name: string;
  review: string;
};

export type GeneratedPayload = {
  painPoints: string[];
  benefits: string[];
  keywords: string[];
  topProblem: string;
  recommendation: string;
  scores: GeneratedScores;
  landing: GeneratedLanding;
  testimonials: GeneratedTestimonial[];
  design?: GeneratedDesignHints;
};

export type GenerateApiErrorBody = {
  error?: string;
  code?: string;
  hint?: string;
  details?: string;
};