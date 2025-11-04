import {
  Breadcrumb as GraphineryUiBreadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  HomeIcon,
} from "@graphinery/ui";
import Link from "next/link";

import { graphql, FragmentOf, readFragment } from "./../../types";

export const BreadcrumbFragment = graphql(`
  fragment Breadcrumb on Blog {
    activeTrail {
      items {
        id
        title
        path
      }
    }
  }
`);

interface BreadcrumbProps {
  blog: FragmentOf<typeof BreadcrumbFragment> | null;
  currentPath: string;
}

export function Breadcrumb({ blog, currentPath }: BreadcrumbProps) {
  const breadcrumb = readFragment(BreadcrumbFragment, blog);

  if (!breadcrumb || !breadcrumb?.activeTrail) {
    return null;
  }

  return (
    <GraphineryUiBreadcrumb className="m-auto max-w-xxl">
      {breadcrumb.activeTrail.items?.map((item) => {
        const itemTitle =
          item?.path === "/" ? (
            <HomeIcon className="h-4 w-4 text-black dark:text-zinc-100 mt-[2px]" />
          ) : (
            item?.title
          );

        return (
          <BreadcrumbItem key={item?.path}>
            <BreadcrumbLink
              as={Link}
              href={item?.path}
              isCurrentPage={item?.path === currentPath}
              ariaLabel={item?.path === "/" ? "Home" : null}
            >
              {itemTitle}
            </BreadcrumbLink>
          </BreadcrumbItem>
        );
      })}
    </GraphineryUiBreadcrumb>
  );
}
