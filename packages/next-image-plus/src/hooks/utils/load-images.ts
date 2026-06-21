import { hasCachedImage, cacheImage } from "./image-cache";
import type { ImageRef } from "./types";

function loadImage(image: ImageRef): void {
  const img = new Image();
  img.src = image.src;

  if (image.srcset) {
    img.srcset = image.srcset;
  }

  if (image.sizes) {
    img.sizes = image.sizes;
  }

  img.decoding = "async";
  img.fetchPriority = "low";

  cacheImage(image.src, img);
}

export function loadImages(images: ImageRef[]): void {
  images.forEach((image, index) => {
    if (hasCachedImage(image.src)) {
      return;
    }

    // Stagger requests so they don't all fire at once.
    setTimeout(() => loadImage(image), index * 100);
  });
}
