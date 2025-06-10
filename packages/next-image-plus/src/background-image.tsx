import * as React from "react";

import {
  getImageProps as getNextImageProps,
  type ImageProps as NextImageProps,
} from "next/image";
import { getMediaQueries } from "./utils/media";
import { PreloadImageLink } from "./preload";

type BackgroundImageOptions = Omit<NextImageProps, "alt" | "src"> & {
  breakpoint: string;
  media?: string;
  url: string;
};

interface BackgroundImageData {
  [key: string]: {
    media?: string;
    img: NextImageProps & { srcSet: string };
  };
}

/**
 * Finds the media query that applies to the smallest viewport.
 * Prioritizes `max-width` values when available; otherwise, falls back to `min-width`.
 *
 * @param queries - An array of valid CSS media query strings.
 * @returns The smallest media query or `null` if none are valid.
 */
export function getSmallestMediaQuery(queries: string[]): string | null {
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

/**
 * Generates background image properties for different breakpoints.
 *
 * @param options - An array of background image options.
 * @returns An object mapping breakpoints to their corresponding media query and image properties.
 */
export function getBackgroundImageProps(
  options: BackgroundImageOptions[],
  normalizeMediaQueries?: boolean
): BackgroundImageData {
  const props: BackgroundImageData = {};

  let mediaQueriesFinal = null;
  // We only need media queries if there's more than 1 image.
  if (options.length > 1) {
    const mediaQueries = [];
    for (const { breakpoint, media, url } of options) {
      if (!media) {
        throw new Error(
          `Background image with url "${url}" is missing required "media" property. Either use a single background image, or add a media query.`
        );
      }

      mediaQueries.push({
        uuid: `${breakpoint}-${url}`,
        media: media,
      });
    }
    mediaQueriesFinal = getMediaQueries(mediaQueries, {
      normalize: normalizeMediaQueries,
    });
  }

  for (const { breakpoint, url, width, height } of options) {
    const nextImage = getNextImageProps({
      // Background images don't need an alt, but is required.
      alt: "",
      src: url,
      width: width,
      height: height,
    });

    props[breakpoint] = {
      ...(mediaQueriesFinal && {
        media: mediaQueriesFinal[`${breakpoint}-${url}`],
      }),
      img: nextImage.props,
    };
  }

  return props;
}

interface StyleProps {
  /** The id of the html element, for generating the responsive styles. */
  id: string;
  /** A unique id for the <style> element. Allows React to de-duplicate styles that have the same href. */
  href?: string;
  /** An object mapping breakpoints to their corresponding media query and image properties. */
  bgImageProps: BackgroundImageData;
}

/**
 * Generates and applies responsive background image styles. Only supported in React 19.
 *
 * @see https://react.dev/reference/react-dom/components/style
 * @see https://react.dev/reference/react-dom/components/style#rendering-an-inline-css-stylesheet
 *
 * @returns A `<style>` element containing the computed background image CSS rules.
 */
export function Style({ id, bgImageProps }: StyleProps) {
  let fallbackMediaQuery = null;
  // We only need media queries if there's more than 1 image.
  if (Object.keys(bgImageProps).length > 1) {
    // Get the smallest media query as the fallback.
    const mediaQueries = [];
    for (const [_key, props] of Object.entries(bgImageProps)) {
      if (!props.media) {
        throw new Error(
          `Background image with src "${props.img.src}" is missing required "media" property. Either use a single background image, or add a media query.`
        );
      }

      mediaQueries.push(props.media);
    }
    fallbackMediaQuery = getSmallestMediaQuery(mediaQueries);
  }

  // Generate the responsive styles with media queries based on the image options.
  const styles = [];
  for (const [_key, props] of Object.entries(bgImageProps)) {
    const url = props.img.src;

    if (fallbackMediaQuery === null || props.media === fallbackMediaQuery) {
      const fallbackStyle = `#${id} { background-image: url(${url}); }`;
      styles.push(fallbackStyle);
    } else {
      const mediaQuery = `@media ${props.media} { #${id} { background-image: url(${url}); } }`;
      styles.push(mediaQuery);
    }
  }

  const stylesheet = styles.join(" ");

  return (
    <style
      // `href` is a unique id for the <style> element. It will get added to dom as `data-href`.
      // This allows React to de-duplicate styles that have the same href.
      href={id}
      // If set to "high", this tells react where to place the style sheet in the <head> element.
      // If omitted, the <style> element will not get hoisted to the `<head>`.
      precedence="high"
    >
      {stylesheet}
    </style>
  );
}

export interface BackgroundImageProps {
  /** A unique id for the background image html element. */
  id: string;
  /** The HTML tag or React component to use as the wrapper. Defaults to `<div>`. */
  as?: React.ElementType;
  /** Whether to preload the background images. Defaults to `false`. */
  preload?: boolean;
  /** An array of background image options for different breakpoints. */
  images: BackgroundImageOptions[];
  /** An optional class name for styling. */
  className?: string;
  /** An optional style prop, for passing css properties. */
  style?: React.CSSProperties;
  /** Optional child elements to render inside the component. */
  children?: React.ReactNode;
  /** Enables or disables media query normalization to remove overlaps Defaults to `true`. */
  normalizeMediaQueries?: boolean;
}

/**
 * Renders a background image component with support for responsive images and optional preloading.
 *
 * @returns A React component rendering the background image and optional preloading links.
 */
export function BackgroundImage({
  id,
  as = null,
  preload = false,
  images,
  className,
  style,
  children,
  normalizeMediaQueries = true,
}: BackgroundImageProps) {
  const bgImageProps = getBackgroundImageProps(images, normalizeMediaQueries);

  // Format the data for the preloader.
  const preloadData = [];
  for (const [_key, value] of Object.entries(bgImageProps)) {
    preloadData.push({
      ...value.img,
      media: value.media ? value.media : null,
      fetchPriority: preload ? "high" : "auto",
    });
  }

  // If `as` prop is passed, create the react element, other default to `<div>`.
  const element = as ? (
    React.createElement(
      as,
      {
        id: id,
        className: className,
        style: style,
      },
      children
    )
  ) : (
    <div id={id} className={className} style={style}>
      {children}
    </div>
  );

  return (
    <>
      <Style id={id} bgImageProps={bgImageProps} />
      {element}
      {preload ? <PreloadImageLink data={preloadData} /> : null}
    </>
  );
}
