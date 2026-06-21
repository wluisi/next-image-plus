import type { ImageRef } from "./types";

export function selectResponsiveImageSourceFromPicture(
  picture: HTMLPictureElement,
  options: { viewportWidth: number; devicePixelRatio: number; debug?: boolean }
): string | null {
  const { viewportWidth, devicePixelRatio, debug = false } = options;

  const effectiveWidth = viewportWidth * devicePixelRatio;

  function parseSrcset(srcset: string) {
    return srcset.split(",").map((entry) => {
      const parts = entry.trim().split(/\s+/);
      const url = parts[0];
      const descriptor = parts[1] ?? null;

      let width = 0;
      let density = 1;

      if (descriptor) {
        if (descriptor.endsWith("w")) {
          width = parseInt(descriptor.slice(0, -1), 10);
        } else if (descriptor.endsWith("x")) {
          density = parseFloat(descriptor.slice(0, -1));
        }
      } else {
        // No descriptor means a default candidate, keep width=0 and density=1
      }

      return { url, width, density };
    });
  }

  function findBestMatch(candidates: { url: string; width: number }[]) {
    if (debug) {
      console.log("Candidates:", candidates, "EffectiveWidth:", effectiveWidth);
    }

    return (
      candidates.find((c) => c.width >= effectiveWidth) ??
      candidates.at(-1) ??
      null
    );
  }

  function matchesSimpleMedia(media: string | null, width: number): boolean {
    if (!media) {
      if (debug) {
        console.log("No media, matches all");
      }

      return true;
    }

    const conditions = media
      .toLowerCase()
      .split("and")
      .map((c) => c.trim());
    const result = conditions.every((cond) => {
      const minMatch = cond.match(/\(min-width:\s*(\d+)px\)/);
      if (minMatch) {
        const minWidth = parseInt(minMatch[1], 10);
        if (width < minWidth) return false;
        return true;
      }
      const maxMatch = cond.match(/\(max-width:\s*(\d+)px\)/);
      if (maxMatch) {
        const maxWidth = parseInt(maxMatch[1], 10);
        if (width > maxWidth) return false;
        return true;
      }
      return false;
    });

    if (debug) {
      console.log(`Media "${media}" with width ${width} matches?`, result);
    }

    return result;
  }

  const sources = Array.from(
    picture.querySelectorAll("source[srcset]")
  ) as HTMLSourceElement[];

  for (const source of sources) {
    if (debug) {
      console.log("Checking source:", source.srcset, source.media);
    }

    if (!matchesSimpleMedia(source.media, viewportWidth)) {
      if (debug) {
        console.log("Media didn't match, skipping source");
      }

      continue;
    }

    const candidates = parseSrcset(source.srcset);
    const match = findBestMatch(candidates);
    if (match) {
      if (debug) {
        console.log("Matched source:", match.url);
      }

      return match.url;
    }
  }

  const img = picture.querySelector("img");
  if (img) {
    if (debug) {
      console.log("Checking fallback img:", img.srcset, img.src);
    }

    if (img.srcset) {
      const candidates = parseSrcset(img.srcset);
      const match = findBestMatch(candidates);
      if (match) {
        if (debug) {
          console.log("Matched fallback srcset:", match.url);
        }

        return match.url;
      }
    }
    if (img.src) {
      if (debug) {
        console.log("Fallback to img.src:", img.src);
      }

      return img.src;
    }
  }

  if (debug) {
    console.log("No matching image found");
  }

  return null;
}

export function getImagesFromPicture(document: Document): ImageRef[] {
  const images: ImageRef[] = [];

  const viewportWidth = window.innerWidth;
  const devicePixelRatio = window.devicePixelRatio;

  document.querySelectorAll("picture").forEach((picture) => {
    if (!(picture instanceof HTMLPictureElement)) {
      return;
    }

    const src = selectResponsiveImageSourceFromPicture(picture, {
      viewportWidth,
      devicePixelRatio,
    });

    if (src) {
      images.push({ src });
    }
  });

  return images;
}
