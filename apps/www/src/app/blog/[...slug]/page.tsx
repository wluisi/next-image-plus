import * as React from "react";

import { getPathFromParams } from "@graphinery/core";

import { client } from "../../../graphinery";
import { notFound } from "next/navigation";

import { GraphineryMdx } from "@graphinery/mdx";
import { componentsMap } from "../../../components/components-map";
import {
  Avatar,
  Grid,
  GridItem,
  PostByline,
  PostDateline,
  PostHeader,
  PostLastUpdated,
  PostStack,
  PostTitle,
  TableOfContents,
  cn,
} from "@graphinery/ui";
import SidebarMenu from "../../../components/sidebar-menu";
import formatDate from "./../../../utils/format-date";
import avatarImage from "./../../../images/wluisi-headshot-square.jpg";

// Metadata
import { metadata as layoutMetadata } from "../../layout";
import { Metadata } from "next";

import {
  Breadcrumb,
  BreadcrumbFragment,
} from "./../../../components/blog/breadcrumb";

import {
  TagGroup,
  TagFieldsFragment,
} from "./../../../components/blog/tag-group";

import { graphql, ResultOf, VariablesOf } from "./../../../types";

// @todo Add gql-tada
// - use fragments for
// X - breadcrumb
//   - table of contents
// X - tags
// X - use graphinery/ui components for <PostHeader>
// @see https://github.com/wluisi/graphinery/blob/ad8d01f163403c30d299a3a818c72e0e7ddba35e/examples/mdx-next-blog/src/app/blog/%5B...slug%5D/page.tsx#L181

const BLOG_QUERY = graphql(
  `
    query BlogQuery($path: String) {
      blog(path: $path) {
        title
        description
        keywords
        path
        status
        ...Breadcrumb
        content
        toc {
          items {
            id
            title
            level
          }
        }
        publishedDate
        updatedDate
        tags {
          ...TagFields
        }
      }
    }
  `,
  [BreadcrumbFragment, TagFieldsFragment]
);

type Blog = ResultOf<typeof BLOG_QUERY>["blog"];
type BlogData = { data: ResultOf<typeof BLOG_QUERY> };
type BlogVariables = VariablesOf<typeof BLOG_QUERY>;

async function getBlog(path: string): Promise<Blog> {
  const { data } = await client.request<BlogData, BlogVariables>({
    query: BLOG_QUERY,
    variables: {
      path: path,
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

  if (!blog || blog.status === false) {
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
  const BLOG_SLUGS_QUERY = graphql(`
    query BlogSlugsQuery($limit: Int, $filter: BlogQueryFilter) {
      blogCollection(limit: $limit, filter: $filter) {
        items {
          id
          slug
        }
      }
    }
  `);

  type BlogCollectionData = { data: ResultOf<typeof BLOG_SLUGS_QUERY> };
  type BlogCollectionVariables = VariablesOf<typeof BLOG_SLUGS_QUERY>;

  const { data } = await client.request<
    BlogCollectionData,
    BlogCollectionVariables
  >({
    query: BLOG_SLUGS_QUERY,
    variables: {
      limit: 400,
      filter: {
        status: { _eq: true },
      },
    },
  });

  const slugs: { slug: string[] }[] = [];
  data.blogCollection?.items?.forEach((blog) => {
    if (blog) {
      slugs.push({
        slug: blog.slug,
      });
    }
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

  if (!blog || blog.status === false) {
    notFound();
  }

  const lastUpdatedDate = blog.updatedDate
    ? blog.updatedDate
    : blog.publishedDate;

  const dateline = formatDate(blog.publishedDate);

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
        <SidebarMenu currentPath="/blog" />
      </GridItem>
      <GridItem
        id="main-content"
        className={cn("md:col-span-10 lg:col-span-8 pb-10 md:px-10")}
      >
        <article className="prose dark:prose-invert">
          <Breadcrumb blog={blog} currentPath={blog.path} />
          <PostHeader>
            <PostLastUpdated>
              Last updated: {formatDate(lastUpdatedDate)}
            </PostLastUpdated>
            <PostTitle>{blog.title}</PostTitle>
            <TagGroup tags={blog.tags} />
            <PostStack className="!mb-8">
              <Avatar src={avatarImage.src} alt="Photo of author" />
              <PostStack direction="column">
                <PostByline>William Luisi</PostByline>
                <PostDateline>{dateline}</PostDateline>
              </PostStack>
            </PostStack>
          </PostHeader>
          {blog.content && (
            <div className="space-y-5">
              <GraphineryMdx
                mdx={blog.content}
                components={{
                  ...componentsMap,
                }}
              />
            </div>
          )}
        </article>
      </GridItem>
      <GridItem
        id="right-sidebar"
        as="aside"
        className={cn(
          "hidden lg:flex lg:col-span-2 md:h-screen md:sticky md:top-[var(--navbar-height)]"
        )}
      >
        {blog.toc && <TableOfContents data={blog.toc.items as any} />}
      </GridItem>
    </Grid>
  );
}
