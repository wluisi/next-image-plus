import * as React from "react";
import {
  Heading,
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from "@graphinery/ui";
import { SidebarMenu as GraphineryUiSidebarMenu } from "@graphinery/ui";

import Link from "next/link";

interface MenuItem {
  id: string;
  title: string;
  url: string;
}

interface SidebarMenuProps {
  id: string;
  title: string;
  menuItems: MenuItem[];
}

export default function SidebarMenu({
  id,
  title,
  menuItems,
}: SidebarMenuProps) {
  return (
    <GraphineryUiSidebarMenu
      id="test"
      currentPath={"whatever"}
      menuItems={menuItems}
      linkAs={Link}
    />
    // <NavigationMenu id={id} className="mt-3">
    //   <Heading level="h3" className="text-1xl mb-1">
    //     {title}
    //   </Heading>
    //   <NavigationMenuList>
    //     {menuItems.map((item: MenuItem) => {
    //       return (
    //         <NavigationMenuItem key={item.id} className="pr-5">
    //           <NavigationMenuLink as={Link} href={item.url}>
    //             {item.title}
    //           </NavigationMenuLink>
    //         </NavigationMenuItem>
    //       );
    //     })}
    //   </NavigationMenuList>
    // </NavigationMenu>
  );
}
