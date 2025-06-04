import * as React from "react";

// Graphinery
import { gql } from "@graphinery/client";
import { useQuery } from "@graphinery/client/react";
import { client } from "../../graphinery";

// Next
import { useRouter } from "next/router";
import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Grid,
  GridItem,
  HomeIcon,
  cn,
} from "@graphinery/ui";

import SidebarMenu, {
  SIDEBAR_MENU_QUERY,
} from "../../components/examples-pages/sidebar-menu";
import { HEADER_MENU_QUERY } from "../../components/examples-pages/header";

// Mdx
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import { componentsMap } from "../../components/components-map";
import { default as ExamplesCardGrid } from "../../components/examples/card-grid";
import { default as ExamplesHero } from "../../components/examples/hero";

const PAGE_QUERY = gql`
  query PageQuery($id: String) {
    page(id: $id) {
      id
      uuid
      path
      title
      description
      keywords
      path
      activeTrail {
        items {
          id
          title
          path
        }
      }
      content
    }
  }
`;

export default function ExamplePagesSlug({ mdx }: { mdx: any }) {
  const router = useRouter();
  const { slug } = router?.query;

  const { isLoading, isError, data } = useQuery(PAGE_QUERY, {
    queryKey: ["page", "examples-pages", slug as string],
    variables: {
      id: `/examples-pages/${slug}`,
    },
  });

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (isError) {
    return (
      <div>Error, something went wrong. Please try again later. Thank you.</div>
    );
  }

  const page = data.page;

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
        <SidebarMenu currentPath={`/examples-pages/${slug}`} />
      </GridItem>
      <GridItem
        id="main-content"
        className={cn(
          "md:col-span-10 lg:col-span-8 pb-10 md:px-10",
          page.path === "/examples-pages/background-image" && "lg:col-span-10"
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
                    >
                      {itemTitle}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                );
              }
            )}
          </Breadcrumb>
          <MDXRemote
            {...mdx}
            components={{
              ...componentsMap,
              ExamplesCardGrid,
              ExamplesHero,
            }}
          />
        </article>
      </GridItem>
    </Grid>
  );
}

export async function getStaticPaths() {
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
        slug: { _in: "examples-pages" },
      },
    },
  });

  const pageCollection = data?.pageCollection;

  const paths = pageCollection?.items.map((page: { id: string[] }) => ({
    params: { slug: page.id },
  }));

  return {
    paths: paths,
    fallback: false,
  };
}

export const getStaticProps = async (context: any) => {
  const { slug } = context?.params;

  const { data } = await client.request({
    query: PAGE_QUERY,
    queryKey: ["page", "examples-pages", slug],
    variables: {
      id: `/examples-pages/${slug}`,
    },
  });

  const page = data?.page;
  const mdx = await serialize(page?.content, {
    parseFrontmatter: true,
  });

  await client.request({
    query: SIDEBAR_MENU_QUERY,
    queryKey: ["pages-sidebar-menu"],
    variables: {
      filter: {
        status: { _eq: true },
        bundle: { _all_in: ["page"] },
      },
      sort: { field: "weight", direction: "ASC" },
    },
  });

  // Prefetch header
  await client.request({
    query: HEADER_MENU_QUERY,
    queryKey: ["pages-header-menu"],
    variables: {
      filter: {
        status: { _eq: true },
        bundle: { _all_in: ["page"] },
        path: { _neq: "/examples-pages" },
        parent: { _neq: "/examples-pages" },
      },
      sort: { field: "weight", direction: "ASC" },
    },
  });

  return {
    props: {
      initialState: client.getCache(),
      mdx: mdx,
    },
  };
};
