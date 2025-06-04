import { getMediaQueries, getFallbackMediaQuery } from "./media";

describe("getMediaQueries() tests", () => {
  it("should return modified media queries if there's overlap.", () => {
    const items = [
      {
        uuid: "source-https://picsum.photos/id/59/860/430",
        media: "(min-width: 430px) and (max-width: 1024px)",
      },
      {
        uuid: "source-https://picsum.photos/id/59/220/220",
        media: "(min-width: 1024px)",
      },
      // {
      //   uuid: "img-https://picsum.photos/id/59/430/215",
      //   media: "(max-width: 430px)",
      // },
    ];

    const mediaQueries = getMediaQueries(items);

    // console.log("mediaQueries", mediaQueries);

    expect(mediaQueries).toEqual({
      "source-https://picsum.photos/id/59/860/430":
        "(min-width: 431px) and (max-width: 1023px)",
      "source-https://picsum.photos/id/59/220/220": "(min-width: 1024px)",
      // "img-https://picsum.photos/id/59/430/215": "(max-width: 430px)",
      "img-fallback": "(max-width: 430px)",
    });
  });

  it("should return media queries as is if there's no overlap.", () => {
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
});

describe("getFallbackMediaQuery() tests", () => {
  it("should return a non overlap fallback media query.", () => {
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
    // console.log("fallback", fallback);

    expect(fallback).toEqual({
      uuid: "img-fallback",
      media: "(max-width: 430px)",
    });

    // console.log("mediaQueries", mediaQueries);

    // expect(mediaQueries).toEqual({
    //   "source-https://picsum.photos/id/59/860/430":
    //     "(min-width: 431px) and (max-width: 1023px)",
    //   "source-https://picsum.photos/id/59/220/220": "(min-width: 1024px)",
    //   "img-https://picsum.photos/id/59/430/215": "(max-width: 430px)",
    // });
  });
});
