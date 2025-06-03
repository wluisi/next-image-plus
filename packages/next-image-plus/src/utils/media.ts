type MediaQueryItem = {
  key: string;
  media: string;
};

// (min-width: 431px) and (max-width: 1023px) -> { min: 431, max: 1023 }
function parseMediaQuery(media: string): { min: number; max: number } {
  const min = media.match(/min-width:\s*(\d+)px/);
  const max = media.match(/max-width:\s*(\d+)px/);

  return {
    min: min ? parseInt(min[1], 10) : 0,
    max: max ? parseInt(max[1], 10) : Infinity,
  };
}

function buildMediaQuery(min: number, max: number): string | null {
  if (min === 0 && max !== Infinity) {
    return `(max-width: ${max}px)`;
  }

  if (min !== 0 && max === Infinity) {
    return `(min-width: ${min}px)`;
  }

  return `(min-width: ${min}px) and (max-width: ${max}px)`;
}

export function getMediaQueries(items: MediaQueryItem[]): {
  [key: string]: { media: string };
} {
  const ranges = items.map(({ key, media }) => {
    const { min, max } = parseMediaQuery(media);
    return { key, min, max, media };
  });

  // Sort by min then max
  ranges.sort((a, b) => a.min - b.min || a.max - b.max);

  let lastMax = -1;
  const modified: MediaQueryItem[] = [];

  for (const range of ranges) {
    const min = lastMax + 1;
    const max = range.max;

    modified.push({
      key: range.key,
      media: buildMediaQuery(min, max),
    });

    lastMax = max;
  }

  const result = {};
  modified.forEach((item) => {
    result[item.key] = item.media;
  });

  return result;
}
