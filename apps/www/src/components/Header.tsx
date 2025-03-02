import * as React from "react";

import {
  GithubIcon,
  // Heading,
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from "./../components/ui";
import Link from "next/link";

const menuItems = [
  {
    id: "item-1",
    url: "/docs",
    title: "Documentation",
  },
  {
    id: "item-2",
    url: "/about",
    title: "About",
  },
];

export function Header() {
  const menuId = "headerNavigationMenuLabel";

  return (
    <header
      role="banner"
      className="border-b-[1px] border-b-gray-300 py-3 items-center"
    >
      <div className="container mx-auto px-5">
        <div className="flex justify-between px-5">
          <Link
            href="/"
            className="text-black text-l font-extrabold no-underline hover:underline"
          >
            next-image-extras
          </Link>
          <NavigationMenu id={menuId}>
            {/* <Heading id={menuId} level="h2" className="text-2xl mb-5">
            Hello menu title?
          </Heading> */}
            <NavigationMenuList className="flex list-none">
              {menuItems.map((item: any) => {
                return (
                  <NavigationMenuItem key={item.id} className="pr-5">
                    <NavigationMenuLink
                      as={Link}
                      href={item.url}
                      // isCurrentPage={currentPath === item.url}
                    >
                      {item.title}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                );
              })}
              <NavigationMenuItem className="pr-5">
                <NavigationMenuLink
                  as={Link}
                  href="https://github.com/wluisi/graphinery"
                  aria-label="Go to graphinery github page"
                  // isCurrentPage={currentPath === item.url}
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
