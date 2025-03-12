"use client";

import * as React from "react";
import ReactDOM from "react-dom";

import Head from "next/head";
import { type ImageProps as NextImageProps } from "next/image";
import { useRouter } from "next/compat/router";

export type ImageAttributes = Omit<NextImageProps, "src" | "loader"> & {
  /** The sizes attribute defining image display sizes for different viewports. */
  sizes: string | undefined;
  /** The srcset attribute specifying multiple image sources for responsive loading. */
  srcSet: string | undefined;
  /** The image source URL. */
  src: string;
  /** Optional media query. */
  media?: string;
};

export interface PreloadImageLinkProps {
  /** An array of image attributes. */
  data: ImageAttributes[];
}

/**
 * Returns a set of shared options derived from image attributes.
 *
 * @returns An object containing shared options.
 */
function getSharedOptions(attributes: ImageAttributes) {
  return {
    as: "image" as ReactDOM.PreloadAs,
    imageSrcSet: attributes.srcSet,
    imageSizes: attributes.sizes,
    crossOrigin: attributes.crossOrigin,
    referrerPolicy: attributes.referrerPolicy,
    fetchPriority: attributes.fetchPriority,
    media: attributes.media,
  };
}

/**
 * Generates preloading image links for images.
 *
 * Supports both Next.js app and pages routers, with a fallback for React 18.
 * Uses `ReactDOM.preload` when available in the app router.
 *
 * @returns A set of `<link rel="preload" as="image" ... />` elements.
 */
export function PreloadImageLink({ data }: PreloadImageLinkProps) {
  // We use an alternate version of useRouter() provided by next/compat/router.
  // This version doesn't throw, but returns null for the app router.
  // @see https://github.com/vercel/next.js/blob/canary/packages/next/src/client/compat/router.ts
  const router = useRouter();
  const isAppRouter = router === null ? true : false;

  // Check if React 19 and app router.
  // `ReactDOM.preload()` did not support media attribute until 19.
  // @see https://github.com/facebook/react/pull/28635
  if (!Boolean(React.use) && isAppRouter) {
    console.warn(
      "Preloading is not supported when using React 18 with Next.js app router, because ReactDOM.preload() does not support the media attribute."
    );

    return null;
  }

  if (isAppRouter && ReactDOM.preload) {
    data.forEach((attributes) => {
      // @see https://github.com/facebook/reacxt/pull/26940
      // @see https://react.dev/reference/react-dom/preload#parameters
      ReactDOM.preload(attributes.src, getSharedOptions(attributes));
      return null;
    });
  }

  return (
    <Head>
      {data.map((attributes) => {
        return (
          <link
            key={
              "__next-image-plus-preload" +
              attributes.src +
              attributes.srcSet +
              attributes.sizes
            }
            rel="preload"
            href={attributes.srcSet ? undefined : attributes.src}
            {...getSharedOptions(attributes)}
          />
        );
      })}
    </Head>
  );
}
