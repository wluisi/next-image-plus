import * as React from "react";

import { getPathFromParams } from "@graphinery/core";

import { notFound } from "next/navigation";

import { GraphineryMdx } from "@graphinery/mdx";
import { componentsMap } from "../../components/components-map";
import { Grid, GridItem, TableOfContents, cn } from "@graphinery/ui";
import SidebarMenu from "../../components/sidebar-menu";
import { Breadcrumb } from "./../../components/breadcrumb";

// Metadata
import { metadata as layoutMetadata } from "../layout";
import { Metadata } from "next";

import { mergeToc } from "./../../utils/merge-toc";

// Content collections
import { getCollection, getEntry } from "../../cc/collection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata | undefined> {
  const path = getPathFromParams({ params: await params });
  const page = getEntry(path, { collection: "page" });

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
      canonical: page._path,
    },
    openGraph: {
      ...layoutMetadata.openGraph,
      title: page.title,
      description: page.description,
      url: page._path,
    },
    twitter: {
      ...layoutMetadata.twitter,
      title: page.title,
      description: page.description,
    },
  };
}

export async function generateStaticParams() {
  const pageCollection = getCollection("page", {
    filter: {
      status: { _eq: true },
      path: { _neq: "/" },
      slug: { _nin: ["examples-pages"] },
    },
  });

  const slugs: { slug: string[] }[] = [];
  pageCollection?.forEach((page) => {
    if (page) {
      slugs.push({
        slug: page._slug,
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
  const page = getEntry(path, { collection: "page" });

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
          <Breadcrumb currentPath={page._path} />
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
        {/* {page.toc && page.propsDoc && (
          <TableOfContents data={mergeToc(page.toc, page.propsDoc)} />
        )} */}
      </GridItem>
    </Grid>
  );
}
