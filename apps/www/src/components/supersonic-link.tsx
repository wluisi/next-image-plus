"use client";

import React, { type ComponentProps } from "react";

import Link from "next/link";
import { experimental_useSupersonicLink as useSupersonicLink } from "next-image-plus";

type SupersonicLinkProps = ComponentProps<typeof Link>;

const SupersonicLink = React.forwardRef<HTMLAnchorElement, SupersonicLinkProps>(
  ({ href, children, ...rest }, forwardedRef) => {
    const { ref } = useSupersonicLink({
      href: href as string,
      ref: forwardedRef,
    });

    return (
      <Link ref={ref} href={href} {...rest}>
        {children}
      </Link>
    );
  }
);

SupersonicLink.displayName = "SupersonicLink";
export default SupersonicLink;
