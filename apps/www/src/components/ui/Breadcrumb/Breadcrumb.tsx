import * as React from "react";

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
  children: React.ReactNode;
}

function getValidChildren(children: React.ReactNode) {
  return React.Children.toArray(children).filter((child) =>
    React.isValidElement(child)
  ) as React.ReactElement[];
}

export function Breadcrumb({ className, children }: BreadcrumbProps) {
  // @see https://github.com/chakra-ui/chakra-ui/blob/e3673f4f4697a673d6b267a12dad64ecfb5b6f26/packages/components/src/breadcrumb/breadcrumb.tsx#L42
  const childrenValidated = getValidChildren(children);
  const childrenClones = childrenValidated.map((child, index) =>
    React.cloneElement(child, {
      // @ts-expect-error - fix me later
      isLastChild: childrenValidated.length === index + 1,
    })
  );

  let classNames = "py-3 pb-3";
  if (className) {
    classNames = `${className} ${classNames}`;
  }

  return (
    <nav aria-label="breadcrumb" className={classNames}>
      <ol className="list-none pl-0 flex">{childrenClones}</ol>
    </nav>
  );
}
