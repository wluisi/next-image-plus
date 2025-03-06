"use client";

import * as React from "react";
import ReactDOM from "react-dom";

import Head from "next/head";
import { type ImageProps as NextImageProps } from "next/image";

import { useRouter } from "next/compat/router";

export type ImageAttributes = Omit<NextImageProps, "src" | "loader"> & {
  sizes: string | undefined;
  srcSet: string | undefined;
  src: string;
  media?: string;
};

export interface PreloadImageLinkProps {
  data: ImageAttributes[];
}

export function getSharedOptions(attributes: ImageAttributes) {
  const fetchPriority = Boolean(React.use)
    ? // In React 19.0.0 or newer, we must use camelCase
      // prop to avoid "Warning: Invalid DOM property".
      // See https://github.com/facebook/react/pull/25927
      { fetchPriority: attributes.fetchPriority }
    : // In React 18.2.0 or older, we must use lowercase prop
      // to avoid "Warning: Invalid DOM property".
      { fetchpriority: attributes.fetchPriority };

  const options = {
    as: "image",
    imageSrcSet: attributes.srcSet,
    imageSizes: attributes.sizes,
    crossOrigin: attributes.crossOrigin,
    referrerPolicy: attributes.referrerPolicy,
    ...fetchPriority,
    media: attributes.media,
  };

  return options;
}

export function PreloadImageLink({ data }: PreloadImageLinkProps) {
  // We use an alternate version of useRouter() provided by next/compat/router
  // This version doens't throw but returns null for the app router.
  // This allows us to know if the route is app or pages.
  // @see https://github.com/vercel/next.js/blob/canary/packages/next/src/client/compat/router.ts
  const router = useRouter();
  const isAppRouter = router === null ? true : false;
  // const isAppRouter = router === null;

  if (isAppRouter && ReactDOM.preload) {
    data.forEach((attributes) => {
      // See https://github.com/facebook/react/pull/26940
      // @ts-expect-error TODO: upgrade to `@types/react-dom@18.3.x`
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
              "__nimg-" + attributes.src + attributes.srcSet + attributes.sizes
            }
            rel="preload"
            // Note how we omit the `href` attribute, as it would only be relevant
            // for browsers that do not support `imagesrcset`, and in those cases
            // it would cause the incorrect image to be preloaded.
            //
            // https://html.spec.whatwg.org/multipage/semantics.html#attr-link-imagesrcset
            href={attributes.srcSet ? undefined : attributes.src}
            {...getSharedOptions(attributes)}
          />
        );
      })}
    </Head>
  );
}
