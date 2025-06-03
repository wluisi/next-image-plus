import { getMediaQueries } from "./media";

describe("getMediaQueries() tests", () => {
  it("should return modified media queries without overlap.", () => {
    const items = [
      {
        uuid: "source-https://picsum.photos/id/59/860/430",
        media: "(min-width: 430px) and (max-width: 1024px)",
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
      "img-https://picsum.photos/id/59/430/215": "(max-width: 430px)",
      "source-https://picsum.photos/id/59/860/430":
        "(min-width: 431px) and (max-width: 1024px)",
      "source-https://picsum.photos/id/59/220/220": "(min-width: 1025px)",
    });
  });
});
