import * as React from "react";

import { useQuery } from "@graphinery/client/react";
import { client } from "../../graphinery";
import { graphql, ResultOf, VariablesOf } from "../../types";

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
  SidebarMenuData,
  SidebarMenuVariables,
} from "../../components/examples-pages/sidebar-menu";
import {
  HEADER_MENU_QUERY,
  HeaderMenuData,
  HeaderMenuVariables,
} from "../../components/examples-pages/header";

// Mdx
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { componentsMap } from "../../components/components-map";
import { default as ExamplesCardGrid } from "../../components/examples/card-grid";
import { default as ExamplesHero } from "../../components/examples/hero";

import { GetStaticPropsContext } from "next";

const PAGE_QUERY = graphql(`
  query PageQuery($path: String) {
    page(path: $path) {
      id
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
`);

type PageData = { data: ResultOf<typeof PAGE_QUERY> };
type PageVariables = VariablesOf<typeof PAGE_QUERY>;

export default function ExamplePagesSlug({
  mdx,
}: {
  mdx: MDXRemoteSerializeResult;
}) {
  const router = useRouter();
  const { slug } = router?.query;

  const { isLoading, isError, data } = useQuery<
    PageData["data"],
    PageVariables
  >(PAGE_QUERY, {
    queryKey: ["page", "examples-pages", slug as string],
    variables: {
      path: `/examples-pages/${slug}`,
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

  const page = data?.page;

  if (!page) {
    return null;
  }

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
            {page.activeTrail?.items?.map((item) => {
              if (!item) {
                return null;
              }

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
            })}
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
  const PAGE_SLUGS_QUERY = graphql(`
    query PageSlugsQuery($limit: Int, $filter: PageQueryFilter) {
      pageCollection(limit: $limit, filter: $filter) {
        items {
          id
          internalId
        }
      }
    }
  `);

  type PageSlugsData = { data: ResultOf<typeof PAGE_SLUGS_QUERY> };
  type PageSlugsVariables = VariablesOf<typeof PAGE_SLUGS_QUERY>;

  const { data } = await client.request<PageSlugsData, PageSlugsVariables>({
    query: PAGE_SLUGS_QUERY,
    variables: {
      limit: 400,
      filter: {
        path: { _neq: "/examples-pages" },
        slug: { _in: ["examples-pages"] },
      },
    },
  });

  const pageCollection = data?.pageCollection;

  const paths = (() => {
    if (!pageCollection || !pageCollection.items) {
      return [];
    }

    const nonNullItems = pageCollection.items.filter(
      (item): item is NonNullable<typeof item> => item !== null
    );

    const mappedPaths = nonNullItems.map((page) => {
      return {
        params: {
          slug: page.internalId,
        },
      };
    });

    return mappedPaths;
  })();

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
    return {
      notFound: true,
    };
  }

  const { data } = await client.request<PageData, PageVariables>({
    query: PAGE_QUERY,
    queryKey: ["page", "examples-pages", slug],
    variables: {
      path: `/examples-pages/${slug}`,
    },
  });

  const page = data?.page;
  const mdx = page?.content
    ? await serialize(page.content, {
        parseFrontmatter: true,
      })
    : null;

  // Prefetch sidebar menu.
  await client.request<SidebarMenuData, SidebarMenuVariables>({
    query: SIDEBAR_MENU_QUERY,
    queryKey: ["pages-sidebar-menu"],
    variables: {
      filter: {
        status: { _eq: true },
        collection: { _all_in: ["page"] },
      },
      sort: { field: "weight", direction: "ASC" },
    },
  });

  // Prefetch header menu.
  await client.request<HeaderMenuData, HeaderMenuVariables>({
    query: HEADER_MENU_QUERY,
    queryKey: ["pages-header-menu"],
    variables: {
      filter: {
        status: { _eq: true },
        collection: { _all_in: ["page"] },
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
