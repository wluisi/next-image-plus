import * as React from "react";
import {
  Heading,
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from "./../ui";

export type TableOfContentsItem = {
  id: string;
  title: string;
  level: string;
};

export type TableOfContentsProps = {
  data: TableOfContentsItem[];
};

export default function TableOfContents({ data }: TableOfContentsProps) {
  return (
    <div id="toc-navigation-menu">
      <NavigationMenu id="docs-toc" className="mt-3">
        <Heading level="h3" className="text-1xl mb-1">
          On this page
        </Heading>
        <NavigationMenuList>
          {data.map((item: TableOfContentsItem, index) => {
            const childClasses = item.level === "h3" ? "ml-5" : "ml-0";

            return (
              <NavigationMenuItem
                key={`${item.id}-${index}`}
                className={childClasses}
              >
                <NavigationMenuLink href={`#${item.id}`}>
                  {item.title}
                </NavigationMenuLink>
              </NavigationMenuItem>
            );
          })}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
