"use server";

import * as React from "react";

import { gql } from "@graphinery/client";
import { client } from "./../../graphinery";

import {
  GithubIcon,
  ImageIcon,
  DesktopNavigation,
  Header as GraphineryUiHeader,
  MobileNavigation,
  ThemeToggle,
} from "@graphinery/ui";
import Link from "next/link";

const HEADER_MENU_QUERY = gql`
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

async function getHeaderMenu() {
  const { data } = await client.request({
    query: HEADER_MENU_QUERY,
    variables: {
      filter: {
        path: { _neq: "/examples-pages" },
        parent: { _neq: "/examples-pages" },
        // status: { _eq: true }
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
        <ImageIcon className="h-6 w-6 text-red-500 dark:text-red-400 float-left mr-1" />
        <span>next-image-plus</span>
      </Link>
    </div>
  );
}

export async function Header() {
  const id = "next-image-plus-docs__header";

  const menu = await getHeaderMenu();
  const menuItems = menu?.items;

  return (
    <GraphineryUiHeader
      main={
        <>
          <Logo />
          <DesktopNavigation
            id={id}
            menuItems={menuItems}
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
          <MobileNavigation id={id} menuItems={menuItems} menuLinkAs={Link} />
        </>
      }
    />
  );
}
