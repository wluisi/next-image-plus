import {
  Breadcrumb as GraphineryUiBreadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  HomeIcon,
} from "@graphinery/ui";
import Link from "next/link";

import { getCollection } from "../cc/collection";
import { getContentTree } from "../cc/content-tree";
import { getActiveTrail } from "../cc/active-trail";

interface BreadcrumbProps {
  currentPath: string;
}

export function Breadcrumb({ currentPath }: BreadcrumbProps) {
  const allEntries = [...getCollection("page"), ...getCollection("blog")];
  const activeTrail = getActiveTrail(currentPath, {
    contentTree: getContentTree(allEntries),
  });

  const items = [
    { id: "/", title: "Home", path: "/", url: "/", parent: "" },
    ...activeTrail,
  ];

  return (
    <GraphineryUiBreadcrumb className="m-auto max-w-xxl">
      {items.map((item) => {
        const itemTitle =
          item.path === "/" ? (
            <HomeIcon className="h-4 w-4 text-black dark:text-zinc-100 mt-[2px]" />
          ) : (
            item.title
          );

        return (
          <BreadcrumbItem key={item.path}>
            <BreadcrumbLink
              as={Link}
              href={item.path}
              isCurrentPage={item.path === currentPath}
              ariaLabel={item.path === "/" ? "Home" : null}
            >
              {itemTitle}
            </BreadcrumbLink>
          </BreadcrumbItem>
        );
      })}
    </GraphineryUiBreadcrumb>
  );
}
