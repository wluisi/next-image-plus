import * as React from "react";

// @ts-expect-error - fix me later
export function CardBody({ children }) {
  return <div className="px-3 py-6">{children}</div>;
}
