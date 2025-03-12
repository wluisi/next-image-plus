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

/**
 * Finds the media query that applies to the smallest viewport.
 * Prioritizes `max-width` values when available; otherwise, falls back to `min-width`.
 *
 * @param {string[]} queries - An array of valid CSS media query strings.
 * @returns {string|null} The smallest media query or `null` if none are valid.
 */
export function getSmallestMediaQuery(queries: string[]) {
  return (
    queries
      .map((query) => {
        const maxMatch = query.match(/max-width:\s*(\d+)px/);
        const minMatch = query.match(/min-width:\s*(\d+)px/);

        return {
          query,
          max: maxMatch ? Number(maxMatch[1]) : Infinity,
          min: minMatch ? Number(minMatch[1]) : 0,
        };
      })
      .sort((a, b) => a.max - b.max || a.min - b.min)[0]?.query || null
  );
}

export function getBackgroundImageProps(options: BackgroundImageOptions[]): {
  images: BackgroundImageData;
} {
  const props: any = {
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
  const mediaQueries = [];
  for (const [_key, props] of Object.entries(bgImageProps)) {
    mediaQueries.push(props.media);
  }
  const fallbackMediaQuery = getSmallestMediaQuery(mediaQueries);

  const styles = [];
  for (const [_key, props] of Object.entries(bgImageProps)) {
    const url = props.img.src;

    if (props.media === fallbackMediaQuery) {
      const mediaQuery = `#${id} { background-image: url(${url}); }`;
      styles.push(mediaQuery);
    } else {
      const mediaQuery = `@media ${props.media} { #${id} { background-image: url(${url}); } }`;
      styles.push(mediaQuery);
    }
  }

  const stylesheet = styles.join(" ");

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
      },
      children
    )
  ) : (
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
