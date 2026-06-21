import { getImagesFromHtml } from "./get-images-from-html";
import { loadImages } from "./load-images";

export async function fetchPage(url: string): Promise<void> {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      return;
    }

    const html = await response.text();
    const images = getImagesFromHtml(html);

    loadImages(images);
  } catch (err) {
    console.error("fetchPage failed:", err);
  }
}
