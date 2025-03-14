/**
 * @jest-environment jsdom
 */

import * as React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { BackgroundImage, getBackgroundImageProps } from "./background-image";

const backgroundImageDataMock = [
  {
    breakpoint: "fallback",
    media: "(max-width: 400px)",
    url: "https://picsum.photos/id/10/400/143",
    width: 400,
    height: 143,
    priority: true,
  },
  {
    breakpoint: "md",
    media: "(min-width: 431px) and (max-width: 767px)",
    url: "https://picsum.photos/id/10/767/274",
    width: 767,
    height: 274,
  },
  {
    breakpoint: "lg",
    media: "(min-width: 768px)",
    url: "https://picsum.photos/id/10/3360/1200",
    width: 3360,
    height: 1200,
    priority: true,
  },
];

describe("getBackgroundImageProps tests", () => {
  it("should return background img props.", () => {
    const bgImageProps = getBackgroundImageProps(backgroundImageDataMock);

    const breakpoints = ["fallback", "md", "lg"];
    breakpoints.forEach((breakpoint) => {
      expect(bgImageProps).toHaveProperty(breakpoint);

      expect(bgImageProps[breakpoint]).toHaveProperty("media");
      expect(bgImageProps[breakpoint]).toHaveProperty("img");

      const img = bgImageProps[breakpoint].img;
      expect(img).toHaveProperty("alt");
      expect(img).toHaveProperty("loading");
      expect(img).toHaveProperty("width");
      expect(img).toHaveProperty("height");
      expect(img).toHaveProperty("srcSet");
    });

    expect(bgImageProps.fallback.media).toEqual("(max-width: 400px)");

    const fallbackImg = bgImageProps.fallback.img;
    expect(fallbackImg.srcSet).toEqual(
      "/_next/image?url=https%3A%2F%2Fpicsum.photos%2Fid%2F10%2F400%2F143&w=640&q=75 1x, /_next/image?url=https%3A%2F%2Fpicsum.photos%2Fid%2F10%2F400%2F143&w=828&q=75 2x"
    );
    expect(fallbackImg.width).toEqual(400);
    expect(fallbackImg.height).toEqual(143);
  });
});

describe("BackgroundImage component tests", () => {
  it("should render a div with a background image.", () => {
    const componentMock = (
      <BackgroundImage
        id="bg-img-test"
        preload={true}
        images={backgroundImageDataMock}
      />
    );

    const { container } = render(componentMock);
    const element = container.querySelector("#bg-img-test");

    expect(element).toBeInTheDocument();
    expect(element?.tagName.toLowerCase()).toBe("div");

    const style = window.getComputedStyle(element);

    expect(style.backgroundImage).toBe(
      "url(/_next/image?url=https%3A%2F%2Fpicsum.photos%2Fid%2F10%2F400%2F143&w=828&q=75)"
    );
  });

  it("should render a span with a background image.", () => {
    const componentMock = (
      <BackgroundImage
        id="bg-img-test"
        as="span"
        preload={true}
        images={backgroundImageDataMock}
      />
    );

    const { container } = render(componentMock);
    const element = container.querySelector("#bg-img-test");

    expect(element).toBeInTheDocument();
    expect(element?.tagName.toLowerCase()).toBe("span");

    const style = window.getComputedStyle(element);
    expect(style.backgroundImage).toBe(
      "url(/_next/image?url=https%3A%2F%2Fpicsum.photos%2Fid%2F10%2F400%2F143&w=828&q=75)"
    );
  });

  it("should render a div with style prop.", () => {
    const componentMock = (
      <BackgroundImage
        id="bg-img-test"
        preload={true}
        images={backgroundImageDataMock}
        style={{ color: "red" }}
      />
    );

    const { container } = render(componentMock);
    const element = container.querySelector("#bg-img-test") as HTMLElement;

    expect(element).toBeInTheDocument();
    expect(element?.tagName.toLowerCase()).toBe("div");

    expect(element?.style.color).toBe("red");
  });

  it("should render a div with a className prop.", () => {
    const componentMock = (
      <BackgroundImage
        id="bg-img-test"
        preload={true}
        images={backgroundImageDataMock}
        className="test-class"
      />
    );

    const { container } = render(componentMock);
    const element = container.querySelector("#bg-img-test") as HTMLElement;

    expect(element).toBeInTheDocument();
    expect(element?.tagName.toLowerCase()).toBe("div");

    expect(element?.className).toBe("test-class");
  });

  it("should render a div with an id prop.", () => {
    const componentMock = (
      <BackgroundImage
        id="bg-img-test"
        preload={true}
        images={backgroundImageDataMock}
      />
    );

    const { container } = render(componentMock);
    const element = container.querySelector("#bg-img-test") as HTMLElement;

    expect(element).toBeInTheDocument();
    expect(element?.tagName.toLowerCase()).toBe("div");

    expect(element?.id).toBe("bg-img-test");
  });
});
