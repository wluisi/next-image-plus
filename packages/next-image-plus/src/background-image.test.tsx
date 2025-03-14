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
  it("should do something cool", () => {
    const bgImageProps = getBackgroundImageProps(backgroundImageDataMock);

    expect(bgImageProps).toHaveProperty("fallback");
    expect(bgImageProps).toHaveProperty("md");
    expect(bgImageProps).toHaveProperty("lg");

    expect(bgImageProps.fallback).toHaveProperty("media");
    expect(bgImageProps.fallback).toHaveProperty("img");

    expect(bgImageProps.fallback.media).toEqual("(max-width: 400px)");

    console.log(bgImageProps.fallback);
  });
});

describe("BackgroundImage component tests", () => {
  it("should render a div.", () => {
    const componentMock = (
      <BackgroundImage
        id="examples__background-image"
        preload={true}
        images={backgroundImageDataMock}
        className="bg-image"
      />
    );

    const { container } = render(componentMock);
    const element = container.querySelector(".bg-image");

    expect(element).toBeInTheDocument();
    expect(element?.tagName.toLowerCase()).toBe("div");
  });

  it("should render a span if as prop is set to span.", () => {
    const componentMock = (
      <BackgroundImage
        id="examples__background-image"
        as="span"
        preload={true}
        images={backgroundImageDataMock}
        className="bg-image"
      />
    );

    const { container } = render(componentMock);
    const element = container.querySelector(".bg-image");

    expect(element).toBeInTheDocument();
    expect(element?.tagName.toLowerCase()).toBe("span");
  });

  it("should render a div with style prop", () => {
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
});
