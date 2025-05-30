import { getContent } from "./../../utils/get-content";
import { sidebarMenu } from "../../__content-og/sidebar-menu";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Grid,
  GridItem,
  TableOfContents,
} from "@graphinery/ui";
import SidebarMenu from "../../components/SidebarMenu";
import Link from "next/link";

import type { Metadata } from "next";
import { metadataBase } from "../../__content-og/metadata";

const breadcrumbs = [
  {
    title: "Home",
    url: "/",
    isCurrentPage: false,
  },
  {
    title: "Docs",
    url: "/docs",
    isCurrentPage: true,
  },
];

export async function generateMetadata(): Promise<Metadata | undefined> {
  const docsPage = await getContent("docs");
  const { title, description, keywords } = docsPage.frontmatter;
  const titleFinal = `${title} | ${metadataBase.siteName}`;

  return {
    title: titleFinal,
    description: description as string,
    abstract: description as string,
    keywords: keywords as string,
    alternates: {
      canonical: metadataBase.url,
    },
    openGraph: {
      title: titleFinal,
      description: description as string,
      type: "website",
      siteName: metadataBase.siteName,
      url: metadataBase.url,
    },
    twitter: {
      title: titleFinal,
      description: description as string,
      card: "summary",
      site: metadataBase.url,
      creator: metadataBase.twitterHandle,
    },
  };
}

export default async function DocsPage() {
  const page = await getContent("docs");

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
      <GridItem
        id="main-content"
        className="md:col-span-10 lg:col-span-8 pb-10 md:px-10"
      >
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
          {page.content}
        </article>
      </GridItem>
      <GridItem
        id="right-sidebar"
        as="aside"
        className="hidden lg:flex lg:col-span-2 md:h-screen md:sticky md:top-[var(--navbar-height)]"
      >
        <TableOfContents data={page.toc} />
      </GridItem>
    </Grid>
  );
}
