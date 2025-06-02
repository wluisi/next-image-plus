"use server";

import * as React from "react";

import { gql } from "@graphinery/client";
import { client } from "../../graphinery";

import { SimpleGrid, FeaturedLink } from "@graphinery/ui";
import Link from "next/link";

const BLOG_COLLECTION_QUERY = gql`
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
`;

async function getBlogCollection() {
  const { data } = await client.request({
    query: BLOG_COLLECTION_QUERY,
    variables: {
      limit: 10,
    },
  });

  return data.blogCollection;
}

export default async function BlogCollection() {
  const blogCollection = await getBlogCollection();

  return (
    <SimpleGrid id="blog-collection">
      {blogCollection?.items?.map((item: any) => {
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
