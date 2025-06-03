import { getMediaQueries } from "./media";

describe("getMediaQueries() tests", () => {
  it("should do something.", () => {
    const items = [
      {
        id: "source-https://picsum.photos/id/59/860/430",
        media: "(min-width: 430px) and (max-width: 1024px)",
      },
      {
        id: "source-https://picsum.photos/id/59/220/220",
        media: "(min-width: 1024px)",
      },
      {
        id: "img-https://picsum.photos/id/59/430/215",
        media: "(max-width: 430px)",
      },
    ];

    const mediaQueries = getMediaQueries(items);

    console.log(mediaQueries);

    expect(mediaQueries).toEqual({
      "img-https://picsum.photos/id/59/430/215": "(max-width: 430px)",
      "source-https://picsum.photos/id/59/860/430":
        "(min-width: 431px) and (max-width: 1024px)",
      "source-https://picsum.photos/id/59/220/220": "(min-width: 1025px)",
    });
  });
});

// @todo
// - figure out how to generate the fallback media query from the source media queries.
// - test functions in preload.
// - update picture example to use new function (in component media queries can overlap) and add 2nd example pg where fallbackMedia and non-overlapping media queries are used.
