import * as React from "react";

import { getImageProps as getNextImageProps } from "next/image";
import {
  PreloadImageLink,
  ImageAttributes as PreloadImageAttributes,
} from "./preload";
import { getMediaQueries } from "./utils/media";

/**
 * Filters the given React children and returns only valid React elements.
 *
 * @param children - The React node(s) to filter.
 * @returns An array of valid React elements.
 */
function getValidReactChildren(
  children: React.ReactNode
): React.ReactElement[] {
  return React.Children.toArray(children).filter((child) =>
    React.isValidElement(child)
  ) as React.ReactElement[];
}

export type SourceProps = React.ComponentPropsWithRef<"source"> & {
  /**
   * The URL of the image source. The value must be a path string or a statically imported file.
   *
   * @example
   * src = "/image.jpg"
   *
   * @remarks
   * [info] A key difference between the native html element for `<source>` and the `<Source />` component, is the html element does not accept a `src` attribute,
   * but uses `srcset` instead.
   *
   * The value for `srcset` will get automatically generated for you, using the Next.js Image API, based on the `src` prop value.
   */
  src: string;

  /**
   * A media query string, defining when to use this particular source image.
   *
   * @example
   * media = "(max-width: 430px)"
   */
  media: string;

  /**
   * The width prop functions the same way as it does on the Next.js `<Image />` component.
   *
   * @example
   * width = {500}
   *
   * @remarks
   * [quote] The width property represents the intrinsic image width in pixels.
   * This property is used to infer the correct aspect ratio of the image and avoid layout shift during loading.
   * It does not determine the rendered size of the image,
   * which is controlled by CSS, similar to the width attribute in the HTML `<img>` tag.
   *
   * [link] https://nextjs.org/docs/pages/api-reference/components/image#width-and-height | Source: Next.js Image API Reference
   */
  width: number;

  /**
   * The height prop functions the same way as it does on the Next.js `<Image />` component.
   *
   * @example
   * height = {500}
   *
   * @remarks
   * [quote] The height property represents the intrinsic image height in pixels.
   * This property is used to infer the correct aspect ratio of the image and avoid layout shift during loading.
   * It does not determine the rendered size of the image,
   * which is controlled by CSS, similar to the width attribute in the HTML `<img>` tag.
   *
   * [link] https://nextjs.org/docs/pages/api-reference/components/image#width-and-height | Source: Next.js Image API Reference
   */
  height: number;

  /**
   * Optional prop to define the sizes of the image at different breakpoints. Used to determined the best size for the generated srcset.
   * The sizes prop functions the same way as it does on the Next.js `<Image />` component.
   *
   * @example
   * sizes="(max-width: 768px) 100vw, 33vw"
   *
   * @remarks
   * [link] https://nextjs.org/docs/pages/api-reference/components/image#sizes | Source: Next.js Image API Reference
   */
  sizes?: string;
};

/**
 * Renders a `<source>` element with the given properties, excluding `srcSet`.
 *
 * @returns A React `<source>` element.
 */
export function Source(props: Omit<SourceProps, "srcSet">) {
  return <source {...props} />;
}

export type ImgProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  /** The media query to be used for the fallback image, if preload is true. */
  media?: string;
};

/**
 * Img component for use inside `<Picture>`. Renders a `<img>` element.
 *
 * @returns The rendered `<img>` element.
 */
export function Img({ src, width, height, alt, className }: ImgProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      width={width}
      height={height}
      alt={alt}
      className={className}
      // @todo consider adding this back, but only if node is in dev mode ?
      // when debugging, it can get really confusing trying to figure out
      // which srcset is getting selected by browser.
      // onLoad={(event) =>
      //   console.log("Loaded src:", event.currentTarget.currentSrc)
      // }
    />
  );
}

export type PictureProps = React.ComponentPropsWithRef<"picture"> & {
  /**
   * Optional prop for preloading the image. This works similar to the `priority` prop on the Next.js Image component.
   * Should be used for any `<Picture />` component that is above the fold, and flagged as the Largest Contentful Paint (LCP).
   *
   * @example
   * preload={false}
   *
   * @remarks
   * [important] For preloading to work properly, media queries on `<link rel="preload">` elements cannot overlap.
   *
   * Media queries on `<link rel="preload">` elements do not function the way they do on HTML elements.
   * The user agent will look at multiple `<link rel="preload">` media queries and find multiple matches if there is any overlap in the media queries.
   * This can lead to performance issues, where multiple images are preloaded.
   *
   * To avoid this, the `<Picture />` component will automatically adjust the media queries set on Source to remove any overlap,
   * by adding or subtracting 1 px. If this functionality causes any issues, it can be disabled with the `normalizeMediaQueries` prop.
   */
  preload?: boolean;

  /**
   * An optional prop, to set the fallback media query for preloading.
   *
   * @example
   * fallbackMedia = "(max-width: 430px)";
   */
  fallbackMedia?: string;

  /**
   * An optional prop to disable the component from normalizing the media queries to remove overlap.
   *
   * @example
   * normalizeMediaQueries={false}
   */
  normalizeMediaQueries?: boolean;

  /**
   * Prop for passing the `<Source />` and `<Img />` components.
   *
   * @example
   * <Picture>
   *   <Source srcSet="image-320w.jpg" media="(max-width: 320px)" />
   *   <Img src="image.jpg" alt="Example image" />
   * </Picture>
   */
  children?: React.ReactElement<SourceProps>[] | React.ReactElement<ImgProps>;
};

/**
 * Renders a `<picture>` element with `<source>` and `<img>` elements with optional preload support.
 *
 * @returns The rendered `<picture>` element with sources and an image.
 */
export function Picture({
  preload = false,
  fallbackMedia = null,
  normalizeMediaQueries = true,
  children,
}: PictureProps) {
  const preloadData: PreloadImageAttributes[] = [];

  const childrenValidated = getValidReactChildren(children);

  // Find the Image component passed as a child.
  const imgElement = childrenValidated.find((child) => child.type === Img);
  if (!imgElement) {
    throw new Error("Image component not found in children");
  }

  const imgChildProps: ImgProps = imgElement.props;
  const { props: imageProps } = getNextImageProps({
    src: imgChildProps.src,
    alt: imgChildProps.alt,
    width: imgChildProps.width as number,
    height: imgChildProps.height as number,
  });

  // Build an array of media queries for use with getMediaQueries().
  const mediaQueries = [];
  // Handle the source media queries.
  childrenValidated.map((child: React.ReactElement<SourceProps>) => {
    if (child.type === Source) {
      mediaQueries.push({
        uuid: `source-${child.props.src}`,
        media: child.props.media,
      });
    }
  });

  const mediaQueriesFinal = getMediaQueries(mediaQueries, {
    normalize: normalizeMediaQueries,
    fallback: fallbackMedia,
  });

  preloadData.push({
    media: mediaQueriesFinal["img-fallback"],
    fetchPriority: preload ? "high" : "auto",
    ...imageProps,
  });

  const imgClone: React.ReactElement<ImgProps> = React.cloneElement(
    imgElement,
    {
      ...imageProps,
    }
  );

  const alt = imgClone.props.alt;

  const sourceClones = childrenValidated.map(
    (child: React.ReactElement<SourceProps>) => {
      if (child.type === Source) {
        const { props: sourceProps } = getNextImageProps({
          src: child.props.src,
          alt: alt,
          sizes: child.props.sizes,
          width: child.props.width,
          height: child.props.height,
        });

        const sourceMediaQuery = mediaQueriesFinal[`source-${child.props.src}`];

        preloadData.push({
          media: sourceMediaQuery,
          fetchPriority: preload ? "high" : "auto",
          ...sourceProps,
        });

        return React.cloneElement(child, {
          // Effectively remove the src prop, since we don't want it on the final <source> element.
          src: undefined,
          // Add srcSet generated by next image api.
          srcSet: sourceProps.srcSet,
          media: sourceMediaQuery,
          sizes: sourceProps.sizes,
          width: sourceProps.width,
          height: sourceProps.height,
        });
      }

      return null;
    }
  );

  return (
    <>
      <picture>
        {sourceClones}
        {imgClone}
      </picture>
      {preload ? <PreloadImageLink data={preloadData} /> : null}
    </>
  );
}
