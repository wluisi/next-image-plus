"use client";

import * as React from "react";

import * as Popover from "@radix-ui/react-popover";
import {
  GithubIcon,
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
          <button className="popover-button" aria-label="Open menu">
            {/* <MixerHorizontalIcon /> */}
            Menu
          </button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content
            align="center"
            className="popover-content inset-x-4 z-50 w-screen rounded-3xl ring-4 ring-zinc-900/5 bg-popover p-4 text-popover-foreground outline-none bg-white shadow-[0_0_0_12000px_rgba(0,0,0,0.85)]"
            // sideOffset={-10}
            // alignOffset={5}
            // style={{ boxShadow: "0 0 0 12000px rgba(0, 0, 0, 0.85)" }}
          >
            <div className="flex flex-row-reverse items-center justify-between">
              <Popover.Close className="popover-close" aria-label="Close">
                Close
              </Popover.Close>
              <h2 className="text-sm font-medium text-zinc-600">Navigation</h2>
            </div>
            <div>
              <NavigationMenu id="whatever">
                <NavigationMenuList className="list-none">
                  {sidebarMenu.items.map((item: MenuItem) => {
                    return (
                      <NavigationMenuItem key={item.id} className="pr-5 mb-5">
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
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
}
