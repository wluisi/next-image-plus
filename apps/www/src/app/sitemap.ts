import type { MetadataRoute } from "next";

import { gql } from "@graphinery/client";
import { client } from "./../graphinery";
import { getBlogCollection } from "./../components/blog/blog-collection";

const BASE_URL = "https://next-image-plus.vercel.app";

export const PAGE_COLLECTION_QUERY = gql`
  query PageCollectionQuery(
    $limit: Int
    $pageNumber: Int
    $sort: _QuerySort
    $filter: PageQueryFilter
  ) {
    pageCollection(
      limit: $limit
      pageNumber: $pageNumber
      sort: $sort
      filter: $filter
    ) {
      items {
        id
        title
        path
        bundle
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

async function getPageCollection() {
  const { data } = await client.request({
    query: PAGE_COLLECTION_QUERY,
    variables: {
      limit: 500,
      sort: {
        field: "title",
        direction: "DESC",
      },
      filter: {
        status: { _eq: true },
      },
    },
  });

  return data.pageCollection;
}

async function getSitemap() {
  const pageCollection = await getPageCollection();
  const blogCollection = await getBlogCollection();

  return [...pageCollection.items, ...blogCollection.items];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const content = await getSitemap();

  const urlset: MetadataRoute.Sitemap = content.map((item) => {
    return {
      url: `${BASE_URL}${item.path}`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.8,
    };
  });

  return [
    // Homepage.
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...urlset,
  ];
}
