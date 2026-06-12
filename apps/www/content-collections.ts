import { defineCollection, defineConfig } from "@content-collections/core";
import { z } from "zod";

import { getBaseFields } from "./src/cc/base-fields";
import { getTocFromMarkdown } from "@graphinery/mdx";

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
        collection: "tag",
      }),
      ...document,
    };
  },
});

const propsDoc = defineCollection({
  name: "propsDoc",
  directory: "src/__content/[propsDoc]",
  include: "**/*.mdx",
  schema: z.object({
    title: z.string(),
    content: z.string(),
    toc: z
      .array(
        z.object({
          id: z.string(),
          title: z.string(),
          level: z.string(),
        })
      )
      .optional(),
  }),
  transform: async (document, _context) => {
    return {
      ...getBaseFields(document, {
        pathPrefix: "/props-doc",
        collection: "propsDoc",
      }),
      ...document,
      toc: getTocFromMarkdown(document.content),
    };
  },
});

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
        collection: "blog",
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
    propsDoc: z.array(z.string()).default([]),
    toc: z
      .array(
        z.object({
          id: z.string(),
          title: z.string(),
          level: z.string(),
        })
      )
      .optional(),
  }),
  transform: async (document, context) => {
    const propsDocsCollection = context.documents(propsDoc);

    const propsDocsResolved = document.propsDoc.map((slug) => {
      const found = propsDocsCollection.find(
        (entry) => entry._meta.path === slug
      );

      if (!found) {
        throw new Error(`propsDoc "${slug}" not found in propsDoc collection`);
      }

      return {
        ...found,
        toc: getTocFromMarkdown(found.content),
      };
    });

    return {
      ...getBaseFields(document, {
        pathPrefix: "/",
        collection: "page",
      }),
      ...document,
      propsDoc: propsDocsResolved,
      toc: getTocFromMarkdown(document.content),
    };
  },
});

export default defineConfig({
  content: [blog, page, tag, propsDoc],
});
