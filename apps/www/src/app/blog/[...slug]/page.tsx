import * as React from "react";

import { gql } from "@graphinery/client";
import { getPathFromParams } from "@graphinery/core";

import { client } from "../../../graphinery";
import { notFound } from "next/navigation";

import { GraphineryMdx } from "@graphinery/mdx";
import { componentsMap } from "../../../components/components-map";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Grid,
  GridItem,
  Heading,
  HomeIcon,
  TableOfContents,
  cn,
} from "@graphinery/ui";
import SidebarMenu from "../../../components/sidebar-menu";
import Tag from "./../../../components/shared/tag";
import AuthorInfo from "./../../../components/shared/author-info";
import formatDate from "./../../../utils/format-date";

// Metadata
import { metadata as layoutMetadata } from "../../layout";
import { Metadata } from "next";

const BLOG_QUERY = gql`
  query BlogQuery($id: String) {
    blog(id: $id) {
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
      toc {
        items {
          id
          title
          level
        }
      }
      publishedDate
      tags {
        id
        path
        title
      }
    }
  }
`;

async function getBlog(path: string) {
  const { data } = await client.request({
    query: BLOG_QUERY,
    variables: {
      id: path,
    },
    options: {
      next: { tags: [path] },
    },
  });

  return data.blog;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata | undefined> {
  const path = getPathFromParams({ pathPrefix: "blog", params: await params });
  const blog = await getBlog(path);

  if (!blog) {
    return;
  }

  return {
    title: blog.title,
    description: blog.description,
    abstract: blog.description,
    keywords: blog.keywords,
    // This sets the `<link rel="canonical">`.
    alternates: {
      canonical: blog.path,
    },
    openGraph: {
      ...layoutMetadata.openGraph,
      title: blog.title,
      description: blog.description,
      url: blog.path,
    },
    twitter: {
      ...layoutMetadata.twitter,
      title: blog.title,
      description: blog.description,
    },
  };
}

export async function generateStaticParams() {
  const BLOG_SLUGS_QUERY = gql`
    query BlogSlugsQuery($limit: Int, $filter: BlogQueryFilter) {
      blogCollection(limit: $limit, filter: $filter) {
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
    query: BLOG_SLUGS_QUERY,
    variables: {
      limit: 400,
    },
  });

  const slugs: { slug: string[] }[] = [];
  data.blogCollection?.items?.forEach((blog: { slug: string[] }) => {
    slugs.push({
      slug: blog.slug,
    });
  });

  return slugs;
}

export default async function BlogSlug({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const path = getPathFromParams({ pathPrefix: "blog", params: await params });
  const blog = await getBlog(path);

  if (!blog) {
    notFound();
  }

  const activeTrail = blog.activeTrail.items;
  activeTrail.pop();

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
        <SidebarMenu currentPath="/blog" />
      </GridItem>
      <GridItem
        id="main-content"
        className={cn("md:col-span-10 lg:col-span-8 pb-10 md:px-10")}
      >
        <article className="space-y-5 prose dark:prose-invert">
          <Breadcrumb className="m-auto max-w-xxl">
            {activeTrail.map(
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
                      isCurrentPage={item.path === blog.path}
                    >
                      {itemTitle}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                );
              }
            )}
          </Breadcrumb>

          <div className="flex items-center">
            {blog.tags.length > 0 && <Tag>{blog.tags[0].title}</Tag>}
            <div className="pl-3 text-sm text-zinc-700 dark:text-zinc-300">
              {formatDate(blog.publishedDate)}
            </div>
          </div>
          <Heading level="h1" className="!mt-3 !mb-6">
            {blog.title}
          </Heading>
          <AuthorInfo fullName="William Luisi" handle="@wluisi" />

          <GraphineryMdx
            mdx={blog.content}
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
          "hidden lg:flex lg:col-span-2 md:h-screen md:sticky md:top-[var(--navbar-height)]"
        )}
      >
        <TableOfContents data={blog.toc.items} />
      </GridItem>
    </Grid>
  );
}
