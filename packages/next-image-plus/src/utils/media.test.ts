import { getMediaQueries, getFallbackMediaQuery } from "./media";

describe("getMediaQueries() tests", () => {
  it("should modify media queries with single overlap.", () => {
    const items = [
      {
        uuid: "source-https://picsum.photos/id/59/860/430",
        media: "(min-width: 430px) and (max-width: 1024px)",
      },
      {
        uuid: "source-https://picsum.photos/id/59/220/220",
        media: "(min-width: 1024px)",
      },
    ];

    const mediaQueries = getMediaQueries(items);

    expect(mediaQueries).toEqual({
      "source-https://picsum.photos/id/59/860/430":
        "(min-width: 431px) and (max-width: 1023px)",
      "source-https://picsum.photos/id/59/220/220": "(min-width: 1024px)",
      "img-fallback": "(max-width: 430px)",
    });
  });

  it("should not modify media queries if there's no overlap.", () => {
    const items = [
      {
        uuid: "source-https://picsum.photos/id/59/860/430",
        media: "(min-width: 431px) and (max-width: 1023px)",
      },
      {
        uuid: "source-https://picsum.photos/id/59/220/220",
        media: "(min-width: 1024px)",
      },
      {
        uuid: "img-https://picsum.photos/id/59/430/215",
        media: "(max-width: 430px)",
      },
    ];

    const mediaQueries = getMediaQueries(items);

    expect(mediaQueries).toEqual({
      "source-https://picsum.photos/id/59/860/430":
        "(min-width: 431px) and (max-width: 1023px)",
      "source-https://picsum.photos/id/59/220/220": "(min-width: 1024px)",
      "img-https://picsum.photos/id/59/430/215": "(max-width: 430px)",
    });
  });

  it("should modify media queries with multiple overlaps", () => {
    const items = [
      {
        uuid: "fallback-https://picsum.photos/id/870/430/466",
        media: "(max-width: 430px)",
      },
      {
        uuid: "md-https://picsum.photos/id/870/768/512",
        media: "(min-width: 430px) and (max-width: 1024px)",
      },
      {
        uuid: "lg-https://picsum.photos/id/870/2560/800",
        media: "(min-width: 1024px)",
      },
    ];

    const mediaQueries = getMediaQueries(items);

    expect(mediaQueries).toEqual({
      "fallback-https://picsum.photos/id/870/430/466": "(max-width: 430px)",
      "md-https://picsum.photos/id/870/768/512":
        "(min-width: 431px) and (max-width: 1023px)",
      "lg-https://picsum.photos/id/870/2560/800": "(min-width: 1024px)",
    });
  });

  it("should not modify media queries with overlap if options: `modify` false.", () => {
    const items = [
      {
        uuid: "fallback-https://picsum.photos/id/870/430/466",
        media: "(max-width: 430px)",
      },
      {
        uuid: "md-https://picsum.photos/id/870/768/512",
        media: "(min-width: 430px) and (max-width: 1024px)",
      },
      {
        uuid: "lg-https://picsum.photos/id/870/2560/800",
        media: "(min-width: 1024px)",
      },
    ];

    const mediaQueries = getMediaQueries(items, { modify: false });

    expect(mediaQueries).toEqual({
      "fallback-https://picsum.photos/id/870/430/466": "(max-width: 430px)",
      "md-https://picsum.photos/id/870/768/512":
        "(min-width: 430px) and (max-width: 1024px)",
      "lg-https://picsum.photos/id/870/2560/800": "(min-width: 1024px)",
    });
  });

  it("should modify media queries with single overlap and options: `fallback` media query.", () => {
    const items = [
      {
        uuid: "source-https://picsum.photos/id/59/860/430",
        media: "(min-width: 430px) and (max-width: 1024px)",
      },
      {
        uuid: "source-https://picsum.photos/id/59/220/220",
        media: "(min-width: 1024px)",
      },
    ];

    const mediaQueries = getMediaQueries(items, {
      fallback: "(max-width: 430px)",
    });

    expect(mediaQueries).toEqual({
      "source-https://picsum.photos/id/59/860/430":
        "(min-width: 431px) and (max-width: 1023px)",
      "source-https://picsum.photos/id/59/220/220": "(min-width: 1024px)",
      "img-fallback": "(max-width: 430px)",
    });
  });
});

describe("getFallbackMediaQuery() tests", () => {
  it("should return a fallback media query that does not overlap.", () => {
    const items = [
      {
        uuid: "source-https://picsum.photos/id/59/860/430",
        media: "(min-width: 430px) and (max-width: 1024px)",
      },
      {
        uuid: "source-https://picsum.photos/id/59/220/220",
        media: "(min-width: 1024px)",
      },
    ];

    const fallback = getFallbackMediaQuery(items);

    expect(fallback).toEqual({
      uuid: "img-fallback",
      media: "(max-width: 430px)",
    });
  });
});
