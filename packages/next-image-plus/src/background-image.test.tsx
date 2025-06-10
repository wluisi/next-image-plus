/**
 * @jest-environment jsdom
 */

import * as React from "react";
import ReactDOM from "react-dom";

import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { BackgroundImage, getBackgroundImageProps } from "./background-image";

// Mock next/compat/router before importing the tested component.
jest.mock("next/compat/router", () => ({
  useRouter: jest.fn(() => null),
}));

// Spy on ReactDOM.preload
const preloadSpy = jest
  .spyOn(ReactDOM, "preload")
  .mockImplementation(() => null);

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

  it("should return background img props for single image with no media prop.", () => {
    const bgImageProps = getBackgroundImageProps([
      {
        breakpoint: "fallback",
        url: "https://picsum.photos/id/10/400/143",
        width: 400,
        height: 143,
      },
    ]);

    const fallbackImg = bgImageProps.fallback.img;
    expect(fallbackImg).not.toHaveProperty("media");

    expect(fallbackImg.src).toEqual(
      "/_next/image?url=https%3A%2F%2Fpicsum.photos%2Fid%2F10%2F400%2F143&w=828&q=75"
    );
    expect(fallbackImg.width).toEqual(400);
    expect(fallbackImg.height).toEqual(143);
  });
});

describe("BackgroundImage component tests.", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

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

    const style = window.getComputedStyle(element as Element);

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

    const style = window.getComputedStyle(element as Element);
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
    const { container } = render(
      <BackgroundImage
        id="bg-img-test-id"
        preload={true}
        images={backgroundImageDataMock}
      />
    );

    const element = container.querySelector("#bg-img-test-id") as HTMLElement;

    expect(element).toBeInTheDocument();
    expect(element?.tagName.toLowerCase()).toBe("div");
    expect(element?.id).toBe("bg-img-test-id");

    expect(preloadSpy).toHaveBeenCalledTimes(3);
  });

  it("should add preload links to document head if preload is true.", () => {
    render(
      <BackgroundImage
        id="bg-img-test"
        preload={true}
        images={backgroundImageDataMock}
      />
    );

    expect(preloadSpy).toHaveBeenCalledTimes(3);
  });

  it("should not add preload links to document head if preload is false.", () => {
    render(
      <BackgroundImage
        id="bg-img-test-no-preload"
        preload={false}
        images={backgroundImageDataMock}
      />
    );

    expect(preloadSpy).not.toHaveBeenCalled();
  });

  it("should render background image with single image and no media query.", () => {
    const { container } = render(
      <BackgroundImage
        id="bg-img-single"
        preload={true}
        images={[
          {
            breakpoint: "fallback",
            url: "https://picsum.photos/id/10/400/143",
            width: 400,
            height: 143,
          },
        ]}
      />
    );

    const element = container.querySelector("#bg-img-single") as HTMLElement;

    expect(element).toBeInTheDocument();
    expect(element?.tagName.toLowerCase()).toBe("div");
    expect(element?.id).toBe("bg-img-single");

    const style = window.getComputedStyle(element as Element);
    expect(style.backgroundImage).toBe(
      "url(/_next/image?url=https%3A%2F%2Fpicsum.photos%2Fid%2F10%2F400%2F143&w=828&q=75)"
    );

    expect(preloadSpy).toHaveBeenCalledTimes(1);
  });

  it("should throw an error if multiple images are missing required media property.", () => {
    expect(() =>
      render(
        <BackgroundImage
          id="bg-img-throw"
          preload={true}
          images={[
            {
              breakpoint: "fallback",
              url: "https://picsum.photos/id/10/500/250",
              width: 500,
              height: 250,
            },
            {
              breakpoint: "md",
              url: "https://picsum.photos/id/10/768/900",
              width: 768,
              height: 900,
            },
          ]}
        />
      )
    ).toThrow(
      'Background image with url "https://picsum.photos/id/10/500/250" is missing required "media" property. Either use a single background image, or add a media query.'
    );

    expect(preloadSpy).not.toHaveBeenCalled();
  });
});
