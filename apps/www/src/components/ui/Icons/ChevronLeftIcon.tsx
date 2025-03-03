import * as React from "react";

export function ChevronLeftIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 15 15" height="1em" width="1em" {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M8.818 4.182a.45.45 0 010 .636L6.136 7.5l2.682 2.682a.45.45 0 11-.636.636l-3-3a.45.45 0 010-.636l3-3a.45.45 0 01.636 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}
