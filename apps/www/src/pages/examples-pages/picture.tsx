import * as React from "react";
import CardGrid from "./../../components/examples/CardGrid";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Grid,
  GridItem,
} from "./../../components/ui";
import SidebarMenu from "../../components/SidebarMenu";
import Link from "next/link";

import { sidebarMenu } from "./../../__content/sidebar-menu";

const breadcrumbs = [
  {
    title: "Home",
    url: "/",
    isCurrentPage: false,
  },
  {
    title: "Examples (Pages Router)",
    url: "/examples-pages",
    isCurrentPage: false,
  },
  {
    title: "Picture Component (Pages Router)",
    url: "/examples-pages/picture",
    isCurrentPage: true,
  },
];

export default function ExamplesPagesPicture() {
  return (
    <Grid
      id="grid"
      className="md:grid md:grid-cols-12 md:grid-flow-col gap-5 pb-10"
    >
      <GridItem
        id="left-sidebar"
        as="aside"
        className="hidden md:flex md:col-span-2 md:h-screen md:sticky md:top-[var(--navbar-height)]"
      >
        <SidebarMenu
          id={sidebarMenu.id}
          title={sidebarMenu.title}
          menuItems={sidebarMenu.items}
        />
      </GridItem>
      <GridItem id="main-content" className="md:col-span-8 pb-10 md:px-10">
        <article className="space-y-5 prose">
          <Breadcrumb className="m-auto max-w-xxl">
            {breadcrumbs.map((item) => {
              return (
                <BreadcrumbItem key={item.url}>
                  <BreadcrumbLink
                    as={Link}
                    href={item.url}
                    isCurrentPage={item.isCurrentPage}
                  >
                    {item.title}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              );
            })}
          </Breadcrumb>
          <h1 className="text-4xl font-bold mb-5">
            Picture Component Example (Pages Router)
          </h1>
          <CardGrid />
        </article>
      </GridItem>
    </Grid>
  );
}
