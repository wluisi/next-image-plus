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
  /** The URL of the image source. */
  src: string;
  /** The width of the source, can be a number or a string representing a number. */
  width: number | `${number}`;
  /** The height of the source, can be a number or a string representing a number. */
  height: number | `${number}`;
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
  /** Whether to preload the picture image. Defaults to `false`. */
  preload?: boolean;
  /** The media query to be used for the fallback image, if preload is true. */
  fallbackMedia?: string;
  /** Enables or disables the modification of media queries for preload link. */
  modifyMediaQueries?: boolean;
  /** Optional child elements to render inside the component. */
  children: React.ReactElement<SourceProps>[] | React.ReactElement<ImgProps>;
};

/**
 * Renders a `<picture>` element with `<source>` and `<img>` elements with optional preload support.
 *
 * @returns The rendered `<picture>` element with sources and an image.
 */
export function Picture({
  preload = false,
  fallbackMedia,
  modifyMediaQueries = true,
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
  // Handle the img media query.
  const imgUuid = `img-${imgChildProps.src}`;
  // Push the fallback media query.
  mediaQueries.push({
    uuid: imgUuid,
    media: fallbackMedia,
  });

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
    modify: modifyMediaQueries,
  });

  preloadData.push({
    media: mediaQueriesFinal[imgUuid],
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
