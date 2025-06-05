import type { MetadataRoute } from "next";

import { gql } from "@graphinery/client";
import { client } from "./../graphinery";

const BASE_URL = "https://next-image-plus.vercel.app";

const SITEMAP_QUERY = gql`
  query SitemapQuery(
    $limit: Int
    $pageNumber: Int
    $sort: _QuerySort
    $pageFilter: PageQueryFilter
    $blogFilter: BlogQueryFilter
  ) {
    pageCollection(
      limit: $limit
      pageNumber: $pageNumber
      sort: $sort
      filter: $pageFilter
    ) {
      items {
        id
        uuid
        title
        path
        bundle
        description
        publishedDate
        status
      }
      pageInfo {
        totalItems
        limit
        pageCount
        pageNumber
      }
    }
    blogCollection(
      limit: $limit
      pageNumber: $pageNumber
      sort: $sort
      filter: $blogFilter
    ) {
      items {
        id
        uuid
        title
        path
        bundle
        description
        status
        publishedDate
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

async function getSitemap() {
  const { data } = await client.request({
    query: SITEMAP_QUERY,
    variables: {
      limit: 500,
      sort: {
        field: "title",
        direction: "DESC",
      },
      blogFilter: { status: { _eq: true } },
      pageFilter: { status: { _eq: true } },
    },
  });

  return [...data?.pageCollection?.items, ...data?.blogCollection?.items];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const content = await getSitemap();

  const urlset: MetadataRoute.Sitemap = content.map((item) => {
    const lastModified =
      item.publishedDate !== null ? item.publishedDate : new Date();

    // @todo figure out how to handle priority or make it diff per bundle ?

    return {
      url: `${BASE_URL}${item.path}`,
      lastModified: lastModified,
      changeFrequency: "yearly",
      priority: 0.8,
    };
  });

  return [
    // Homepage
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    // Docs
    {
      url: `${BASE_URL}/docs`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    // Examples
    {
      url: `${BASE_URL}/examples`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...urlset,
  ];
}
