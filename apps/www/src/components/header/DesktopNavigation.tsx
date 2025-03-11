import {
  GithubIcon,
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../ui";
import Link from "next/link";

interface MenuItem {
  id: string;
  title: string;
  url: string;
}

interface DesktopNavigationProps {
  id: string;
  menuItems: MenuItem[];
}

const githubMenuItem = {
  url: "https://github.com/wluisi/next-image-plus",
  ariaLabel: "Go to next-image-plus github page",
};

export default function DesktopNavigation({
  id,
  menuItems,
}: DesktopNavigationProps) {
  return (
    <NavigationMenu
      id={`menu__${id}`}
      className="pointer-events-auto hidden md:block"
    >
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
        <NavigationMenuItem>
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
  );
}
