"use client";

import Link from "next/link";
import {
  MobileNavigation as GraphineryUiMobileNavigation,
  type MenuItems,
} from "@graphinery/ui";

interface HeaderMobileNavProps {
  id: string;
  menuItems: MenuItems;
}

export function MobileNavigation({ id, menuItems }: HeaderMobileNavProps) {
  return (
    <GraphineryUiMobileNavigation
      id={id}
      menuItems={menuItems}
      menuLinkAs={Link}
    />
  );
}
