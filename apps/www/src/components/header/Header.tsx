import * as React from "react";

import { ImageIcon } from "../ui";
import Link from "next/link";

import DesktopNavigation from "./DesktopNavigation";
import MobileNavigation from "./MobileNavigation";

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
      className="border-b-[1px] border-b-gray-300 py-3 items-center sticky top-0 bg-white z-50"
    >
      <div className="container mx-auto px-3">
        <div className="flex justify-between">
          <Logo />
          <DesktopNavigation id={`desktop-nav__${id}`} menuItems={menuItems} />
          <MobileNavigation />
        </div>
      </div>
    </header>
  );
}
