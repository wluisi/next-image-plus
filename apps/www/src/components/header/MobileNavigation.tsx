"use client";

import * as React from "react";

import * as Popover from "@radix-ui/react-popover";
import {
  CloseIcon,
  HamburgerMenuIcon,
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../ui";
import Link from "next/link";

import { sidebarMenu } from "../../__content/sidebar-menu";

interface MenuItem {
  id: string;
  title: string;
  url: string;
}

export default function MobileNavigation() {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="md:hidden">
      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger asChild>
          <button className="popover-button align-sub" aria-label="Open menu">
            <HamburgerMenuIcon className="h-6 w-6" />
          </button>
        </Popover.Trigger>
        <Popover.Portal>
          <>
            <div className="popover-backdrop fixed inset-0 z-50 bg-zinc-800/40 backdrop-blur-sm duration-150 data-[closed]:opacity-0 data-[open]:ease-out data-[closed]:ease-in dark:bg-black/80" />
            <Popover.Content
              align="center"
              className="popover-content inset-x-4 z-50 w-screen rounded-3xl p-6 ring-4 ring-zinc-900/5 bg-popover text-popover-foreground outline-none bg-white duration-600 data-[closed]:scale-95 data-[closed]:opacity-0 data-[open]:ease-in data-[closed]:ease-out"
            >
              <div className="flex flex-row-reverse items-center justify-between mb-5">
                <Popover.Close className="popover-close" aria-label="Close">
                  {/* Close */}
                  <CloseIcon className="h-4 w-4" />
                </Popover.Close>
                <h2 className="text-sm font-medium mb-0">Navigation</h2>
              </div>
              <div>
                <NavigationMenu id="whatever">
                  <NavigationMenuList className="list-none pl-0">
                    {sidebarMenu.items.map((item: MenuItem) => {
                      return (
                        <NavigationMenuItem
                          key={item.id}
                          className="py-2 border-b border-slate-200"
                        >
                          <NavigationMenuLink
                            as={Link}
                            href={item.url}
                            // Close popover when link is clicked
                            onClick={() => setOpen(false)}
                          >
                            {item.title}
                          </NavigationMenuLink>
                        </NavigationMenuItem>
                      );
                    })}
                  </NavigationMenuList>
                </NavigationMenu>
              </div>
            </Popover.Content>
          </>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
}
