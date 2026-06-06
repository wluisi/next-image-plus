"use server";

import { SidebarMenu as GraphineryUiSidebarMenu } from "@graphinery/ui";
import Link from "next/link";

import { getCollection } from "./../utils/get-collection";
import { getContentTree } from "./../utils/get-content-tree";

export default async function SidebarMenu({
  currentPath,
}: {
  currentPath: string;
}) {
  const pageCollection = getCollection("page", {
    filter: {
      _and: [
        { _and: [{ status: { _eq: true } }] },
        { _and: [{ _path: { _neq: "/examples-pages" } }] },
        { _and: [{ _path: { _neq: "/examples-pages/picture" } }] },
        { _and: [{ _path: { _neq: "/examples-pages/background-image" } }] },
      ],
    },
    sort: { field: "weight", direction: "ASC" },
  });

  const menuItems = getContentTree(pageCollection);

  if (!menuItems) {
    return null;
  }

  return (
    <GraphineryUiSidebarMenu
      id="next-image-plus-docs__sidebar"
      currentPath={currentPath}
      // Only get menu items starting at 2nd level.
      menuItems={menuItems}
      linkAs={Link}
      linkClassNames="decoration-red-400 hover:decoration-red-400"
    />
  );
}
