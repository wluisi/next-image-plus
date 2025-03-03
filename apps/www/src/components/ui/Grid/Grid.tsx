import * as React from "react";

// @see https://v2.chakra-ui.com/docs/components/grid/props
export interface GridProps {
  id?: string;
  as?: any;
  className?: string;
  children: React.ReactNode;
}

export function Grid({ id, as, className, children }: GridProps) {
  let classNames = "grid";
  if (className) {
    classNames = `${className} ${classNames}`;
  }

  if (as) {
    // Create the component with specific props, and pass along children.
    return React.createElement(
      as,
      {
        ...(id && {
          id: id,
        }),
        className: classNames,
      },
      children
    );
  }

  return (
    <div
      {...(id && {
        id: id,
      })}
      className={classNames}
    >
      {children}
    </div>
  );
}
