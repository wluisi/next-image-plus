import {
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

    console.log(bgImageProps);
  });
});
