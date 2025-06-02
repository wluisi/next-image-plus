import * as React from "react";

import { gql } from "@graphinery/client";
import { useQuery } from "@graphinery/client/react";

import {
  GithubIcon,
  ImageIcon,
  DesktopNavigation,
  Header as GraphineryUiHeader,
  MobileNavigation,
  ThemeToggle,
} from "@graphinery/ui";
import Link from "next/link";

export const HEADER_MENU_QUERY = gql`
  query HeaderMenuQuery($filter: MdxMenuQueryFilter, $sort: _QuerySort) {
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

const iconMap: Record<string, React.JSX.Element> = {
  github: <GithubIcon className="h-6 w-6" />,
};

// @todo import this from the real header.
function Logo() {
  return (
    <div className="logo flex">
      <Link
        href="/"
        className="text-black dark:text-zinc-100 text-l font-extrabold no-underline hover:underline"
      >
        <ImageIcon className="h-6 w-6 text-red-500 dark:text-red-400 float-left mr-1" />
        <span>next-image-plus</span>
      </Link>
    </div>
  );
}

export default function Header() {
  const id = "next-image-plus-docs__header";

  const { isLoading, isError, data } = useQuery(HEADER_MENU_QUERY, {
    queryKey: ["pages-header-menu"],
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
    <GraphineryUiHeader
      main={
        <>
          <Logo />
          <DesktopNavigation
            id={id}
            menuItems={menu.items}
            menuLinkAs={Link}
            iconMap={iconMap}
          />
        </>
      }
      utility={
        <>
          <ThemeToggle />
          <Link
            href="https://github.com/wluisi/next-image-plus"
            className="text-black dark:text-zinc-100 p-2 rounded-md no-underline hover:bg-zinc-200 dark:hover:bg-zinc-700"
          >
            <GithubIcon className="h-5 w-5" />
          </Link>
          <MobileNavigation id={id} menuItems={menu.items} menuLinkAs={Link} />
        </>
      }
    />
  );
}
