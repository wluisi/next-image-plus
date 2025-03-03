import * as React from "react";

export interface NavigationMenuProps extends React.HTMLAttributes<HTMLElement> {
  id: string;
  className?: string;
  children: React.ReactNode;
}

export function NavigationMenu({
  id,
  className,
  children,
}: NavigationMenuProps) {
  let classNames = "navigation-menu";
  if (className) {
    classNames = `${className} ${classNames}`;
  }

  return (
    <nav aria-labelledby={id} className={classNames}>
      {children}
    </nav>
  );
}
