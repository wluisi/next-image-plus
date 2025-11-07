import { useQuery } from "@graphinery/client/react";
import { SidebarMenu as GraphineryUiSidebarMenu } from "@graphinery/ui";

import Link from "next/link";

import { graphql, ResultOf, VariablesOf } from "../../types";

export const SIDEBAR_MENU_QUERY = graphql(`
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

export type SidebarMenuData = { data: ResultOf<typeof SIDEBAR_MENU_QUERY> };
export type SidebarMenuVariables = VariablesOf<typeof SIDEBAR_MENU_QUERY>;

export default function SidebarMenu({ currentPath }: { currentPath: string }) {
  const { isLoading, isError, data } = useQuery<
    SidebarMenuData["data"],
    SidebarMenuVariables
  >(SIDEBAR_MENU_QUERY, {
    queryKey: ["pages-sidebar-menu"],
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

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (isError) {
    return <div>Error ...</div>;
  }

  const menu = data?.mdxMenu;

  if (!menu) {
    return null;
  }

  return (
    <GraphineryUiSidebarMenu
      id={menu.id}
      currentPath={currentPath}
      menuItems={menu.items as any}
      linkAs={Link}
      linkClassNames="decoration-red-400 hover:decoration-red-400"
    />
  );
}
