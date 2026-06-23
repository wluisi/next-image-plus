import { describe, it, expect, afterEach } from "vitest";
import {
  selectResponsiveImageSourceFromPicture,
  getImagesFromPicture,
} from "./get-images-from-picture";

const htmlMock = `
<html>
  <div>
    <picture>
      <source
        srcset="https://picsum.photos/id/59/860/430"
        media="(min-width: 431px) and (max-width: 1023px)"
        width="860"
        height="430"
      />
      <source
        srcset="https://picsum.photos/id/59/220/220"
        media="(min-width: 1024px)"
        width="220"
        height="220"
      />
      <img
        src="https://picsum.photos/id/59/430/215"
        alt="Fallback image"
        width="430"
        height="215"
      />
    </picture>
  </div>
</html>
`;

function createPictureElement() {
  const container = document.createElement("div");
  container.innerHTML = htmlMock;

  return container.querySelector("picture")!;
}

describe("selectResponsiveImageSourceFromPicture()", () => {
  it("should select the fallback image for viewport width 430.", () => {
    const picture = createPictureElement();

    const url = selectResponsiveImageSourceFromPicture(picture, {
      viewportWidth: 430,
      devicePixelRatio: 1,
    });

    expect(url).toBe("https://picsum.photos/id/59/430/215");
  });

  it("should select the medium image for viewport width 800.", () => {
    const picture = createPictureElement();

    const url = selectResponsiveImageSourceFromPicture(picture, {
      viewportWidth: 800,
      devicePixelRatio: 1,
    });

    expect(url).toBe("https://picsum.photos/id/59/860/430");
  });

  it("should select the large image for viewport width 1200.", () => {
    const picture = createPictureElement();

    const url = selectResponsiveImageSourceFromPicture(picture, {
      viewportWidth: 1200,
      devicePixelRatio: 1,
    });

    expect(url).toBe("https://picsum.photos/id/59/220/220");
  });

  it("should select the large image for viewport width 1025 (edge case).", () => {
    const picture = createPictureElement();

    const url = selectResponsiveImageSourceFromPicture(picture, {
      viewportWidth: 1025,
      devicePixelRatio: 1,
    });

    expect(url).toBe("https://picsum.photos/id/59/220/220");
  });

  // Variations
  it("should select medium image with width descriptors in srcset.", () => {
    const html = `
      <picture>
        <source
          srcset="https://picsum.photos/id/59/860/430 860w, https://picsum.photos/id/59/430/215 430w"
          media="(min-width: 431px) and (max-width: 1023px)"
        />
        <img
          src="https://picsum.photos/id/59/430/215"
          alt="Fallback image"
        />
      </picture>
    `;

    const container = document.createElement("div");
    container.innerHTML = html;

    const picture = container.querySelector("picture")!;

    const url = selectResponsiveImageSourceFromPicture(picture, {
      viewportWidth: 600,
      devicePixelRatio: 1,
    });

    expect(url).toBe("https://picsum.photos/id/59/860/430");
  });

  it("should select large image with pixel density descriptors in srcset.", () => {
    const html = `
      <picture>
        <source
          srcset="https://picsum.photos/id/59/220/220 1x, https://picsum.photos/id/59/440/440 2x"
          media="(min-width: 1024px)"
        />
        <img
          src="https://picsum.photos/id/59/430/215"
          alt="Fallback image"
        />
      </picture>
    `;

    const container = document.createElement("div");
    container.innerHTML = html;

    const picture = container.querySelector("picture")!;

    const url = selectResponsiveImageSourceFromPicture(picture, {
      viewportWidth: 1300,
      devicePixelRatio: 2,
    });

    expect(url).toBe("https://picsum.photos/id/59/440/440");
  });

  it("should fallback to img src if no srcset matches.", () => {
    const html = `
      <picture>
        <source
          srcset="https://picsum.photos/id/59/860/430 860w"
          media="(min-width: 431px) and (max-width: 1023px)"
        />
        <img
          src="https://picsum.photos/id/59/430/215"
          alt="Fallback image"
        />
      </picture>
    `;

    const container = document.createElement("div");
    container.innerHTML = html;

    const picture = container.querySelector("picture")!;

    const url = selectResponsiveImageSourceFromPicture(picture, {
      viewportWidth: 1100,
      devicePixelRatio: 1,
    });

    expect(url).toBe("https://picsum.photos/id/59/430/215");
  });

  it("should select correct images from multiple picture elements", () => {
    const html = `
      <div>
        <picture>
          <source srcset="http://localhost:3000/small1.jpg" media="(max-width: 500px)" />
          <img src="http://localhost:3000/fallback1.jpg" />
        </picture>
        <picture>
          <source srcset="http://localhost:3000/small2.jpg" media="(max-width: 300px)" />
          <source srcset="http://localhost:3000/medium2.jpg" media="(min-width: 301px) and (max-width: 700px)" />
          <img src="http://localhost:3000/fallback2.jpg" />
        </picture>
      </div>
    `;

    document.body.innerHTML = html;

    const pictures = Array.from(document.querySelectorAll("picture"));

    const results = pictures.map((pic) =>
      selectResponsiveImageSourceFromPicture(pic, {
        viewportWidth: 600,
        devicePixelRatio: 1,
      })
    );

    expect(results[0]).toBe("http://localhost:3000/fallback1.jpg"); // max-width 500px not matched, fallback used
    expect(results[1]).toBe("http://localhost:3000/medium2.jpg"); // matches second source media query
  });
});

describe("getImagesFromPicture()", () => {
  afterEach(() => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 1024,
    });
  });

  it("should return the fallback img src for mobile viewport.", () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 320,
    });
    const doc = new DOMParser().parseFromString(htmlMock, "text/html");
    const images = getImagesFromPicture(doc);
    expect(images.map((i) => i.src)).toContain(
      "https://picsum.photos/id/59/430/215"
    );
  });

  it("should return the correct source for desktop viewport.", () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 1500,
    });
    const doc = new DOMParser().parseFromString(htmlMock, "text/html");
    const images = getImagesFromPicture(doc);
    expect(images.map((i) => i.src)).toContain(
      "https://picsum.photos/id/59/220/220"
    );
    expect(images.map((i) => i.src)).not.toContain(
      "https://picsum.photos/id/59/860/430"
    );
    expect(images.map((i) => i.src)).not.toContain(
      "https://picsum.photos/id/59/430/215"
    );
  });
});
