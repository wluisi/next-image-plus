"use client";

import { useInView } from "react-intersection-observer";
import { useRouter } from "next/navigation";

import { hasFetchedPage, addFetchedPage } from "./utils/page-cache";
import { fetchPage } from "./utils/fetch-page";

type UseSupersonicLinkOptions = {
  /** The link URL; images from this page are prefetched when the link is in view. */
  href: string;
  /** Optional ref to forward to the underlying anchor element. */
  ref?: React.ForwardedRef<HTMLAnchorElement>;
  threshold?: number;
  rootMargin?: string;
  root?: Element | Document | null;
  skip?: boolean;
};

/**
 * `useSupersonicLink` is a custom React hook that returns a ref to attach to a link element.
 * When the link enters the viewport, it prefetches images from that page so they load faster on navigation.
 * It merges the returned ref with an optional forwarded ref so parents can also reference the anchor.
 *
 * @example
 * ```tsx
 * import { useSupersonicLink } from "next-image-plus";
 * import Link from "next/link";
 *
 * const { ref } = useSupersonicLink({
 *   href: "/blog/post-1",
 *   ref: forwardedRef,
 * });
 *
 * return (
 *   <Link ref={ref} href="/blog/post-1">
 *     Read more
 *   </Link>
 * );
 * ```
 *
 * @param options - UseSupersonicLinkOptions
 */
export function useSupersonicLink({
  href,
  threshold = 0.1,
  rootMargin,
  root,
  skip,
}: UseSupersonicLinkOptions) {
  const router = useRouter();

  const { ref } = useInView({
    threshold,
    rootMargin,
    root,
    skip,
    triggerOnce: true,
    onChange: (inView) => {
      if (!inView) {
        return;
      }

      if (hasFetchedPage(href)) {
        return;
      }

      addFetchedPage(href);

      // Let Next prefetch route data/JS for fast navigation.
      router.prefetch(href);

      // Fetch raw HTML separately to extract and preload images.
      fetchPage(href);
    },
  });

  return { ref };
}
