// "use client";

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
  images: BackgroundImageOptions[];
  preload?: boolean;
  className: string;
  children?: React.ReactNode;
}

type StyleProps = {
  id: string;
  bgImageProps: BackgroundImageData;
};

// @todo this approach will only work w/ React 19.
// @see https://react.dev/reference/react-dom/components/style#rendering-an-inline-css-stylesheet
function Style({ id, bgImageProps }: StyleProps) {
  // const styles = "p { color: red !important; }";

  // const styles = images
  //   .map((color, index) => `#${id} .color-${index}: \{ color: "${color}"; \}`)
  //   .join();

  const stylesArray = [];
  for (const [key, props] of Object.entries(bgImageProps)) {
    console.log(props);

    const cssVar = `--bg-img-${key}`;
    const url = props.img.src;
    // styles = `url(${value.img.src})`;

    // const mediaQuery = `@media ${props.media} { #${id} { background-image: var(${cssVar}); } }`;
    // @todo this has to be dynamic, figure out why the fallback doesn't work if it has a breakpoint.
    if (props.media === "(max-width: 430px)") {
      const mediaQuery = `#${id} { background-image: url(${url}); }`;
      stylesArray.push(mediaQuery);
    } else {
      const mediaQuery = `@media ${props.media} { #${id} { background-image: url(${url}); } }`;
      stylesArray.push(mediaQuery);
    }
  }

  const stylesheet = stylesArray.join(" ");

  // href={id} precedence="high"
  return (
    <style href={id} precedence="high">
      {stylesheet}
    </style>
  );
}

export function BackgroundImage({
  as = null,
  preload = false,
  images,
  className,
  children,
}: BackgroundImageProps) {
  const id = "next-image-plus__background-image";
  const bgImageProps = getBackgroundImageProps(images);

  const classNames = `next-background-image ${className}`;
  const styleProps = getStyleProps(bgImageProps.images);

  // Format the in the format needed for the preloaded.
  const preloadData = [];
  for (const [_key, value] of Object.entries(bgImageProps.images)) {
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
        id: id,
        className: classNames,
        // style: styleProps,
      },
      children
    )
  ) : (
    // <div id={id} className={classNames} style={styleProps}>
    <div id={id} className={classNames}>
      {children}
    </div>
  );

  return (
    <>
      <Style id={id} bgImageProps={bgImageProps.images} />
      {component}
      {preload ? <PreloadImageLink data={preloadData} /> : null}
    </>
  );
}
