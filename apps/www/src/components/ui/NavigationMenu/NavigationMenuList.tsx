import * as React from "react";

export interface NavigationMenuListProps
  extends React.HTMLAttributes<HTMLElement> {
  className?: string;
  children: React.ReactNode;
}

export function NavigationMenuList({
  className,
  children,
}: NavigationMenuListProps) {
  let classNames = "pl-5";
  if (className) {
    classNames = `${className} ${classNames}`;
  }

  return <ul className={classNames}>{children}</ul>;
}
