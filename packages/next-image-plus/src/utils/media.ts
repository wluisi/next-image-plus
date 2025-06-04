// @todo
// - figure out how to generate the fallback media query from the source media queries.
// - test functions in preload.
// - update picture example to use new function (in component media queries can overlap) and add 2nd example pg where fallbackMedia and non-overlapping media queries are used.

export type MediaQueryItem = {
  uuid: string;
  media: string;
};

// (min-width: 431px) and (max-width: 1023px) -> { min: 431, max: 1023 }
export function parseMediaQuery(media: string): { min: number; max: number } {
  const minMatch = media.match(/min-width:\s*(\d+)px/);
  const maxMatch = media.match(/max-width:\s*(\d+)px/);

  if (!minMatch && !maxMatch) {
    return null;
  }

  const min = minMatch ? parseInt(minMatch[1], 10) : null;
  const max = maxMatch ? parseInt(maxMatch[1], 10) : null;

  return { min, max };
}

/**
 * Adjust min-width and/or max-width values inside a media query string.
 *
 * @param media - The media query string to adjust.
 * @param adjustments - Object with optional `min` and `max` number values:
 *   - `min`: amount to add to all min-width values (positive or negative).
 *   - `max`: amount to add to all max-width values (positive or negative).
 *
 * Example:
 *   changeWidths("(min-width: 430px) and (max-width: 1024px)", { min: 1, max: -1 })
 *   // returns "(min-width: 431px) and (max-width: 1023px)"
 */
function getMediaQuery(
  media: string,
  adjustments: { min?: number; max?: number }
): string {
  let result = media;

  if (typeof adjustments.min === "number") {
    const minAdjustment = adjustments.min;
    result = result.replace(/min-width:\s*(\d+)px/g, (_, num) => {
      const newVal = parseInt(num, 10) + minAdjustment;
      return `min-width: ${newVal}px`;
    });
  }

  if (typeof adjustments.max === "number") {
    const maxAdjustment = adjustments.max;
    result = result.replace(/max-width:\s*(\d+)px/g, (_, num) => {
      const newVal = parseInt(num, 10) + maxAdjustment;
      return `max-width: ${newVal}px`;
    });
  }

  return result;
}

/**
 * Adjust original media query sources to avoid overlapping ranges:
 * - Bump first source's min-width by 1 to prevent overlap with fallback
 * - For adjacent sources, reduce max-width by 1 if it overlaps next's min-width
 *
 * @param items - Array of media query items.
 * @returns Adjusted array with modified media queries.
 */
export function getMediaQueries(items: MediaQueryItem[]): {
  [uuid: string]: string;
} {
  const parsed = items
    .map((item) => {
      const result = parseMediaQuery(item.media);
      if (!result) return null;
      return {
        ...item,
        min: result.min ?? null,
        max: result.max ?? null,
      };
    })
    .filter(Boolean) as (MediaQueryItem & {
    min: number | null;
    max: number | null;
  })[];

  parsed.sort((a, b) => {
    const aMin = a.min ?? -Infinity;
    const bMin = b.min ?? -Infinity;
    return aMin - bMin;
  });

  // console.log("parsed", parsed);

  // Early return if no overlap exists.
  const hasOverlap = parsed.some((current, i) => {
    const next = parsed[i + 1];
    return (
      next &&
      current.max !== null &&
      next.min !== null &&
      current.max === next.min
    );
  });

  if (!hasOverlap) {
    const result = {};
    items.forEach((item) => {
      result[item.uuid] = item.media;
    });

    return result;
  }

  // There's overlap, so we proceed with adjusting the media queries.
  const adjusted = new Map<string, string>();

  // Adjust first non-fallback min-width.
  for (const item of parsed) {
    if (item.min !== null && item.min > 0) {
      adjusted.set(item.uuid, getMediaQuery(item.media, { min: 1 }));
      item.min += 1;
      break;
    }
  }

  // Adjust overlapping max-widths.
  for (let i = 0; i < parsed.length - 1; i++) {
    const current = parsed[i];
    const next = parsed[i + 1];

    if (current.max !== null && next.min !== null && current.max === next.min) {
      const updated = getMediaQuery(
        adjusted.get(current.uuid) ?? current.media,
        { max: -1 }
      );
      adjusted.set(current.uuid, updated);
      current.max -= 1;
    }
  }

  const result = {};
  items.forEach((item) => {
    result[item.uuid] = adjusted.get(item.uuid) ?? item.media;
  });

  return result;
}
