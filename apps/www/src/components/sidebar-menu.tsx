"use server";

import { gql } from "@graphinery/client";
import { client } from "../graphinery";
import { SidebarMenu as GraphineryUiSidebarMenu } from "@graphinery/ui";
import Link from "next/link";

const SIDEBAR_MENU_QUERY = gql`
  query SidebarMenuQuery($filter: MdxMenuQueryFilter, $sort: _QuerySort) {
    mdxMenu(filter: $filter, sort: $sort) {
      id
      title
      items {
        id
        title
        url
        parent
        items {
          id
          title
          url
          parent
          items {
            id
            title
            url
            parent
          }
        }
      }
    }
  }
`;

async function getSidebarMenu() {
  const { data } = await client.request({
    query: SIDEBAR_MENU_QUERY,
    variables: {
      filter: {
        status: { _eq: true },
        bundle: { _all_in: ["page"] },
        path: { _neq: "/examples-pages" },
        parent: { _neq: "/examples-pages" },
      },
      sort: { field: "weight", direction: "ASC" },
    },
  });

  return data.mdxMenu;
}

export default async function SidebarMenu({
  currentPath,
}: {
  currentPath: string;
}) {
  const menu = await getSidebarMenu();
  // Only get menu items starting at 2nd level.
  const menuItems = menu?.items;

  return (
    <GraphineryUiSidebarMenu
      id={menu.id}
      currentPath={currentPath}
      menuItems={menuItems}
      linkAs={Link}
      linkClassNames="decoration-red-400 hover:decoration-red-400"
    />
  );
}
