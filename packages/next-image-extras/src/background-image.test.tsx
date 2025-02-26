import { getBackgroundImageProps } from "./background-image";

describe("getBackgroundImageProps tests", () => {
  it("should do something cool", () => {
    const props = getBackgroundImageProps([
      {
        breakpoint: "fallback",
        media: "(max-width: 400px)",
        imageProps: {
          src: "https://picsum.photos/id/10/400/143",
          width: 400,
          height: 143,
          priority: true,
        },
      },
      {
        breakpoint: "md",
        media: "(min-width: 431px) and (max-width: 767px)",
        imageProps: {
          src: "https://picsum.photos/id/10/767/274",
          width: 767,
          height: 274,
          priority: true,
        },
      },
      {
        breakpoint: "lg",
        media: "(min-width: 768px)",
        imageProps: {
          src: "https://picsum.photos/id/10/3360/1200",
          width: 3360,
          height: 1200,
          priority: true,
        },
      },
    ]);

    console.log(props);
  });
});
