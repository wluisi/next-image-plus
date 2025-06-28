import { CollectionMetaschema } from "@graphinery/mdx";

export const metaschema: CollectionMetaschema[] = [
  {
    name: "Page",
    type: "object",
    datasource: {
      interfaceType: "content",
      collection: "page",
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
      {
        name: "publishedDate",
        type: "string",
        required: true,
      },
      {
        name: "updatedDate",
        type: "string",
      },
    ],
  },
  {
    name: "Blog",
    type: "object",
    datasource: {
      interfaceType: "content",
      collection: "blog",
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
        required: true,
      },
      {
        name: "updatedDate",
        type: "string",
      },
    ],
  },
  {
    name: "Tag",
    type: "object",
    datasource: {
      interfaceType: "taxonomyTerm",
      collection: "tag",
      directory: "[tag]",
      pathPrefix: "/tag",
    },
  },
];
