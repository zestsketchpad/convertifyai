export const buildPrompt = (reviews: string, tone: string) => `
You are an expert conversion analyst.

Analyze these reviews:
${reviews}

STRICT RULES:
- Return ONLY valid JSON
- No explanation
- No extra text

Extract:
- painPoints
- benefits
- keywords

Find:
- topProblem

Give:
- recommendation

Generate landing page content in ${tone} tone:
- headline
- subheadline
- benefits
- testimonials
- CTA

Scores (0-100):
- conversion
- clarity
- emotion

Return JSON:
{
  "headline": "",
  "subheadline": "",
  "benefits": [],
  "painPoints": [],
  "keywords": [],
  "topProblem": "",
  "recommendation": "",
  "scores": {
    "conversion": 0,
    "clarity": 0,
    "emotion": 0
  },
  "testimonials": [],
  "cta": ""
}
`;