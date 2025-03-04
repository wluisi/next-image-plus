"use client";

import * as React from "react";
import { AccordionItemContext } from "./accordion-context";
import { useAccordion } from "./use-accordion";

export interface AccordionItemProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
  children: React.ReactNode;
}

export function AccordionItem({ className, children }: AccordionItemProps) {
  const accordionContext = useAccordion();

  let classNames =
    "accordion-item bg-gray-100 border-2 border-gray-100 rounded-lg mb-3";
  if (className) {
    classNames = `${className} ${classNames}`;
  }

  return (
    // @ts-expect-error - fix me later
    <AccordionItemContext.Provider value={accordionContext}>
      <div className={classNames}>{children}</div>
    </AccordionItemContext.Provider>
  );
}
