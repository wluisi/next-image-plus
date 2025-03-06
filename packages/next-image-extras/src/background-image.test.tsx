/**
 * @jest-environment jsdom
 */

import * as React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

import {
  BackgroundImage,
  getBackgroundImageProps,
  getTailwindCssClassNames,
} from "./background-image";

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

describe("getTailwindCssClassNames tests", () => {
  it("should return correct class name string for background images.", () => {
    const classes = getTailwindCssClassNames(backgroundImageDataMock);

    expect(classes).toEqual(
      "bg-[image:var(--bg-img-fallback)] md:bg-[image:var(--bg-img-md)] lg:bg-[image:var(--bg-img-lg)]"
    );
  });
});

describe("getBackgroundImageProps tests", () => {
  it("should do something cool", () => {
    const bgImageProps = getBackgroundImageProps(backgroundImageDataMock);

    expect(bgImageProps).toHaveProperty("classNames");
    expect(bgImageProps).toHaveProperty("images");

    expect(bgImageProps.images).toHaveProperty("fallback");
    expect(bgImageProps.images).toHaveProperty("md");
    expect(bgImageProps.images).toHaveProperty("lg");

    expect(bgImageProps.images.fallback).toHaveProperty("media");
    expect(bgImageProps.images.fallback).toHaveProperty("img");

    expect(bgImageProps.images.fallback.media).toEqual("(max-width: 400px)");

    console.log(bgImageProps.images.fallback);
  });
});

describe("BackgroundImage component tests", () => {
  it("should render a div.", () => {
    const bgImageProps = getBackgroundImageProps(backgroundImageDataMock);

    const componentMock = (
      <BackgroundImage
        preload={true}
        images={bgImageProps.images}
        className="bg-image"
      />
    );

    const { container } = render(componentMock);
    const element = container.querySelector(".bg-image");

    expect(element).toBeInTheDocument();
    expect(element?.tagName.toLowerCase()).toBe("div");
  });

  it("should render a span if as prop is set to span.", () => {
    const bgImageProps = getBackgroundImageProps(backgroundImageDataMock);

    const componentMock = (
      <BackgroundImage
        as="span"
        preload={true}
        images={bgImageProps.images}
        className="bg-image"
      />
    );

    const { container } = render(componentMock);
    const element = container.querySelector(".bg-image");

    expect(element).toBeInTheDocument();
    expect(element?.tagName.toLowerCase()).toBe("span");
  });
});
