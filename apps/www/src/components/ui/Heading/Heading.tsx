import * as React from "react";

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const headingSizeMap = {
  h1: "text-4xl",
  h2: "text-2xl",
  h3: "text-1xl",
};

export function Heading({ id, level, children, className }: HeadingProps) {
  const HeadingComponent = ({
    ...props
  }: React.HTMLAttributes<HTMLHeadingElement>) =>
    React.createElement(level, props, children);

  // @ts-expect-error - fix me later
  const classNames = `${headingSizeMap[level]} font-bold mb-5`;
  const classNamesFinal = className ? `${classNames} ${className}` : classNames;

  return (
    <HeadingComponent id={id} className={classNamesFinal}>
      {children}
    </HeadingComponent>
  );
}
