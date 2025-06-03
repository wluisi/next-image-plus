// import { ImageAttributes } from "./../preload";

export type MediaQueryItem = {
  id: string;
  media: string;
  [field: string]: string;
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
  [id: string]: { media: string };
} {
  const ranges = items.map(({ id, media }) => {
    const { min, max } = parseMediaQuery(media);
    return { id, min, max, media };
  });

  // Sort by smallest min first.
  ranges.sort((a, b) => a.min - b.min || a.max - b.max);

  // console.log("ranges", ranges);

  let lastMax = -1;
  const modified: MediaQueryItem[] = [];

  for (const range of ranges) {
    // const min = lastMax + 1;
    const min = Math.max(range.min, lastMax + 1);
    const max = range.max;

    modified.push({
      id: range.id,
      media: buildMediaQuery(min, max),
    });

    lastMax = max;
  }

  const result = {};
  modified.forEach((item) => {
    result[item.id] = item.media;
  });

  return result;
}
