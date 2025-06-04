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
  const min = media.match(/min-width:\s*(\d+)px/);
  const max = media.match(/max-width:\s*(\d+)px/);

  return {
    min: min ? parseInt(min[1], 10) : 0,
    max: max ? parseInt(max[1], 10) : Infinity,
  };
}

export function buildMediaQuery(min: number, max: number): string | null {
  if (min === 0 && max !== Infinity) {
    return `(max-width: ${max}px)`;
  }

  if (min !== 0 && max === Infinity) {
    return `(min-width: ${min}px)`;
  }

  return `(min-width: ${min}px) and (max-width: ${max}px)`;
}

export function getMediaQueries(items: MediaQueryItem[]): {
  [uuid: string]: string;
} {
  const ranges = items.map(({ uuid, media }) => {
    const { min, max } = parseMediaQuery(media);
    return { uuid, min, max, media };
  });

  // Sort by smallest min first.
  ranges.sort((a, b) => a.min - b.min || a.max - b.max);

  let lastMax = -1;
  const modified: { uuid: string; media: string }[] = [];

  for (const range of ranges) {
    const min = Math.max(range.min, lastMax + 1);
    const max = range.max;

    modified.push({
      uuid: range.uuid,
      media: buildMediaQuery(min, max),
    });

    lastMax = max;
  }

  const result = {};
  modified.forEach((item) => {
    result[item.uuid] = item.media;
  });

  return result;
}
