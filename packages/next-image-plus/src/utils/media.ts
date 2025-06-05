export type MediaQueryItem = {
  uuid: string;
  media: string;
};

/**
 * Parses a media query to get it's min and max values as numbers.
 *
 * @param media - The media query string to parse.
 * @returns An object with min and max values.
 */
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
 * Normalize min-width and/or max-width values inside a media query string.
 *
 * @param media - The media query string to normalize.
 * @param offset - Object with optional `min` and `max` number values:
 *   - `min`: amount to add to all min-width values (positive or negative).
 *   - `max`: amount to add to all max-width values (positive or negative).
 * @returns A normalized media query.
 */
function getMediaQuery(
  media: string,
  offset: { min?: number; max?: number }
): string {
  let result = media;

  if (typeof offset.min === "number") {
    result = result.replace(/min-width:\s*(\d+)px/g, (_, num) => {
      const newValue = parseInt(num, 10) + offset.min;
      return `min-width: ${newValue}px`;
    });
  }

  if (typeof offset.max === "number") {
    result = result.replace(/max-width:\s*(\d+)px/g, (_, num) => {
      const newValue = parseInt(num, 10) + offset.max;
      return `max-width: ${newValue}px`;
    });
  }

  return result;
}

/**
 * Generate a fallback media query covering everything below the smallest min-width.
 *
 * @param items - Array of media query items.
 * @returns A fallback media query item or null.
 */
export function getFallbackMediaQuery(
  items: MediaQueryItem[]
): MediaQueryItem | null {
  // Parse all min-width values from media queries.
  const ranges = items
    .map((item) => {
      const parsed = parseMediaQuery(item.media);
      if (parsed === null) return null;
      return { min: parsed.min ?? 0 }; // Default min to 0 if missing.
    })
    .filter(Boolean) as { min: number }[];

  // If no valid media queries, no fallback needed.
  if (ranges.length === 0) {
    return null;
  }

  // Find the smallest min-width among all sources.
  const smallestMin = Math.min(...ranges.map((r) => r.min));

  // If smallest min-width is greater than 0,
  // create fallback for all widths up to smallestMin.
  if (smallestMin > 0) {
    return {
      uuid: "img-fallback",
      media: `(max-width: ${smallestMin}px)`, // e.g. (max-width: 430px).
    };
  }

  // Otherwise no fallback needed (e.g. some source already covers 0+).
  return null;
}

type GetMediaQueryOptions = {
  /** Enables or disables media query normalization to remove overlaps. Defaults to `true`. */
  normalize?: boolean;
  /** Optional fallback media query. */
  fallback?: string;
};

/**
 * Normalize media queries to remove overlapping ranges:
 * - Bump first source's min-width by 1 to prevent overlap with fallback.
 * - For adjacent sources, reduce max-width by 1 if it overlaps the next min-width.
 *
 * @param items - Array of media query items.
 * @returns Normalized object of objects, keyed by uuid.
 */
export function getMediaQueries(
  items: MediaQueryItem[],
  options?: GetMediaQueryOptions
): {
  [uuid: string]: string;
} {
  const { normalize = true, fallback = null } = options ?? {};

  // Handle fallback media query.
  if (!fallback) {
    const fallbackItem = getFallbackMediaQuery(items);
    if (fallbackItem) {
      items.push(fallbackItem);
    }
  } else {
    items.push({
      uuid: "img-fallback",
      media: fallback,
    });
  }

  // If normalize is false, then just return the items unchanged.
  if (!normalize) {
    const result = {};
    items.forEach((item) => {
      result[item.uuid] = item.media;
    });

    return result;
  }

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

  // There's overlap, so we proceed with normalizing the media queries.
  const normalized = new Map<string, string>();

  // Normalize the first non-fallback min-width.
  for (const item of parsed) {
    if (item.min !== null && item.min > 0) {
      normalized.set(item.uuid, getMediaQuery(item.media, { min: 1 }));
      item.min += 1;
      break;
    }
  }

  // Normalize overlapping max-widths.
  for (let i = 0; i < parsed.length - 1; i++) {
    const current = parsed[i];
    const next = parsed[i + 1];

    if (current.max !== null && next.min !== null && current.max === next.min) {
      const updated = getMediaQuery(
        normalized.get(current.uuid) ?? current.media,
        { max: -1 }
      );
      normalized.set(current.uuid, updated);
      current.max -= 1;
    }
  }

  const result = {};
  items.forEach((item) => {
    result[item.uuid] = normalized.get(item.uuid) ?? item.media;
  });

  return result;
}
