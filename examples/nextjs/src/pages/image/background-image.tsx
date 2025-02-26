import * as React from "react";
import { default as NextLink } from "next/link";

import { getBackgroundImageProps, BackgroundImage } from "next-image-extras";

interface HeroProps {
  children: React.ReactNode;
}

export function Hero({ children }: HeroProps) {
  const bgImageProps = getBackgroundImageProps([
    {
      breakpoint: "fallback",
      media: "(max-width: 430px)",
      imageProps: {
        src: "https://picsum.photos/id/10/430/215",
        width: 430,
        height: 215,
        priority: true,
      },
    },
    {
      breakpoint: "md",
      // media: "(min-width: 431px) and (max-width: 768px)",
      media: "(min-width: 768px) and (max-width: 1023px)",
      imageProps: {
        src: "https://picsum.photos/id/10/767/274",
        width: 767,
        height: 274,
        priority: true,
      },
    },
    {
      breakpoint: "lg",
      media: "(min-width: 1024px)",
      imageProps: {
        src: "https://picsum.photos/id/10/3360/1200",
        width: 3360,
        height: 1200,
        priority: true,
      },
    },
  ]);

  const bgImgBaseClasses =
    "hero-image bg-[auto_300px] bg-[50%_0] bg-no-repeat md:bg-cover h-0 pb-[600px]";

  const bgImgBreakpointClasses =
    "bg-[image:var(--bg-img-fallback)] md:bg-[image:var(--bg-img-md)] lg:bg-[image:var(--bg-img-lg)]";

  return (
    <div className="hero">
      <BackgroundImage
        data={bgImageProps}
        className={`${bgImgBaseClasses} ${bgImgBreakpointClasses}`}
      >
        <div className="inner md:relative p-0 h-auto pt-[300px] md:h-[600px] max-w-5xl m-auto">
          <div className="overlay-content md:absolute md:top-[72px] md:left-0 p-5 bg-teal-600 text-white md:w-[400px]">
            {children}
          </div>
        </div>
      </BackgroundImage>
    </div>
  );
}

export default function ImagePagesBackgroundImage() {
  return (
    <>
      <Hero>
        <h1 className="text-4xl font-bold mb-5">Hero with background image</h1>
        <p>
          You can even convert the srcSet string to the image-set() CSS function
          to optimize a background image.
        </p>
      </Hero>
      <div>
        <div
          id="main-content"
          className="container mx-auto pt-10 pb-10 max-w-5xl"
        >
          <h1>Next Image Extras: NextJS Example App</h1>
          <NextLink href="/blog">Blog Collection (Pages Dir)</NextLink>
          <NextLink href="/event">Event Collection (App Dir)</NextLink>
          <NextLink href="/press">Press Collection (Pages Dir)</NextLink>
        </div>
      </div>
    </>
  );
}
