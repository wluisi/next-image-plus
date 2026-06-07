import { defineCollection, defineConfig } from "@content-collections/core";
import { z } from "zod";

import { getBaseFields } from "./src/utils/get-base-fields";

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

    return {
      ...getBaseFields(document, {
        pathPrefix: "/blog",
        collectionName: "blog",
      }),
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
    return {
      ...getBaseFields(document, {
        pathPrefix: "/",
        collectionName: "page",
      }),
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
    return {
      ...getBaseFields(document, {
        pathPrefix: "/tag",
        collectionName: "tag",
      }),
      ...document,
    };
  },
});

export default defineConfig({
  content: [blog, page, tag],
});
