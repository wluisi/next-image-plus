import { gql } from "@graphinery/client";
import { useQuery } from "@graphinery/client/react";
import { SidebarMenu as GraphineryUiSidebarMenu } from "@graphinery/ui";

import Link from "next/link";

export const SIDEBAR_MENU_QUERY = gql`
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

export default function SidebarMenu({ currentPath }: { currentPath: string }) {
  const { isLoading, isError, data } = useQuery(SIDEBAR_MENU_QUERY, {
    queryKey: ["pages-sidebar-menu"],
    variables: {
      filter: {
        path: { _neq: "/examples-pages" },
        parent: { _neq: "/examples-pages" },
        // status: { _eq: true }
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

  const menu = data.mdxMenu;

  return (
    <GraphineryUiSidebarMenu
      id={menu.id}
      currentPath={currentPath}
      menuItems={menu.items}
      linkAs={Link}
    />
  );
}
