import * as React from "react";
import { cn } from "./../../../utils/tailwind";

export interface NavigationMenuListProps
  extends React.HTMLAttributes<HTMLElement> {
  className?: string;
  children: React.ReactNode;
}

export function NavigationMenuList({
  className,
  children,
}: NavigationMenuListProps) {
  return (
    <ul className={cn("navigation-menu-list pl-5", className)}>{children}</ul>
  );
}
