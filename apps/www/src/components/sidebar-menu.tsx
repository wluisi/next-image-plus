"use server";

import { client } from "../graphinery";
import { SidebarMenu as GraphineryUiSidebarMenu } from "@graphinery/ui";
import Link from "next/link";

import { graphql, ResultOf, VariablesOf } from "./../types";

const SIDEBAR_MENU_QUERY = graphql(`
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
`);

export type SidebarMenu = ResultOf<typeof SIDEBAR_MENU_QUERY>["mdxMenu"];
type SidebarMenuData = { data: ResultOf<typeof SIDEBAR_MENU_QUERY> };
type SidebarMenuVariables = VariablesOf<typeof SIDEBAR_MENU_QUERY>;

async function getSidebarMenu(): Promise<SidebarMenu> {
  const { data } = await client.request<SidebarMenuData, SidebarMenuVariables>({
    query: SIDEBAR_MENU_QUERY,
    variables: {
      filter: {
        status: { _eq: true },
        collection: { _all_in: ["page"] },
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

  if (!menu || !menu.items) {
    return null;
  }

  return (
    <GraphineryUiSidebarMenu
      id={menu.id}
      currentPath={currentPath}
      // Only get menu items starting at 2nd level.
      menuItems={menu?.items as any}
      linkAs={Link}
      linkClassNames="decoration-red-400 hover:decoration-red-400"
    />
  );
}
