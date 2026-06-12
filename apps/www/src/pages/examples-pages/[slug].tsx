import * as React from "react";

import Link from "next/link";

import {
  SidebarMenu as GraphineryUiSidebarMenu,
  Grid,
  GridItem,
  cn,
} from "@graphinery/ui";

import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { componentsMap } from "../../components/components-map";
import { default as ExamplesCardGrid } from "../../components/examples/card-grid";
import { default as ExamplesHero } from "../../components/examples/hero";

import { Breadcrumb } from "../../components/breadcrumb";

import { getCollection, getEntry } from "../../cc/collection";
import { getContentTree } from "../../cc/content-tree";
import type { ContentTreeEntry } from "../../cc/types";

import { GetStaticPropsContext } from "next";

export default function ExamplePagesSlug({
  path,
  mdx,
  menuItems,
}: {
  path: string;
  mdx: MDXRemoteSerializeResult;
  menuItems: ContentTreeEntry[];
}) {
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
        <GraphineryUiSidebarMenu
          id="next-image-plus-docs__sidebar"
          currentPath={path}
          menuItems={menuItems}
          linkAs={Link}
          linkClassNames="decoration-red-400 hover:decoration-red-400"
        />
      </GridItem>
      <GridItem
        id="main-content"
        className={cn(
          "md:col-span-10 lg:col-span-8 pb-10 md:px-10",
          path === "/examples-pages/background-image" && "lg:col-span-10"
        )}
      >
        <article className="space-y-5 prose dark:prose-invert">
          <Breadcrumb currentPath={path} />
          {mdx && (
            <MDXRemote
              {...mdx}
              components={{
                ...componentsMap,
                ExamplesCardGrid,
                ExamplesHero,
              }}
            />
          )}
        </article>
      </GridItem>
    </Grid>
  );
}

export async function getStaticPaths() {
  const pageCollection = getCollection("page", {
    filter: {
      status: { _eq: true },
      _path: { _sw: "/examples-pages/" },
    },
  });

  const paths = (pageCollection ?? [])
    .filter((item): item is NonNullable<typeof item> => item !== null)
    .map((page) => ({
      params: {
        slug: page._path.replace("/examples-pages/", ""),
      },
    }));

  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps = async (
  context: GetStaticPropsContext<{ slug: string }>
) => {
  const slug = context.params?.slug;

  if (!slug) {
    return { notFound: true };
  }

  const path = `/examples-pages/${slug}`;
  const page = getEntry(path, { collection: "page" });

  if (!page || page.status === false) {
    return { notFound: true };
  }

  const mdx = page.content
    ? await serialize(page.content, { parseFrontmatter: true })
    : null;

  const pageCollection = getCollection("page", {
    filter: {
      _and: [
        { _and: [{ status: { _eq: true } }] },
        { _and: [{ _path: { _neq: "/examples-pages" } }] },
        { _and: [{ _path: { _neq: "/examples-pages/picture" } }] },
        { _and: [{ _path: { _neq: "/examples-pages/background-image" } }] },
      ],
    },
    sort: { field: "weight", direction: "ASC" },
  });

  const menuItems = getContentTree(pageCollection);

  return {
    props: {
      path,
      mdx,
      menuItems,
    },
  };
};
