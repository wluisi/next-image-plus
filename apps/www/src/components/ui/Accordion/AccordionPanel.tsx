"use client";

import * as React from "react";
import { AccordionItemContext } from "./accordion-context";

export interface AccordionPanelProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
  children: React.ReactNode;
}

export function AccordionPanel({ className, children }: AccordionPanelProps) {
  const ref = React.useRef();

  let classNames = "graphinery-ui__accordion-panel p-3";
  if (className) {
    classNames = `${className} ${classNames}`;
  }

  const accordionContext = React.useContext(AccordionItemContext);
  const { getPanelProps } = accordionContext;
  const panelProps = getPanelProps({ className: classNames, children }, ref);

  // console.log(panelProps);

  let collapsibleClassNames =
    "collapsible overflow-hidden hidden opacity-0 max-h-0";
  if (panelProps.hidden !== true) {
    collapsibleClassNames =
      "collapsible overflow-hidden display-block opacity-1 max-h-auto";
  }

  return (
    <div className={collapsibleClassNames}>
      <div {...panelProps}>{children}</div>
    </div>
  );
}
