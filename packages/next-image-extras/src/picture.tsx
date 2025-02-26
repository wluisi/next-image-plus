import * as React from "react";

import { getImageProps as getNextImageProps } from "next/image";
import { PreloadImageLink } from "./preload";

/*
 *
 */
function getValidReactChildren(children: React.ReactNode) {
  return React.Children.toArray(children).filter((child) =>
    React.isValidElement(child)
  ) as React.ReactElement[];
}

export type SourceProps = React.ComponentPropsWithRef<"source"> & {
  src?: string;
};

/*
 *
 */
export function Source({ srcSet, media, sizes, width, height }: SourceProps) {
  return (
    <source
      srcSet={srcSet}
      media={media}
      sizes={sizes}
      width={width}
      height={height}
    />
  );
}

export type ImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  /** The media query to be used for the fallback image, if preload is true. */
  media?: string;
};

export function Image({ src, width, height, alt, className }: ImageProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      width={width}
      height={height}
      alt={alt}
      className={className}
    />
  );
}

export type PictureProps = React.ComponentPropsWithRef<"picture"> & {
  preload?: boolean;
  /** The media query to be used for the fallback image, if preload is true. */
  fallbackMedia?: string;
  children: SourceProps[] | ImageProps;
};

export function Picture({
  preload = false,
  fallbackMedia,
  children,
}: PictureProps) {
  const preloadData: any = [];

  const childrenValidated = getValidReactChildren(children);

  const imgClone = childrenValidated.find((child) => {
    if (child.type === Image) {
      const imgChildProps = child.props;

      const { props: imageProps } = getNextImageProps({
        src: imgChildProps.src,
        alt: imgChildProps.alt,
        width: imgChildProps.width as number,
        height: imgChildProps.height as number,
      });

      preloadData.push({
        media: fallbackMedia,
        ...imageProps,
      });

      return React.cloneElement(child, {
        ...imageProps,
      });
    }
  });

  const alt = imgClone.props.alt;

  const sourceClones = childrenValidated.map((child) => {
    if (child.type === Source) {
      const { props: sourceProps } = getNextImageProps({
        src: child.props.src,
        alt: alt,
        sizes: child.props.sizes,
        width: child.props.width as number,
        height: child.props.height as number,
      });

      preloadData.push({
        media: child.props.media,
        ...sourceProps,
      });

      return React.cloneElement(child, {
        alt: alt,
        ...sourceProps,
      });
    }
  });

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
