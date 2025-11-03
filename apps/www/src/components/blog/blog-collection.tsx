"use server";

import * as React from "react";

import { client } from "../../graphinery";

import { SimpleGrid, FeaturedLink } from "@graphinery/ui";
import Link from "next/link";

import { graphql, ResultOf, VariablesOf } from "./../../types";

const BLOG_COLLECTION_QUERY = graphql(`
  query BlogCollectionQuery(
    $limit: Int
    $pageNumber: Int
    $sort: _QuerySort
    $filter: BlogQueryFilter
  ) {
    blogCollection(
      limit: $limit
      pageNumber: $pageNumber
      sort: $sort
      filter: $filter
    ) {
      items {
        id
        title
        path
        description
        status
      }
      pageInfo {
        totalItems
        limit
        pageCount
        pageNumber
      }
    }
  }
`);

export type BlogCollection = ResultOf<
  typeof BLOG_COLLECTION_QUERY
>["blogCollection"];
type BlogCollectionData = { data: ResultOf<typeof BLOG_COLLECTION_QUERY> };
type BlogCollectionVariables = VariablesOf<typeof BLOG_COLLECTION_QUERY>;

async function getBlogCollection(): Promise<BlogCollection> {
  const { data } = await client.request<
    BlogCollectionData,
    BlogCollectionVariables
  >({
    query: BLOG_COLLECTION_QUERY,
    variables: {
      limit: 10,
      filter: {
        status: { _eq: true },
      },
    },
  });

  return data.blogCollection;
}

export default async function BlogCollection() {
  const blogCollection = await getBlogCollection();

  if (!blogCollection || !blogCollection.items) {
    return null;
  }

  return (
    <SimpleGrid id="blog-collection">
      {blogCollection.items.map((item) => {
        if (!item) {
          return null;
        }

        return (
          <FeaturedLink
            key={item.id}
            href={item.path}
            as={Link}
            className="no"
            size="lg"
          >
            {item.title}
          </FeaturedLink>
        );
      })}
    </SimpleGrid>
  );
}
