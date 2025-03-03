import * as React from "react";
import { ChevronRightIcon } from "../Icons/ChevronRightIcon";

export interface BreadcrumbItemProps {
  isLastChild?: boolean;
  children: React.ReactNode;
}

export function BreadcrumbItem({
  isLastChild = false,
  children,
}: BreadcrumbItemProps) {
  return (
    <li className="pr-1 inline-flex items-center">
      {children}
      {!isLastChild && (
        <span role="presentation" className="pl-1">
          <ChevronRightIcon className="h-5 w-5" />
        </span>
      )}
    </li>
  );
}
