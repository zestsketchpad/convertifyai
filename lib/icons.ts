// Image placeholder generator - semantic hints
export function getImagePlaceholder(industry: string, section: string): { bg: string; hint: string } {
  const placeholders: Record<string, Record<string, { bg: string; hint: string }>> = {
    healthcare: {
      hero: { bg: "from-cyan-500/30 to-blue-500/30", hint: "Doctors with patients" },
      gallery: { bg: "from-cyan-400/30 to-blue-400/30", hint: "Hospital facilities" },
      team: { bg: "from-cyan-600/30 to-blue-600/30", hint: "Medical team" },
      creative: { bg: "from-cyan-700/30 to-blue-700/30", hint: "Healthcare brand scene" },
    },
    fashion: {
      hero: { bg: "from-pink-500/30 to-rose-500/30", hint: "Fashion collection" },
      gallery: { bg: "from-pink-400/30 to-rose-400/30", hint: "Clothing showcase" },
      team: { bg: "from-pink-500/30 to-purple-500/30", hint: "Fashion team" },
      creative: { bg: "from-rose-600/30 to-pink-700/30", hint: "Editorial style visual" },
    },
    saas: {
      hero: { bg: "from-indigo-500/30 to-purple-500/30", hint: "Product dashboard" },
      gallery: { bg: "from-indigo-400/30 to-blue-400/30", hint: "Analytics visuals" },
      team: { bg: "from-purple-500/30 to-indigo-500/30", hint: "Team collaboration" },
      creative: { bg: "from-indigo-700/30 to-slate-700/30", hint: "Product growth scene" },
    },
    restaurant: {
      hero: { bg: "from-amber-500/30 to-orange-500/30", hint: "Food hero shot" },
      gallery: { bg: "from-amber-400/30 to-yellow-400/30", hint: "Kitchen in action" },
      team: { bg: "from-orange-500/30 to-red-500/30", hint: "Chef team" },
      creative: { bg: "from-amber-700/30 to-red-700/30", hint: "Dining atmosphere" },
    },
    realestate: {
      hero: { bg: "from-emerald-500/30 to-teal-500/30", hint: "Featured property" },
      gallery: { bg: "from-emerald-400/30 to-green-400/30", hint: "Property gallery" },
      team: { bg: "from-green-500/30 to-emerald-500/30", hint: "Agent team" },
      creative: { bg: "from-emerald-700/30 to-teal-800/30", hint: "Luxury living scene" },
    },
    ecommerce: {
      hero: { bg: "from-orange-500/30 to-rose-500/30", hint: "Product display" },
      gallery: { bg: "from-orange-400/30 to-yellow-400/30", hint: "Product grid" },
      team: { bg: "from-red-500/30 to-orange-500/30", hint: "Brand team" },
      creative: { bg: "from-rose-700/30 to-orange-700/30", hint: "Campaign offer scene" },
    },
  };

  return placeholders[industry.toLowerCase()]?.[section.toLowerCase()] || { bg: "from-slate-600/30 to-slate-700/30", hint: "Image placeholder" };
}

function imageTagsFor(industry: string, section: string): string[] {
  const map: Record<string, Record<string, string[]>> = {
    healthcare: {
      hero: ["doctor", "clinic", "healthcare"],
      gallery: ["hospital", "medical", "facility"],
      team: ["medical", "team", "staff"],
      creative: ["healthcare", "wellness", "care"],
    },
    fashion: {
      hero: ["fashion", "model", "style"],
      gallery: ["clothing", "runway", "lookbook"],
      team: ["designer", "studio", "fashion-team"],
      creative: ["editorial", "fashion", "campaign"],
    },
    saas: {
      hero: ["technology", "startup", "software"],
      gallery: ["analytics", "dashboard", "data"],
      team: ["office", "team", "collaboration"],
      creative: ["tech", "digital", "growth"],
    },
    restaurant: {
      hero: ["restaurant", "food", "dining"],
      gallery: ["kitchen", "chef", "dish"],
      team: ["chef", "restaurant-team", "hospitality"],
      creative: ["food", "table", "atmosphere"],
    },
    realestate: {
      hero: ["house", "real-estate", "property"],
      gallery: ["interior", "architecture", "home"],
      team: ["real-estate-agent", "office", "team"],
      creative: ["luxury-home", "apartment", "lifestyle"],
    },
    ecommerce: {
      hero: ["product", "shopping", "retail"],
      gallery: ["catalog", "ecommerce", "store"],
      team: ["brand", "retail-team", "business"],
      creative: ["promotion", "campaign", "sale"],
    },
  };

  return map[industry.toLowerCase()]?.[section.toLowerCase()] || ["business", "creative", "branding"];
}

function toneTagsFor(tone?: string): string[] {
  const t = (tone || "").toLowerCase();
  if (t === "luxury") return ["premium", "editorial", "high-end"];
  if (t === "casual") return ["lifestyle", "friendly", "authentic"];
  return ["professional", "clean", "brand"];
}

function cleanToken(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(value: string): string[] {
  return cleanToken(value)
    .split(" ")
    .map((token) => token.trim())
    .filter((token) => token.length >= 3);
}

export function buildImageIntentKeywords(params: {
  industry: string;
  section: string;
  tone?: string;
  headline?: string;
  keywords?: string[];
  benefits?: string[];
  painPoints?: string[];
}): string[] {
  const base = imageTagsFor(params.industry, params.section);
  const toneTags = toneTagsFor(params.tone);

  const textTokens = [
    ...(params.keywords || []),
    ...(params.benefits || []).slice(0, 4),
    ...(params.painPoints || []).slice(0, 2),
    params.headline || "",
  ].flatMap((item) => tokenize(item));

  const stopWords = new Set([
    "best",
    "good",
    "great",
    "quality",
    "service",
    "experience",
    "today",
    "with",
    "from",
    "your",
    "this",
    "that",
  ]);

  const unique = Array.from(new Set([...base, ...toneTags, ...textTokens]))
    .filter((token) => !stopWords.has(token))
    .slice(0, 8);

  return unique.length > 0 ? unique : base;
}

function hashSeed(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function paletteForIndustry(industry: string): [string, string, string] {
  const palettes: Record<string, [string, string, string]> = {
    healthcare: ["#0ea5e9", "#06b6d4", "#1e3a8a"],
    fashion: ["#ec4899", "#f43f5e", "#581c87"],
    saas: ["#6366f1", "#3b82f6", "#312e81"],
    restaurant: ["#f59e0b", "#f97316", "#7c2d12"],
    realestate: ["#10b981", "#14b8a6", "#134e4a"],
    ecommerce: ["#f97316", "#fb7185", "#7f1d1d"],
  };
  return palettes[industry.toLowerCase()] || ["#64748b", "#334155", "#0f172a"];
}

export function getDynamicPlaceholderImage(
  industry: string,
  section: string,
  contextSeed = "default",
): { src: string; alt: string } {
  const [c1, c2, c3] = paletteForIndustry(industry);
  const hint = getImagePlaceholder(industry, section).hint;
  const safeSeed = `${industry}-${section}-${contextSeed}`.toLowerCase().replace(/[^a-z0-9-]/g, "-");
  const hash = hashSeed(safeSeed);

  const cx1 = 160 + (hash % 220);
  const cy1 = 180 + (hash % 260);
  const r1 = 140 + (hash % 100);

  const cx2 = 980 + (hash % 260);
  const cy2 = 560 + (hash % 180);
  const r2 = 220 + (hash % 120);

  const svg = `
<svg width="1600" height="1000" viewBox="0 0 1600 1000" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1600" y2="1000" gradientUnits="userSpaceOnUse">
      <stop stop-color="${c1}" />
      <stop offset="0.55" stop-color="${c2}" />
      <stop offset="1" stop-color="${c3}" />
    </linearGradient>
    <radialGradient id="orb1" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(${cx1} ${cy1}) rotate(90) scale(${r1})">
      <stop stop-color="white" stop-opacity="0.35" />
      <stop offset="1" stop-color="white" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="orb2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(${cx2} ${cy2}) rotate(90) scale(${r2})">
      <stop stop-color="white" stop-opacity="0.2" />
      <stop offset="1" stop-color="white" stop-opacity="0" />
    </radialGradient>
  </defs>
  <rect width="1600" height="1000" fill="url(#bg)" />
  <rect width="1600" height="1000" fill="url(#orb1)" />
  <rect width="1600" height="1000" fill="url(#orb2)" />
  <g opacity="0.18" stroke="white" stroke-width="2">
    <path d="M0 220H1600" />
    <path d="M0 500H1600" />
    <path d="M0 780H1600" />
    <path d="M320 0V1000" />
    <path d="M800 0V1000" />
    <path d="M1280 0V1000" />
  </g>
  <text x="100" y="850" fill="white" fill-opacity="0.92" font-family="Segoe UI, Arial" font-size="52" font-weight="700">${hint}</text>
  <text x="100" y="910" fill="white" fill-opacity="0.7" font-family="Segoe UI, Arial" font-size="24" letter-spacing="4">${industry.toUpperCase()} · ${section.toUpperCase()}</text>
</svg>`;

  return {
    src: `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`,
    alt: `${industry} ${section} placeholder`,
  };
}

export function getOpenImageSources(
  industry: string,
  section: string,
  contextSeed = "default",
  intentKeywords?: string[],
): { sources: string[]; alt: string } {
  const tags = intentKeywords && intentKeywords.length > 0 ? intentKeywords : imageTagsFor(industry, section);
  const seed = hashSeed(`${industry}-${section}-${contextSeed}`);
  const fallback = getDynamicPlaceholderImage(industry, section, contextSeed).src;

  const stockPools: Record<string, Record<string, string[]>> = {
    healthcare: {
      hero: [
        "https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/8460157/pexels-photo-8460157.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/8376176/pexels-photo-8376176.jpeg?auto=compress&cs=tinysrgb&w=1600",
      ],
      gallery: [
        "https://images.pexels.com/photos/1170979/pexels-photo-1170979.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/1369798/pexels-photo-1369798.jpeg?auto=compress&cs=tinysrgb&w=1600",
      ],
      team: [
        "https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/6129047/pexels-photo-6129047.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=1600",
      ],
      creative: [
        "https://images.pexels.com/photos/3845766/pexels-photo-3845766.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=1600",
      ],
    },
    fashion: {
      hero: [
        "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/974911/pexels-photo-974911.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/1755385/pexels-photo-1755385.jpeg?auto=compress&cs=tinysrgb&w=1600",
      ],
      gallery: [
        "https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/1126993/pexels-photo-1126993.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg?auto=compress&cs=tinysrgb&w=1600",
      ],
      team: [
        "https://images.pexels.com/photos/3771115/pexels-photo-3771115.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/3762659/pexels-photo-3762659.jpeg?auto=compress&cs=tinysrgb&w=1600",
      ],
      creative: [
        "https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/6311392/pexels-photo-6311392.jpeg?auto=compress&cs=tinysrgb&w=1600",
      ],
    },
    saas: {
      hero: [
        "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1600",
      ],
      gallery: [
        "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=1600",
      ],
      team: [
        "https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=1600",
      ],
      creative: [
        "https://images.pexels.com/photos/3861458/pexels-photo-3861458.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/695644/pexels-photo-695644.jpeg?auto=compress&cs=tinysrgb&w=1600",
      ],
    },
    restaurant: {
      hero: [
        "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=1600",
      ],
      gallery: [
        "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/3338497/pexels-photo-3338497.jpeg?auto=compress&cs=tinysrgb&w=1600",
      ],
      team: [
        "https://images.pexels.com/photos/4252139/pexels-photo-4252139.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/8477329/pexels-photo-8477329.jpeg?auto=compress&cs=tinysrgb&w=1600",
      ],
      creative: [
        "https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=1600",
      ],
    },
    realestate: {
      hero: [
        "https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1600",
      ],
      gallery: [
        "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/2635038/pexels-photo-2635038.jpeg?auto=compress&cs=tinysrgb&w=1600",
      ],
      team: [
        "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/3810792/pexels-photo-3810792.jpeg?auto=compress&cs=tinysrgb&w=1600",
      ],
      creative: [
        "https://images.pexels.com/photos/2404843/pexels-photo-2404843.jpeg?auto=compress&cs=tinysrgb&w=1600",
      ],
    },
    ecommerce: {
      hero: [
        "https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=1600",
      ],
      gallery: [
        "https://images.pexels.com/photos/6214476/pexels-photo-6214476.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=1600",
      ],
      team: [
        "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/8112200/pexels-photo-8112200.jpeg?auto=compress&cs=tinysrgb&w=1600",
      ],
      creative: [
        "https://images.pexels.com/photos/7974/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1600",
      ],
    },
  };

  const pool =
    stockPools[industry.toLowerCase()]?.[section.toLowerCase()] ||
    stockPools.ecommerce.hero;

  const primary = pool[seed % pool.length];
  const secondary = pool[(seed + 1) % pool.length];

  const sources = [
    primary,
    secondary,
    `https://picsum.photos/seed/${encodeURIComponent(`${industry}-${section}-${seed}`)}/1600/1000`,
    fallback,
  ];

  return {
    sources,
    alt: `${industry} ${section} visual`,
  };
}

