import { EntityMetaschema } from "@graphinery/mdx";

export const metaschema: EntityMetaschema[] = [
  {
    name: "Page",
    type: "type",
    datasource: {
      entityType: "content",
      bundle: "page",
      directory: "[page]",
      pathPrefix: "/",
    },
    fields: [
      {
        name: "title",
        type: "string",
        required: true,
      },
      {
        name: "description",
        type: "string",
        required: true,
      },
      {
        name: "activeTrail",
        type: "activeTrail",
      },
      {
        name: "content",
        type: "string",
      },
      {
        name: "toc",
        type: "toc",
        datasource: {
          name: "content",
          fieldType: "string",
        },
      },
      {
        name: "keywords",
        type: "string",
      },
    ],
  },
  {
    name: "Blog",
    type: "type",
    datasource: {
      entityType: "content",
      bundle: "blog",
      directory: "[blog]",
      pathPrefix: "/blog",
    },
    fields: [
      {
        name: "title",
        type: "string",
        required: true,
      },
      {
        name: "description",
        type: "string",
        required: true,
      },
      {
        name: "activeTrail",
        type: "activeTrail",
      },
      {
        name: "content",
        type: "string",
      },
      {
        name: "toc",
        type: "toc",
        datasource: {
          name: "content",
          fieldType: "string",
        },
      },
      {
        name: "keywords",
        type: "string",
      },
      {
        name: "tags",
        type: "list",
        datasource: {
          name: "tags",
          fieldType: "reference",
          allowedTypes: ["tag"],
        },
      },
      {
        name: "publishedDate",
        type: "string",
      },
    ],
  },
  {
    name: "Tag",
    type: "type",
    datasource: {
      entityType: "taxonomyTerm",
      bundle: "tag",
      directory: "[tag]",
      pathPrefix: "/tag",
    },
  },
];
