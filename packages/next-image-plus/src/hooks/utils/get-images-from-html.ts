import type { ImageRef } from "./types";
import { getImagesFromImg } from "./get-images-from-img";
import { getImagesFromPicture } from "./get-images-from-picture";

export function getImagesFromHtml(html: string): ImageRef[] {
  const document = new DOMParser().parseFromString(html, "text/html");

  const imgImages = getImagesFromImg(document);
  const pictureImages = getImagesFromPicture(document);

  // Dedup across both sources by src.
  const loaded = new Set<string>();
  const images: ImageRef[] = [];

  [...imgImages, ...pictureImages].forEach((image) => {
    if (loaded.has(image.src)) {
      return;
    }

    loaded.add(image.src);
    images.push(image);
  });

  return images;
}
