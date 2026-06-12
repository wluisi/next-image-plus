"use server";

import * as React from "react";

import { SimpleGrid, FeaturedLink } from "@graphinery/ui";
import Link from "next/link";

import { getCollection } from "./../../cc/collection";

export default async function BlogCollection() {
  const blogCollection = getCollection("blog", {
    filter: {
      status: { _eq: true },
    },
  });

  if (!blogCollection) {
    return null;
  }

  return (
    <SimpleGrid id="blog-collection">
      {blogCollection.map((item) => {
        if (!item) {
          return null;
        }

        return (
          <FeaturedLink
            key={item._path}
            href={item._path}
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
