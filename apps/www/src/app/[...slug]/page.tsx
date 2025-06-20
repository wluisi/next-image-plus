import * as React from "react";

import { gql } from "@graphinery/client";
import { getPathFromParams } from "@graphinery/core";

import { client } from "../../graphinery";
import { notFound } from "next/navigation";

import { GraphineryMdx } from "@graphinery/mdx";
import { componentsMap } from "../../components/components-map";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Grid,
  GridItem,
  HomeIcon,
  TableOfContents,
  cn,
} from "@graphinery/ui";
import SidebarMenu from "../../components/sidebar-menu";

// Metadata
import { metadata as layoutMetadata } from "../layout";
import { Metadata } from "next";

const PAGE_QUERY = gql`
  query PageQuery($id: String) {
    page(id: $id) {
      title
      description
      keywords
      path
      status
      activeTrail {
        items {
          id
          title
          path
        }
      }
      content
      toc {
        items {
          id
          title
          level
        }
      }
    }
  }
`;

async function getPage(path: string) {
  const { data } = await client.request({
    query: PAGE_QUERY,
    variables: {
      id: path,
    },
    options: {
      next: { tags: [path] },
    },
  });

  return data.page;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata | undefined> {
  const path = getPathFromParams({ params: await params });
  const page = await getPage(path);

  if (!page || page.status === false) {
    return;
  }

  return {
    title: page.title,
    description: page.description,
    abstract: page.description,
    keywords: page.keywords,
    // This sets the `<link rel="canonical">`.
    alternates: {
      canonical: page.path,
    },
    openGraph: {
      ...layoutMetadata.openGraph,
      title: page.title,
      description: page.description,
      url: page.path,
    },
    twitter: {
      ...layoutMetadata.twitter,
      title: page.title,
      description: page.description,
    },
  };
}

export async function generateStaticParams() {
  const PAGE_SLUGS_QUERY = gql`
    query PageQuery($limit: Int, $filter: PageQueryFilter) {
      pageCollection(limit: $limit, filter: $filter) {
        items {
          id
          uuid
          path
          slug
        }
      }
    }
  `;

  const { data } = await client.request({
    query: PAGE_SLUGS_QUERY,
    variables: {
      limit: 400,
      filter: {
        status: { _eq: true },
        path: { _neq: "/" },
        slug: { _nin: "examples-pages" },
      },
    },
  });

  const slugs: { slug: string[] }[] = [];
  data.pageCollection?.items?.forEach((page: { slug: string[] }) => {
    slugs.push({
      slug: page.slug,
    });
  });

  return slugs;
}

export default async function CatchAllSlugPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const path = getPathFromParams({ params: await params });
  const page = await getPage(path);

  if (!page || page.status === false) {
    notFound();
  }

  return (
    <Grid
      id="grid"
      className="md:grid md:grid-cols-12 md:grid-flow-col gap-5 pb-10"
    >
      <GridItem
        id="left-sidebar"
        as="aside"
        aria-label="Primary navigation"
        className="hidden md:flex md:col-span-2 md:h-screen md:sticky md:top-[var(--navbar-height)]"
      >
        <SidebarMenu currentPath={path} />
      </GridItem>
      <GridItem
        id="main-content"
        className={cn(
          "md:col-span-10 lg:col-span-8 pb-10 md:px-10",
          path === "/examples/background-image" && "lg:col-span-10",
          path === "/blog" && "lg:col-span-8"
        )}
      >
        <article className="space-y-5 prose dark:prose-invert">
          <Breadcrumb className="m-auto max-w-xxl">
            {page?.activeTrail?.items?.map(
              (item: { id: string; path: string; title: string }) => {
                const itemTitle =
                  item.path === "/" ? (
                    <HomeIcon className="h-4 w-4 text-black dark:text-zinc-100 mt-[2px]" />
                  ) : (
                    item.title
                  );

                return (
                  <BreadcrumbItem key={item.path}>
                    <BreadcrumbLink
                      as={Link}
                      href={item.path}
                      isCurrentPage={item.path === page.path}
                      ariaLabel={item.path === "/" ? "Home" : null}
                    >
                      {itemTitle}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                );
              }
            )}
          </Breadcrumb>
          <GraphineryMdx
            mdx={page.content}
            components={{
              ...componentsMap,
            }}
          />
        </article>
      </GridItem>
      <GridItem
        id="right-sidebar"
        as="aside"
        className={cn(
          "hidden lg:flex lg:col-span-2 md:h-screen md:sticky md:top-[var(--navbar-height)]",
          path === "/docs" && "!hidden",
          path === "/examples" && "!hidden",
          path === "/examples/picture" && "!hidden",
          path === "/examples/background-image" && "!hidden",
          path === "/blog" && "!hidden"
        )}
      >
        <TableOfContents data={page.toc.items} />
      </GridItem>
    </Grid>
  );
}
