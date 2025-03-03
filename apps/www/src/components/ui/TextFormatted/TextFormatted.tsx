import * as React from "react";

export interface TextFormattedProps {
  id?: string;
  className?: string;
  html: string;
}

export function TextFormatted({ id, className, html }: TextFormattedProps) {
  let classNames = "text-formatted";
  if (className) {
    classNames = `${className} ${classNames}`;
  }

  return (
    <div
      id={id}
      className={classNames}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
