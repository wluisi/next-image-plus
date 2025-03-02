import * as React from "react";

export interface AccordionProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
  children: React.ReactNode;
}

export function Accordion({ className, children }: AccordionProps) {
  let classNames = "graphinery-ui__accordion py-3";
  if (className) {
    classNames = `${className} ${classNames}`;
  }

  return <div className={classNames}>{children}</div>;
}
