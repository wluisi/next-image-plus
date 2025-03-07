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
  return {
    as: "image",
    imageSrcSet: attributes.srcSet,
    imageSizes: attributes.sizes,
    crossOrigin: attributes.crossOrigin,
    referrerPolicy: attributes.referrerPolicy,
    fetchPriority: attributes.fetchPriority,
    media: attributes.media,
  };
}

export function PreloadImageLink({ data }: PreloadImageLinkProps) {
  // We use an alternate version of useRouter() provided by next/compat/router
  // This version doens't throw but returns null for the app router.
  // This allows us to know if the route is app or pages.
  // @see https://github.com/vercel/next.js/blob/canary/packages/next/src/client/compat/router.ts
  const router = useRouter();
  const isAppRouter = router === null ? true : false;

  // Check if React 19 and app router.
  // ReactDOM.preload() did not support media attribute until 19.
  // @see https://github.com/facebook/react/pull/28635
  if (!Boolean(React.use) && isAppRouter) {
    console.warn(
      "Preloading is not supported when using React 18 with Next.js app router, because ReactDOM.preload() does not support the media attribute."
    );

    return null;
  }

  if (isAppRouter && ReactDOM.preload) {
    data.forEach((attributes) => {
      // See https://github.com/facebook/react/pull/26940
      // @ts-expect-error TODO: upgrade to `@types/react-dom@18.3.x`
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
