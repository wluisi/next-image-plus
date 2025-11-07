import type { MetadataRoute } from "next";

import { client } from "./../graphinery";

import { graphql, ResultOf, VariablesOf } from "../types";

const BASE_URL = "https://www.next-image-plus.com";

const SITEMAP_QUERY = graphql(`
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
        title
        path
        description
        publishedDate
        updatedDate
        status
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
        title
        path
        description
        status
        publishedDate
        updatedDate
      }
    }
  }
`);

type SitemapItem =
  | NonNullable<
      NonNullable<ResultOf<typeof SITEMAP_QUERY>["pageCollection"]>["items"]
    >[number]
  | NonNullable<
      NonNullable<ResultOf<typeof SITEMAP_QUERY>["blogCollection"]>["items"]
    >[number];
type SitemapCollection = SitemapItem[];

type SitemapData = { data: ResultOf<typeof SITEMAP_QUERY> };
type SitemapVariables = VariablesOf<typeof SITEMAP_QUERY>;

async function getSitemap(): Promise<SitemapCollection> {
  const { data } = await client.request<SitemapData, SitemapVariables>({
    query: SITEMAP_QUERY,
    variables: {
      limit: 500,
      sort: {
        field: "path",
        direction: "ASC",
      },
      blogFilter: { status: { _eq: true } },
      pageFilter: { status: { _eq: true } },
    },
  });

  const pages = data?.pageCollection?.items ?? [];
  const blogs = data?.blogCollection?.items ?? [];

  return [...pages, ...blogs].filter(
    (item): item is SitemapItem => item !== null
  );
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const content = await getSitemap();

  if (!content) {
    return [];
  }

  const urlset: MetadataRoute.Sitemap = content
    .filter((item): item is NonNullable<typeof item> => item !== null)
    .map((item) => {
      const lastModified =
        item.updatedDate !== null ? item.updatedDate : item.publishedDate;
      const priority = item.path === "/" ? 1 : 0.8;

      return {
        url: `${BASE_URL}${item.path}`,
        lastModified,
        changeFrequency: "monthly",
        priority,
      };
    });

  return urlset;
}
