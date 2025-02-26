/**
 * @jest-environment jsdom
 */

import * as React from "react";

// eslint-disable-next-line import/no-extraneous-dependencies
import "@testing-library/jest-dom";

// eslint-disable-next-line import/no-extraneous-dependencies
import { render, screen } from "@testing-library/react";

import { Picture, Image, Source } from "./picture";

describe("Picture tests", () => {
  it("should return an image element if as is omitted", () => {
    render(
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
          sizes="50vw"
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

    screen.debug();
  });
});
