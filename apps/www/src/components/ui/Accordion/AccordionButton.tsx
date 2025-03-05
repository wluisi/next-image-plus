"use client";

import * as React from "react";
import { AccordionItemContext } from "./accordion-context";
import { ChevronDownIcon } from "../Icons/ChevronDownIcon";

export interface AccordionButtonProps
  extends React.HTMLAttributes<HTMLElement> {
  className?: string;
  children: React.ReactNode;
}

export function AccordionButton({ className, children }: AccordionButtonProps) {
  const ref = React.useRef();

  const accordionContext = React.useContext(AccordionItemContext);
  // @ts-expect-error - fix me later
  const { getButtonProps } = accordionContext;
  const buttonProps = getButtonProps({ className, children }, ref);

  let classNames =
    "accordion-button p-3 w-full flex justify-between items-center hover:bg-gray-200 text-align-left";
  if (className) {
    classNames = `${className} ${classNames}`;
  }

  let iconClassNames = "transition-transform ease-out";
  if (buttonProps["aria-expanded"]) {
    iconClassNames = `${iconClassNames} rotate-180`;
    // button class names
    classNames = `${classNames} bg-gray-200`;
  }

  return (
    <button {...buttonProps} className={classNames}>
      {children}
      <span role="presentation" className="pl-1">
        <ChevronDownIcon className={iconClassNames} />
      </span>
    </button>
  );
}
