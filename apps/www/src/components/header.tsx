"use server";

import * as React from "react";

import { client } from "../graphinery";
import { graphql, ResultOf, VariablesOf } from "../types";

import {
  GithubIcon,
  ImageIcon,
  DesktopNavigation,
  Header as GraphineryUiHeader,
  MobileNavigation,
  ThemeToggle,
} from "@graphinery/ui";
import Link from "next/link";

const HEADER_MENU_QUERY = graphql(`
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
`);

type HeaderMenu = ResultOf<typeof HEADER_MENU_QUERY>["mdxMenu"];
type HeaderMenuData = { data: ResultOf<typeof HEADER_MENU_QUERY> };
type HeaderMenuVariables = VariablesOf<typeof HEADER_MENU_QUERY>;

async function getHeaderMenu(): Promise<HeaderMenu> {
  const { data } = await client.request<HeaderMenuData, HeaderMenuVariables>({
    query: HEADER_MENU_QUERY,
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

const iconMap: Record<string, React.JSX.Element> = {
  github: <GithubIcon className="h-6 w-6" />,
};

function Logo() {
  return (
    <div className="logo flex">
      <Link
        href="/"
        className="text-black dark:text-zinc-100 text-l font-extrabold no-underline hover:underline"
      >
        <ImageIcon className="h-6 w-6 text-red-500 dark:text-red-400 float-left mr-2" />
        <span>next-image-plus</span>
      </Link>
    </div>
  );
}

export async function Header() {
  const id = "next-image-plus-docs__header";

  const menu = await getHeaderMenu();

  if (!menu) {
    return null;
  }

  const menuItems = menu.items;

  return (
    <GraphineryUiHeader
      main={
        <>
          <Logo />
          {menuItems && (
            <DesktopNavigation
              id={id}
              menuItems={menuItems as any}
              menuLinkAs={Link}
              iconMap={iconMap}
            />
          )}
        </>
      }
      utility={
        <>
          <ThemeToggle />
          <Link
            href="https://github.com/wluisi/next-image-plus"
            target="_blank"
            className="text-black dark:text-zinc-100 p-2 rounded-md no-underline hover:bg-zinc-200 dark:hover:bg-zinc-700"
            aria-label="github link"
          >
            <GithubIcon className="h-5 w-5" />
          </Link>
          {menuItems && (
            <MobileNavigation
              id={id}
              menuItems={menuItems as any}
              menuLinkAs={Link}
            />
          )}
        </>
      }
    />
  );
}
