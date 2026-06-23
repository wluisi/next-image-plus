"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { observe } from "react-intersection-observer";

import { hasFetchedPage, addFetchedPage } from "./utils/page-cache";
import { fetchPage } from "./utils/fetch-page";

type UseSupersonicPrefetchOptions = {
  root?: Element | Document | null;
  rootMargin?: string;
  threshold?: number | number[];
  fallbackInView?: boolean;
};

export type UseSupersonicPrefetchReturn = {
  getPrefetchProps: (url: string) => {
    ref: (node: HTMLElement | null) => void;
  };
};

/**
 * `useSupersonicPrefetch` is a custom React hook that prefetches Next.js routes and images
 * when elements enter the viewport. It returns `getPrefetchProps(url)`, which you call per URL
 * and spread (or attach the ref) onto the element that navigates to that URL (e.g. a button or card).
 * When that element is in view, the route and its images are prefetched for fast navigation.
 *
 * @example
 * ```tsx
 * import { useSupersonicPrefetch } from "next-image-plus";
 * import { useRouter } from "next/navigation";
 *
 * const router = useRouter();
 * const { getPrefetchProps } = useSupersonicPrefetch({ rootMargin: "100px" });
 *
 * <button
 *   {...getPrefetchProps("/blog/next-page")}
 *   onClick={() => router.push("/blog/next-page")}
 * >
 *   Next page
 * </button>
 * ```
 *
 * @param options - UseSupersonicPrefetchOptions
 */
export function useSupersonicPrefetch({
  root,
  rootMargin,
  threshold,
  fallbackInView,
}: UseSupersonicPrefetchOptions = {}): UseSupersonicPrefetchReturn {
  const router = useRouter();

  const getPrefetchProps = React.useCallback(
    (url: string) => {
      let unobserve: (() => void) | undefined;

      return {
        ref: (node: HTMLElement | null) => {
          if (!node) {
            if (unobserve) {
              unobserve();
            }
            return;
          }

          unobserve = observe(
            node,
            (inView) => {
              if (!inView) {
                return;
              }

              if (hasFetchedPage(url)) {
                return;
              }

              addFetchedPage(url);

              // Let Next prefetch route data/JS for fast navigation.
              router.prefetch(url);

              // Fetch raw HTML separately to extract and preload images.
              fetchPage(url);

              if (unobserve) {
                unobserve();
              }
            },
            { root, rootMargin, threshold },
            fallbackInView
          );
        },
      };
    },
    [router, root, rootMargin, threshold, fallbackInView]
  );

  return { getPrefetchProps };
}
