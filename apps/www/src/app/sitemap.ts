import type { MetadataRoute } from "next";

import { getCollection } from "../cc/collection";

const BASE_URL = "https://www.next-image-plus.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = getCollection("page", {
    filter: {
      status: { _eq: true },
    },
  });

  const blogs = getCollection("blog", {
    filter: {
      status: { _eq: true },
    },
  });

  return [...pages, ...blogs].map((item) => {
    const lastModified = item.updatedDate ?? item.publishedDate;
    const priority = item._path === "/" ? 1 : 0.8;

    return {
      url: `${BASE_URL}${item._path}`,
      lastModified,
      changeFrequency: "monthly",
      priority,
    };
  });
}
