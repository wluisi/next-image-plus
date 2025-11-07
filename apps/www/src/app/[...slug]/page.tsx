import * as React from "react";

import { getPathFromParams } from "@graphinery/core";

import { client } from "../../graphinery";
import { notFound } from "next/navigation";

import { GraphineryMdx } from "@graphinery/mdx";
import { componentsMap } from "../../components/components-map";
import { Grid, GridItem, TableOfContents, cn } from "@graphinery/ui";
import SidebarMenu from "../../components/sidebar-menu";
import { Breadcrumb, BreadcrumbFragment } from "./../../components/breadcrumb";

// Metadata
import { metadata as layoutMetadata } from "../layout";
import { Metadata } from "next";

import { mergeToc } from "./../../utils/merge-toc";

import { graphql, ResultOf, VariablesOf } from "./../../types";

const PAGE_QUERY = graphql(
  `
    query PageQuery($path: String) {
      page(path: $path) {
        internalId
        title
        description
        keywords
        path
        status
        ...Breadcrumb
        content
        propsDoc {
          id
          internalId
          title
          content
          toc {
            items {
              id
              title
              level
            }
          }
        }
        toc {
          items {
            id
            title
            level
          }
        }
      }
    }
  `,
  [BreadcrumbFragment]
);

export type Page = ResultOf<typeof PAGE_QUERY>["page"];
type PageData = { data: ResultOf<typeof PAGE_QUERY> };
type PageVariables = VariablesOf<typeof PAGE_QUERY>;

// type PageToc = NonNullable<Page>["toc"];
// type PagePropsDoc = NonNullable<Page>["propsDoc"];

async function getPage(path: string): Promise<Page> {
  const { data } = await client.request<PageData, PageVariables>({
    query: PAGE_QUERY,
    variables: {
      path: path,
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
  const PAGE_SLUGS_QUERY = graphql(`
    query PageQuery($limit: Int, $filter: PageQueryFilter) {
      pageCollection(limit: $limit, filter: $filter) {
        items {
          id
          slug
        }
      }
    }
  `);

  type PageCollectionData = { data: ResultOf<typeof PAGE_SLUGS_QUERY> };
  type PageCollectionVariables = VariablesOf<typeof PAGE_SLUGS_QUERY>;

  const { data } = await client.request<
    PageCollectionData,
    PageCollectionVariables
  >({
    query: PAGE_SLUGS_QUERY,
    variables: {
      limit: 400,
      filter: {
        status: { _eq: true },
        path: { _neq: "/" },
        slug: { _nin: ["examples-pages"] },
      },
    },
  });

  const slugs: { slug: string[] }[] = [];
  data.pageCollection?.items?.forEach((page) => {
    if (page) {
      slugs.push({
        slug: page.slug,
      });
    }
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
          <Breadcrumb page={page} currentPath={page.path} />
          {page.content && (
            <GraphineryMdx
              mdx={page.content}
              components={{
                ...componentsMap,
              }}
            />
          )}
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
        {page.toc && page.propsDoc && (
          <TableOfContents data={mergeToc(page.toc, page.propsDoc)} />
        )}
      </GridItem>
    </Grid>
  );
}
