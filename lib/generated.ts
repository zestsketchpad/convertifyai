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
};

export type GenerateApiErrorBody = {
  error?: string;
  code?: string;
  hint?: string;
  details?: string;
};