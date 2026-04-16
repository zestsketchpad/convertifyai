export const MAX_REVIEW_INPUT_CHARS = 3500;
export const HARD_MAX_REVIEW_INPUT_CHARS = 12000;

const NOISE_LINE_PATTERNS: RegExp[] = [
  /^like$/i,
  /^share$/i,
  /^more$/i,
  /^local guide/i,
  /^\d+\s+reviews?(\s*[\u00b7\-].*)?$/i,
  /^\d+\s+reviews?\s*\d+\s*photos?$/i,
  /^\d+\s*(months?|years?)\s+ago$/i,
  /^a\s+month\s+ago$/i,
  /^\p{Letter}+(\s+\p{Letter}+){0,2}$/u,
];

function stripUiMarkers(value: string) {
  return value
    .replace(/[\uE000-\uF8FF]/g, " ")
    .replace(/…\s*more/gi, " ")
    .replace(/[\u2605\u2606\u2B50]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function isNoiseLine(value: string) {
  if (!value) return true;
  if (value.length < 2) return true;

  const cleaned = stripUiMarkers(value);
  if (!cleaned) return true;

  if (/^[\W_]+$/u.test(cleaned)) return true;
  if (NOISE_LINE_PATTERNS.some((pattern) => pattern.test(cleaned))) return true;

  return false;
}

export function sanitizeReviewInput(value: string) {
  return value
    .replace(/\r\n/g, "\n")
    .replace(/[\t\f\v]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function truncateReviewInput(value: string, maxChars = MAX_REVIEW_INPUT_CHARS) {
  if (value.length <= maxChars) {
    return { value, wasTruncated: false };
  }

  return {
    value: value.slice(0, maxChars),
    wasTruncated: true,
  };
}

export function extractMeaningfulReviewLines(value: string) {
  const lines = sanitizeReviewInput(value)
    .split("\n")
    .map((line) => stripUiMarkers(line))
    .filter((line) => !isNoiseLine(line));

  const unique: string[] = [];
  const seen = new Set<string>();

  for (const line of lines) {
    if (line.length < 20) continue;

    const key = line.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(line);
  }

  return unique;
}

export function buildReviewModelContext(value: string) {
  const extractedLines = extractMeaningfulReviewLines(value);

  if (extractedLines.length === 0) {
    return {
      extractedLines: [],
      cleanForPrompt: sanitizeReviewInput(value),
      cleanForAnalysis: sanitizeReviewInput(value),
    };
  }

  const cleanForPrompt = extractedLines.map((line, index) => `${index + 1}. ${line}`).join("\n");
  const cleanForAnalysis = extractedLines.join("\n");

  return {
    extractedLines,
    cleanForPrompt,
    cleanForAnalysis,
  };
}
