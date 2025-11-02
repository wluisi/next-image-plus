import { gql } from "@graphinery/client";
import { useQuery } from "@graphinery/client/react";
import { SidebarMenu as GraphineryUiSidebarMenu } from "@graphinery/ui";

import Link from "next/link";

// @todo Add gql-tada

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
        status: { _eq: true },
        bundle: { _all_in: ["page"] },
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

  const menu = data.mdxMenu;

  return (
    <GraphineryUiSidebarMenu
      id={menu.id}
      currentPath={currentPath}
      menuItems={menu.items}
      linkAs={Link}
      linkClassNames="decoration-red-400 hover:decoration-red-400"
    />
  );
}
