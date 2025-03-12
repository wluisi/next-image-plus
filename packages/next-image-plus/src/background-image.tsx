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

interface BackgroundImageData {
  [key: string]: {
    media: string;
    img: NextImageProps;
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
  options: BackgroundImageOptions[]
): BackgroundImageData {
  const props: BackgroundImageData = {};

  for (const { breakpoint, media, url, width, height } of options) {
    const nextImage = getNextImageProps({
      // Background images don't need an alt, but is required.
      alt: "",
      src: url,
      width: width,
      height: height,
    });

    props[breakpoint] = {
      media,
      img: nextImage.props,
    };
  }

  return props;
}

// @todo figure out these props
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
function Style({ id, bgImageProps }: StyleProps) {
  // Get the smallest media query as the fallback.
  const mediaQueries = [];
  for (const [_key, props] of Object.entries(bgImageProps)) {
    mediaQueries.push(props.media);
  }
  const fallbackMediaQuery = getSmallestMediaQuery(mediaQueries);

  // Generate the responsive styles with media queries based on the image options.
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

interface BackgroundImageProps {
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
  /** Optional child elements to render inside the component. */
  children?: React.ReactNode;
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
  className = null,
  children,
}: BackgroundImageProps) {
  const bgImageProps = getBackgroundImageProps(images);

  // Format the data for the preloader.
  const preloadData = [];
  for (const [_key, value] of Object.entries(bgImageProps)) {
    preloadData.push({
      ...value.img,
      media: value.media,
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
      },
      children
    )
  ) : (
    <div id={id} className={className}>
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
