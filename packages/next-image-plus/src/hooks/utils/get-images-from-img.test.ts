import { describe, it, expect } from "vitest";
import { getImagesFromImg } from "./get-images-from-img";

describe("getImagesFromImg()", () => {
  it("should return standalone <img> elements.", () => {
    const html = `<div><img src="https://localhost:3000/footer-img.jpg" /></div>`;
    const doc = new DOMParser().parseFromString(html, "text/html");
    const images = getImagesFromImg(doc);
    expect(images.map((i) => i.src)).toContain(
      "https://localhost:3000/footer-img.jpg"
    );
  });

  it("should skip <img> elements nested inside <picture>.", () => {
    const html = `
      <picture>
        <source srcset="https://picsum.photos/id/59/860/430" media="(min-width: 431px)" />
        <img src="https://picsum.photos/id/59/430/215" alt="Fallback image" />
      </picture>
    `;
    const doc = new DOMParser().parseFromString(html, "text/html");
    const images = getImagesFromImg(doc);
    expect(images).toHaveLength(0);
  });

  it("should include srcset and sizes when present.", () => {
    const html = `
      <img
        src="https://localhost:3000/img.jpg"
        srcset="https://localhost:3000/img-2x.jpg 2x"
        sizes="(max-width: 600px) 100vw"
      />
    `;
    const doc = new DOMParser().parseFromString(html, "text/html");
    const images = getImagesFromImg(doc);
    expect(images[0]).toMatchObject({
      src: "https://localhost:3000/img.jpg",
      srcset: "https://localhost:3000/img-2x.jpg 2x",
      sizes: "(max-width: 600px) 100vw",
    });
  });

  it("should skip <img> elements with no src.", () => {
    const html = `<img alt="no src" />`;
    const doc = new DOMParser().parseFromString(html, "text/html");
    const images = getImagesFromImg(doc);
    expect(images).toHaveLength(0);
  });
});
