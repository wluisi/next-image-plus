import type { ImageRef } from "./types";

export function getImagesFromImg(document: Document): ImageRef[] {
  const images: ImageRef[] = [];

  document.querySelectorAll("img").forEach((img) => {
    // Skip imgs inside a picture element, those are handled separately.
    if (img.closest("picture")) {
      return;
    }

    if (!(img instanceof HTMLImageElement)) {
      return;
    }

    const src = img.getAttribute("src") ?? "";

    if (!src) {
      return;
    }

    const imageObj: ImageRef = { src };

    if (img.srcset) {
      imageObj.srcset = img.srcset;
    }

    if (img.sizes) {
      imageObj.sizes = img.sizes;
    }

    images.push(imageObj);
  });

  return images;
}
