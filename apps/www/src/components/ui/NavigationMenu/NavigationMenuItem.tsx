import * as React from "react";

export interface NavigationMenuItemProps {
  children: React.ReactNode;
  className?: string;
  isActiveTrail?: boolean;
}

export function NavigationMenuItem({
  className,
  children,
  isActiveTrail = false,
}: NavigationMenuItemProps) {
  let classNames = "navigation-menu-item";

  if (className) {
    classNames = `${className} ${classNames}`;
  }

  if (isActiveTrail) {
    classNames = `${classNames} active-trail`;
  }

  return <li className={classNames}>{children}</li>;
}
