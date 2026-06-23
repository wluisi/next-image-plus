"use client";

import Link from "next/link";
import {
  MobileNavigation as GraphineryUiMobileNavigation,
  type MenuItems,
} from "@graphinery/ui";

interface HeaderMobileNavigationProps {
  id: string;
  menuItems: MenuItems;
}

export function HeaderMobileNavigation({
  id,
  menuItems,
}: HeaderMobileNavigationProps) {
  return (
    <GraphineryUiMobileNavigation
      id={id}
      menuItems={menuItems}
      menuLinkAs={Link}
    />
  );
}
