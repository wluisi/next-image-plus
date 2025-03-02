import * as React from "react";

// @see https://v2.chakra-ui.com/docs/components/grid/props
export interface GridItemProps {
  id?: string;
  as?: any;
  className?: string;
  children: React.ReactNode;
}

export function GridItem({ id, as, className, children }: GridItemProps) {
  let classNames = "grid-item";
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
