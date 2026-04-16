export const buildPrompt = (reviews: string, tone: string) => `
You are an expert conversion strategist.

Analyze the following user reviews.

IMPORTANT RULES:
- Only extract painPoints if users EXPLICITLY mention negative experiences (complaints, frustrations, obstacles).
- Do NOT invent problems.
- If no clear problems exist, return:
  "painPoints": []
  "topProblem": "No major issues mentioned"
  and a specific recommendation that reinforces real strengths from the reviews.

- Benefits must reflect positive experiences explicitly mentioned by users.
- Benefits must be short, clear phrases (2–5 words). Avoid single words and full sentences.
- Ignore business/owner responses (e.g. "Response from the owner"); focus on the customer sentiment.
- Be accurate and realistic.
- Input may contain copied UI junk from Google Maps (Like, Share, ratings, timestamps). Ignore such noise.
- If even one clear complaint appears, include it in painPoints.

SCORING RULES:
- Scores must NEVER be 0.
- Base scores on sentiment:
  - If mostly positive:
    conversion: 75-90
    clarity: 80-95
    emotion: 70-90
  - If mixed:
    conversion: 50-75
    clarity: 60-85
    emotion: 50-80
  - If negative:
    conversion: 20-50
    clarity: 40-70
    emotion: 20-60

RECOMMENDATION RULE:
- Must be specific and actionable.
- Must reference actual strengths or issues from the reviews.
- Avoid generic phrases like "emphasize strengths" or "trust signals".

DESIGN HINT RULE:
- Return design hints to drive dynamic landing layout:
  - layoutStyle: "story" | "trust" | "offer"
  - vibe: "bold" | "premium" | "friendly"
  - urgency: "low" | "medium" | "high"
- Choose these based on review sentiment and intent.

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
    "conversion": 80,
    "clarity": 85,
    "emotion": 80
  },
  "landing": {
    "headline": "string",
    "subheadline": "string",
    "benefits": ["string"],
    "cta": "string"
  },
  "design": {
    "layoutStyle": "trust",
    "vibe": "premium",
    "urgency": "medium"
  },
  "testimonials": [
    {
      "name": "string",
      "review": "string"
    }
  ]
}
`;
