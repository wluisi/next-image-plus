import * as React from "react";

import { notFound } from "next/navigation";
import { getPathFromParams } from "@graphinery/core";

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

import { Breadcrumb } from "./../../../components/breadcrumb";

import {
  TagGroup,
  TagFieldsFragment,
} from "./../../../components/blog/tag-group";

// Content collections
import { getCollection, getEntry } from "../../../cc/collection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata | undefined> {
  const path = getPathFromParams({ pathPrefix: "blog", params: await params });
  const blog = getEntry(path, { collection: "blog" });

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
      canonical: blog._path,
    },
    openGraph: {
      ...layoutMetadata.openGraph,
      title: blog.title,
      description: blog.description,
      url: blog._path,
    },
    twitter: {
      ...layoutMetadata.twitter,
      title: blog.title,
      description: blog.description,
    },
  };
}

export async function generateStaticParams() {
  const blogCollection = getCollection("blog");

  const slugs: { slug: string[] }[] = [];
  blogCollection?.forEach((blog) => {
    if (blog) {
      slugs.push({
        slug: blog._slug,
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
  const blog = getEntry(path, { collection: "blog" });

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
          <Breadcrumb currentPath={blog._path} />
          <PostHeader>
            <PostLastUpdated>
              Last updated: {formatDate(lastUpdatedDate)}
            </PostLastUpdated>
            <PostTitle>{blog.title}</PostTitle>
            {/* <TagGroup tags={blog.tags} /> */}
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
        {blog.toc && <TableOfContents data={blog.toc} />}
      </GridItem>
    </Grid>
  );
}
