import * as React from "react";

import {
  GithubIcon,
  ImageIcon,
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "./../components/ui";
import Link from "next/link";

const githubMenuItem = {
  url: "https://github.com/wluisi/next-image-extras",
  ariaLabel: "Go to next-image-extras github page",
};

interface MenuItem {
  id: string;
  title: string;
  url: string;
}

interface HeaderProps {
  id: string;
  menuItems: MenuItem[];
}

function Logo() {
  return (
    <div className="logo flex">
      <Link
        href="/"
        className="text-black text-l font-extrabold no-underline hover:underline"
      >
        <ImageIcon className="h-6 w-6 text-red-500 float-left mr-1" />
        <span>next-image-plus</span>
      </Link>
    </div>
  );
}

export function Header({ id, menuItems }: HeaderProps) {
  return (
    <header
      role="banner"
      className="border-b-[1px] border-b-gray-300 py-3 items-center"
    >
      <div className="container mx-auto px-3">
        <div className="flex justify-between px-5">
          <Logo />
          <NavigationMenu id={`menu__${id}`}>
            <NavigationMenuList className="flex list-none">
              {menuItems.map((item: MenuItem) => {
                return (
                  <NavigationMenuItem key={item.id} className="pr-5">
                    <NavigationMenuLink as={Link} href={item.url}>
                      {item.title}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                );
              })}
              <NavigationMenuItem className="pr-5">
                <NavigationMenuLink
                  as={Link}
                  href={githubMenuItem.url}
                  aria-label={githubMenuItem.ariaLabel}
                >
                  <GithubIcon className="h-6 w-6" />
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </header>
  );
}
