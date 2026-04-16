export interface Testimonial {
  name: string;
  review: string;
}

export interface Landing {
  headline: string;
  subheadline: string;
  benefits: string[];
  cta: string;
}

export interface Scores {
  conversion: number;
  clarity: number;
  emotion: number;
}

export interface GeneratedPayload {
  painPoints: string[];
  benefits: string[];
  keywords: string[];
  topProblem: string;
  recommendation: string;
  scores: Scores;
  landing: Landing;
  testimonials: Testimonial[];
}
