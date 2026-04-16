export const MAX_REVIEW_INPUT_CHARS = 3500;
export const HARD_MAX_REVIEW_INPUT_CHARS = 12000;

export function sanitizeReviewInput(value: string) {
  return value.replace(/\r\n/g, "\n").trim();
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
