import * as React from "react";

import {
  getImageProps as getNextImageProps,
  type ImageProps as NextImageProps,
} from "next/image";

import { PreloadImageLink } from "./preload";

type BackgroundImageOptions = Omit<NextImageProps, "alt" | "src"> & {
  breakpoint: string;
  media: string;
  url: string;
};

type BackgroundImageData = {
  [key: string]: {
    media: string;
    img: NextImageProps;
  };
};

export function getTailwindCssClassNames(options: BackgroundImageOptions[]) {
  let classNames = "";

  for (const { breakpoint } of options) {
    const cssVar = `--bg-img-${breakpoint}`;
    // If fallback, then don't add prefix to class name.
    if (breakpoint === "fallback") {
      classNames = `bg-[image:var(${cssVar})]`;
    } else {
      classNames = `${classNames} ${breakpoint}:bg-[image:var(${cssVar})]`;
    }
  }

  return classNames;
}

export function getBackgroundImageProps(options: BackgroundImageOptions[]): {
  classNames: string;
  images: BackgroundImageData;
} {
  const props: any = {
    classNames: getTailwindCssClassNames(options),
    images: {},
  };

  for (const { breakpoint, media, url, width, height } of options) {
    const nextImage = getNextImageProps({
      alt: "background-image",
      src: url,
      width: width,
      height: height,
    });

    props.images[breakpoint] = {
      media,
      img: nextImage.props,
    };
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

interface BackgroundImageProps {
  as?: React.ElementType;
  images: BackgroundImageData;
  preload?: boolean;
  className: string;
  children?: React.ReactNode;
}

export function BackgroundImage({
  as = null,
  preload = false,
  images,
  className,
  children,
}: BackgroundImageProps) {
  const classNames = `next-background-image ${className}`;
  const styleProps = getStyleProps(images);

  // Format the in the format needed for the preloaded.
  const preloadData = [];
  for (const [_key, value] of Object.entries(images)) {
    preloadData.push({
      ...value.img,
      media: value.media,
      fetchPriority: preload ? "high" : "auto",
    });
  }

  // If as prop is passed, create the react component, other default to div.
  const component = as ? (
    React.createElement(
      as,
      {
        className: classNames,
        style: styleProps,
      },
      children
    )
  ) : (
    <div className={classNames} style={styleProps}>
      {children}
    </div>
  );

  return (
    <>
      {component}
      {preload ? <PreloadImageLink data={preloadData} /> : null}
    </>
  );
}
