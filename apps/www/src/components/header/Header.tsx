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

interface MenuItem {
  id: string;
  title: string;
  url: string;
}

interface HeaderProps {
  id: string;
  menuItems: MenuItem[];
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

export function Header({ id, menuItems }: HeaderProps) {
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
            href="https://github.com/wluisi/graphinery"
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
