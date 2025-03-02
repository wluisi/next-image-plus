import * as React from "react";

export interface BreadcrumbLinkProps
  extends React.LinkHTMLAttributes<HTMLAnchorElement> {
  isCurrentPage?: boolean;
  /* Replace with a custom link component, such as NextJS Link component. */
  as?: any;
}

export function BreadcrumbLink({
  as,
  href,
  isCurrentPage = false,
  children,
}: BreadcrumbLinkProps) {
  const classNames = "text-black no-underline hover:underline";
  // Handle when a custom component is passed into the `as` prop.
  if (as) {
    if (isCurrentPage) {
      return (
        <span aria-current="page" className="font-bold">
          {children}
        </span>
      );
    }
    // Create the component with specific props, and pass along children.
    return React.createElement(
      as,
      {
        href: href,
        className: classNames,
      },
      children
    );
  }

  if (isCurrentPage) {
    return (
      <span aria-current="page" className="font-bold">
        {children}
      </span>
    );
  }

  return (
    <a href={href} className={classNames}>
      {children}
    </a>
  );
}
