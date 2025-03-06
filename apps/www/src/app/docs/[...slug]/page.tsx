import { getContent } from "./../../../utils/get-content";
import { sidebarMenu } from "./../../../__content/sidebar-menu";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Grid,
  GridItem,
} from "./../../../components/ui";
import TableOfContents from "./../../../components/table-of-contents";
import SidebarMenu from "../../../components/SidebarMenu";
import Link from "next/link";

import { metadataBase } from "./../../../__content/metadata";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata | undefined> {
  const slug = (await params).slug[0];
  const page = await getContent(slug);

  const { title, description, keywords } = page.frontmatter;
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

export default async function DocsSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug[0];
  const page = await getContent(slug);

  const breadcrumbs = [
    {
      title: "Home",
      url: "/",
      isCurrentPage: false,
    },
    {
      title: "Docs",
      url: "/docs",
      isCurrentPage: false,
    },
    {
      title: page.frontmatter.title as string,
      url: `/docs/${slug}`,
      isCurrentPage: true,
    },
  ];

  return (
    <Grid
      id="grid"
      className="md:grid md:grid-cols-12 md:grid-flow-col gap-5 pb-10"
    >
      <GridItem id="left-sidebar" as="aside" className="md:col-span-2">
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
          {page.content}
        </article>
      </GridItem>
      <GridItem id="left-sidebar" as="aside" className="md:col-span-2">
        <TableOfContents data={page.toc} />
      </GridItem>
    </Grid>
  );
}
