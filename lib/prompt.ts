export const buildPrompt = (reviews: string, tone: string) => `
You are an expert conversion strategist.

Analyze the following user reviews.

IMPORTANT RULES:
- Only extract painPoints if users EXPLICITLY mention negative experiences (complaints, frustrations, obstacles).
- Do NOT invent problems.
- If no clear problems exist, return:
  "painPoints": []
  "topProblem": "No major issues mentioned"
  "recommendation": "Emphasize strengths and trust signals (use concrete strengths from the reviews)"

- Benefits must reflect positive experiences explicitly mentioned by users.
- Ignore business/owner responses (e.g. "Response from the owner"); focus on the customer sentiment.
- Be accurate and realistic.

Tone: ${tone}

Reviews:
${reviews}

Return ONLY valid JSON. No markdown. No code fences.

Format:
{
  "painPoints": ["string"],
  "benefits": ["string"],
  "keywords": ["string"],
  "topProblem": "string",
  "recommendation": "string",
  "scores": {
    "conversion": 0,
    "clarity": 0,
    "emotion": 0
  },
  "landing": {
    "headline": "string",
    "subheadline": "string",
    "benefits": ["string"],
    "cta": "string"
  },
  "testimonials": [
    {
      "name": "string",
      "review": "string"
    }
  ]
}
`;
