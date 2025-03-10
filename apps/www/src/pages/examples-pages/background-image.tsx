import * as React from "react";
import Hero from "./../../components/examples/Hero";
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
    title: "Background Image (Pages Router)",
    url: "/examples-pages/background-image",
    isCurrentPage: true,
  },
];

export default function ExamplesPagesBackgroundImage() {
  return (
    <>
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
        <GridItem id="main-content" className="md:col-span-10 pb-10 md:px-10">
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
              Background image example (Pages Router)
            </h1>
            <p>
              This is an exmaple of a Hero component with a background image.
            </p>
            <Hero
              title="Background image example"
              description="Create stunning websites and applications with our powerful platform. Get started today and bring your ideas to life."
            />
          </article>
        </GridItem>
      </Grid>
    </>
  );
}
