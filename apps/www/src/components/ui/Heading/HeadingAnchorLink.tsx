import * as React from "react";
import { Heading, LinkIcon } from "./../../ui";

interface HeadingAnchorLinkProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  title: string;
  level: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export function getSlugFromTitle(text: string) {
  return text
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
}

export function HeadingAnchorLink({ title, level }: HeadingAnchorLinkProps) {
  const slug = getSlugFromTitle(title);
  const href = `#${slug}`;
  const permaLink = `Permalink: ${title}`;

  return (
    <Heading className="heading-anchor-link flex items-center" level={level}>
      {title}
      <a
        id={slug}
        href={href}
        aria-label={permaLink}
        className="text-black no-underline hover:underline align-middle"
      >
        <LinkIcon className="h-7 w-7 pl-3 text-slate-600" />
      </a>
    </Heading>
  );
}
