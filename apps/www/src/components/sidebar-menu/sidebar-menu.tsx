import * as React from "react";
import {
  Heading,
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from "./../ui";

export default function SidebarMenu() {
  return (
    <NavigationMenu id="docs-sidebar-menu" className="mt-3">
      <Heading level="h3" className="text-1xl mb-1">
        Navigation
      </Heading>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink href="#introduction">
            Introduction
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#picture-component">
            Picture Component
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#background-image-component">
            Background Image Component
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
