import * as React from "react";

// @ts-expect-error - fix me later
export function CardBody({ children }) {
  return <div className="px-5 py-10">{children}</div>;
}
