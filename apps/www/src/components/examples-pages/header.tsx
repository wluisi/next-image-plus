import * as React from "react";

import {
  GithubIcon,
  ImageIcon,
  DesktopNavigation,
  Header as GraphineryUiHeader,
  MobileNavigation,
  ThemeToggle,
} from "@graphinery/ui";
import Link from "next/link";

import { getCollection } from "../../cc/collection";
import { getContentTree } from "../../cc/content-tree";

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

export default function Header() {
  const id = "next-image-plus-docs__header";

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
    <GraphineryUiHeader
      main={
        <>
          <Logo />
          {menuItems && (
            <DesktopNavigation
              id={id}
              menuItems={menuItems}
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
            <MobileNavigation id={id} menuItems={menuItems} menuLinkAs={Link} />
          )}
        </>
      }
    />
  );
}
