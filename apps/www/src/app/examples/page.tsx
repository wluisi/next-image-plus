import * as React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Grid,
  GridItem,
} from "@graphinery/ui";
import SidebarMenu from "../../components/SidebarMenu";
import Link from "next/link";

import { sidebarMenu } from "./../../__content/sidebar-menu";
import { metadataBase } from "./../../__content/metadata";

const content = {
  title: "Examples",
  description: "Component examples for next-image-plus",
};

const metaTitle = `${content.title} | ${metadataBase.siteName}`;
export const metadata = {
  title: metaTitle,
  description: content.description,
  abstract: content.description,
  keywords: "next, react, nextjs, responsive images, typescript",
  alternates: {
    canonical: metadataBase.url,
  },
  openGraph: {
    title: metaTitle,
    description: content.description,
    type: "website",
    siteName: metadataBase.siteName,
    url: metadataBase.url,
  },
  twitter: {
    title: metaTitle,
    description: content.description,
    card: "summary",
    site: metadataBase.url,
    creator: metadataBase.twitterHandle,
  },
};

const breadcrumbs = [
  {
    title: "Home",
    url: "/",
    isCurrentPage: false,
  },
  {
    title: "Examples",
    url: "/examples",
    isCurrentPage: true,
  },
];

export default async function ExamplesPage() {
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
        <article className="space-y-5 prose dark:prose-invert">
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
          <h1 className="text-4xl font-bold mb-5">{content.title}</h1>
          <p>{content.description}</p>
          <ul>
            <li>
              <Link href="/examples/picture">Picture</Link>
            </li>
            <li>
              <Link href="/examples/background-image">Background Image</Link>
            </li>
            <li>
              <Link href="/examples-pages/picture">Picture (Pages router)</Link>
            </li>
            <li>
              <Link href="/examples-pages/background-image">
                Background Image (Pages router)
              </Link>
            </li>
          </ul>
        </article>
      </GridItem>
    </Grid>
  );
}
