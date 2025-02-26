import * as React from "react";

import {
  getImageProps as getNextImageProps,
  type ImageProps as NextImageProps,
} from "next/image";

import { PreloadImageLink } from "./preload";

type BackgroundImageOptions = {
  breakpoint: string;
  media: string;
  imageProps: Omit<NextImageProps, "alt">;
};

type BackgroundImageData = {
  [key: string]: {
    media: string;
    img: NextImageProps;
  };
};

// type BackgroundImage

export function getBackgroundImageProps(
  options: BackgroundImageOptions[]
): BackgroundImageData {
  const props: any = {};

  for (const { breakpoint, media, imageProps } of options) {
    const nextImage = getNextImageProps({
      alt: "background-image",
      ...imageProps,
    });

    // @todo this should also return the css var for this breakpoint
    // cssVar: '--bg-img-fallback'
    // This can be used then inside a consuming component
    // bgImageProps.md.cssVar
    props[breakpoint] = { media, img: nextImage.props };
  }

  return props;
}

// {
//   "--bg-img-fallback": `url(${backgroundImageProps.fallback.src})`,
//   "--bg-img-md": `url(${backgroundImageProps.md.src})`,
//   "--bg-img-lg": `url(${backgroundImageProps.lg.src})`,
// } as React.CSSProperties
function getStyleProps(data: BackgroundImageData): React.CSSProperties {
  const cssVars: React.CSSProperties = {};

  for (const [key, value] of Object.entries(data)) {
    const name = `--bg-img-${key}`;
    cssVars[name] = `url(${value.img.src})`;
  }

  return cssVars;
}

interface NextBackgroundImageProps {
  data: BackgroundImageData;
  preload?: boolean;
  className: string;
  children: React.ReactNode;
}

export function NextBackgroundImage({
  data,
  preload = true,
  className,
  children,
}: NextBackgroundImageProps) {
  const styleProps = getStyleProps(data);

  // Format the in the format needed for the preloaded.
  const preloadData = [];
  for (const [_key, value] of Object.entries(data)) {
    preloadData.push({ ...value.img, media: value.media });
  }

  return (
    <>
      <div className={`next-background-image ${className}`} style={styleProps}>
        {children}
      </div>
      {preload ? <PreloadImageLink data={preloadData} /> : null}
    </>
  );
}
