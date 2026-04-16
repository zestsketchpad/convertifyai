export interface PagePlan {
  industry: string;
  design: string;
  colors: ColorScheme;
  layout: string;
}

export interface ColorScheme {
  primary: string;
  secondary: string;
  accent: string;
  bg: string;
  text: string;
  subtext: string;
  card: string;
}

export const DESIGNS: Record<string, { colors: ColorScheme; layout: string }> = {
  healthcare: {
    colors: {
      primary: "from-cyan-500 to-blue-500",
      secondary: "from-teal-600 to-cyan-600",
      accent: "cyan",
      bg: "from-slate-900 via-slate-800 to-blue-900",
      text: "white",
      subtext: "slate-300",
      card: "slate-700/50",
    },
    layout: "healthcare",
  },
  ecommerce: {
    colors: {
      primary: "from-orange-500 to-rose-500",
      secondary: "from-rose-600 to-pink-600",
      accent: "orange",
      bg: "from-slate-900 via-slate-800 to-rose-900",
      text: "white",
      subtext: "slate-300",
      card: "slate-700/50",
    },
    layout: "ecommerce",
  },
  saas: {
    colors: {
      primary: "from-blue-500 to-indigo-500",
      secondary: "from-indigo-600 to-purple-600",
      accent: "indigo",
      bg: "from-slate-900 via-indigo-900 to-slate-900",
      text: "white",
      subtext: "slate-300",
      card: "slate-700/50",
    },
    layout: "saas",
  },
  fashion: {
    colors: {
      primary: "from-pink-500 to-rose-500",
      secondary: "from-purple-600 to-pink-600",
      accent: "pink",
      bg: "from-slate-950 via-slate-900 to-slate-950",
      text: "white",
      subtext: "slate-400",
      card: "slate-800/50",
    },
    layout: "fashion",
  },
  restaurant: {
    colors: {
      primary: "from-amber-500 to-orange-500",
      secondary: "from-yellow-600 to-amber-600",
      accent: "amber",
      bg: "from-amber-950 via-slate-900 to-slate-900",
      text: "white",
      subtext: "slate-300",
      card: "slate-700/30",
    },
    layout: "restaurant",
  },
  realestate: {
    colors: {
      primary: "from-emerald-500 to-teal-500",
      secondary: "from-green-600 to-emerald-600",
      accent: "emerald",
      bg: "from-slate-900 via-slate-800 to-emerald-900",
      text: "white",
      subtext: "slate-300",
      card: "slate-700/50",
    },
    layout: "realestate",
  },
  education: {
    colors: {
      primary: "from-blue-500 to-cyan-500",
      secondary: "from-sky-600 to-blue-600",
      accent: "blue",
      bg: "from-slate-900 via-slate-800 to-blue-900",
      text: "white",
      subtext: "slate-300",
      card: "slate-700/50",
    },
    layout: "education",
  },
};

export function inferIndustry(data: any): string {
  const headline = (data?.landing?.headline || "").toLowerCase();
  const benefits = (Array.isArray(data?.benefits)
    ? data.benefits.map((b: string) => b.toLowerCase())
    : []
  ).join(" ");
  const allText = `${headline} ${benefits}`;

  if (
    allText.includes("saree") ||
    allText.includes("fashion") ||
    allText.includes("clothing") ||
    allText.includes("collection") ||
    allText.includes("shopping")
  ) {
    return "fashion";
  }

  if (
    allText.includes("clinic") ||
    allText.includes("hospital") ||
    allText.includes("medical") ||
    allText.includes("doctor") ||
    allText.includes("appointment") ||
    allText.includes("patient")
  ) {
    return "healthcare";
  }

  if (
    allText.includes("restaurant") ||
    allText.includes("food") ||
    allText.includes("dining") ||
    allText.includes("cafe")
  ) {
    return "restaurant";
  }

  if (
    allText.includes("property") ||
    allText.includes("real estate") ||
    allText.includes("apartment") ||
    allText.includes("house")
  ) {
    return "realestate";
  }

  if (
    allText.includes("software") ||
    allText.includes("app") ||
    allText.includes("platform") ||
    allText.includes("saas")
  ) {
    return "saas";
  }

  if (
    allText.includes("course") ||
    allText.includes("learn") ||
    allText.includes("education") ||
    allText.includes("school")
  ) {
    return "education";
  }

  if (
    allText.includes("product") ||
    allText.includes("buy") ||
    allText.includes("order") ||
    allText.includes("shop") ||
    allText.includes("store")
  ) {
    return "ecommerce";
  }

  return "ecommerce";
}

export function getDesign(industry: string) {
  return DESIGNS[industry] || DESIGNS.ecommerce;
}
