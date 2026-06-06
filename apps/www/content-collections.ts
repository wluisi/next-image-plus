import { defineCollection, defineConfig } from "@content-collections/core";
import { z } from "zod";

const blog = defineCollection({
  name: "blog",
  directory: "src/__content/[blog]",
  include: "**/*.mdx",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    content: z.string(),
    publishedDate: z.string(),
    updatedDate: z.string().optional(),
    tags: z.array(z.string()).default([]),
    keywords: z.string(),
    status: z.boolean(),
    // @todo add fields:
    // activeTrail: -- deps on `getContentTree()` and `getActiveTrail()`.
    // toc: -- deps on `getToc()`
  }),
  transform: async (document, context) => {
    const allTags = context.documents(tag);
    const resolvedTags = document.tags.map((slug) => {
      const found = allTags.find((t) => t._meta.path === slug);
      if (!found) {
        throw new Error(`Tag "${slug}" not found in tag collection`);
      }

      return found;
    });

    const pathPrefix = "/blog";

    const path =
      document._meta.path === "index"
        ? pathPrefix
        : `${pathPrefix}/${document._meta.path}`;

    return {
      _slug: document._meta.path.split("/").filter(Boolean),
      _path: path,
      _collection: "blog",
      ...document,
      tags: resolvedTags,
    };
  },
});

const page = defineCollection({
  name: "page",
  directory: "src/__content/[page]",
  include: "**/*.mdx",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    content: z.string(),
    publishedDate: z.string(),
    updatedDate: z.string().optional(),
    tags: z.array(z.string()).default([]),
    keywords: z.string(),
    status: z.boolean(),
    weight: z.number().optional().default(0),
  }),
  transform: async (document, _context) => {
    const pathPrefix = "/";

    const path =
      document._meta.path === "index"
        ? pathPrefix
        : `${pathPrefix}${document._meta.path}`;

    return {
      _slug: document._meta.path.split("/").filter(Boolean),
      _path: path,
      _collection: "page",
      ...document,
    };
  },
});

const tag = defineCollection({
  name: "tag",
  directory: "src/__content/[tag]",
  include: "**/*.mdx",
  schema: z.object({
    title: z.string(),
    content: z.string(),
  }),
  transform: async (document, _context) => {
    const pathPrefix = "/";

    const path =
      document._meta.path === "index"
        ? pathPrefix
        : `${pathPrefix}${document._meta.path}`;

    return {
      _slug: document._meta.path.split("/").filter(Boolean),
      _path: path,
      _collection: "tag",
      ...document,
    };
  },
});

export default defineConfig({
  content: [blog, page, tag],
});
