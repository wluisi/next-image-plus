/**
 * @jest-environment jsdom
 */

import * as React from "react";

import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";

import { Picture, Image, Source } from "./picture";

const PictureComponentMock = (
  <Picture preload={true}>
    <Source
      media="(min-width: 600px) and (max-width:959px)"
      src="/images/medium.jpg"
      width={400}
      height={200}
    />
    <Source
      media="(min-width: 960px)"
      src="/images/large.jpg"
      width={600}
      height={600}
    />
    <Image
      src="/images/fallback.jpg"
      width={600}
      height={600}
      alt="Mountains and a river"
      className="h-full w-full rounded-md md:rounded-lg object-cover"
    />
  </Picture>
);

describe("Picture component tests", () => {
  it("should replace fallback image src with next image url.", () => {
    const { container } = render(PictureComponentMock);

    const img = container.querySelector("picture img");
    expect(img).toHaveAttribute(
      "src",
      "/_next/image?url=%2Fimages%2Ffallback.jpg&w=1200&q=75"
    );

    // screen.debug();
  });

  it("should return correct source elements.", () => {
    const { container } = render(PictureComponentMock);

    const sourceMd = container.querySelector(
      "picture source[media='(min-width: 600px) and (max-width:959px)']"
    );

    expect(sourceMd).toHaveAttribute(
      "srcSet",
      "/_next/image?url=%2Fimages%2Fmedium.jpg&w=640&q=75 1x, /_next/image?url=%2Fimages%2Fmedium.jpg&w=828&q=75 2x"
    );

    const sourceLarge = container.querySelector(
      "picture source[media='(min-width: 960px)']"
    );
    expect(sourceLarge).toHaveAttribute(
      "srcSet",
      "/_next/image?url=%2Fimages%2Flarge.jpg&w=640&q=75 1x, /_next/image?url=%2Fimages%2Flarge.jpg&w=1200&q=75 2x"
    );
  });
});
