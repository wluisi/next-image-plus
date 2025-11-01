import { Metaschema } from "@graphinery/mdx";

export const metaschema: Metaschema = [
  {
    name: "Page",
    type: "collection",
    interfaces: ["MdxContentTypeInterface"],
    datasource: {
      collection: "page",
      directory: "[page]",
      pathPrefix: "/",
    },
    fields: [
      {
        name: "title",
        type: "string",
        nullable: false,
      },
      {
        name: "description",
        type: "string",
        nullable: false,
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
        },
      },
      {
        name: "keywords",
        type: "string",
      },
      {
        name: "publishedDate",
        type: "string",
        nullable: false,
      },
      {
        name: "updatedDate",
        type: "string",
      },
      {
        name: "propsDoc",
        type: "reference",
        ofType: "PropsDoc",
        list: true,
        nullable: {
          list: false,
          items: true,
        },
      },
    ],
  },
  {
    name: "Blog",
    type: "collection",
    interfaces: ["MdxContentTypeInterface"],
    datasource: {
      collection: "blog",
      directory: "[blog]",
      pathPrefix: "/blog",
    },
    fields: [
      {
        name: "title",
        type: "string",
        nullable: false,
      },
      {
        name: "description",
        type: "string",
        nullable: false,
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
        },
      },
      {
        name: "keywords",
        type: "string",
      },
      {
        name: "tags",
        type: "reference",
        ofType: "Tag",
        list: true,
        nullable: {
          list: false,
          items: true,
        },
      },
      {
        name: "publishedDate",
        type: "string",
        nullable: false,
      },
      {
        name: "updatedDate",
        type: "string",
      },
    ],
  },
  {
    name: "PropsDoc",
    type: "collection",
    interfaces: ["MdxContentTypeInterface"],
    datasource: {
      collection: "propsDoc",
      directory: "[propsDoc]",
      pathPrefix: "/props-doc",
    },
    fields: [
      {
        name: "toc",
        type: "toc",
        datasource: {
          name: "content",
        },
      },
    ],
  },
  {
    name: "Tag",
    type: "collection",
    interfaces: ["MdxTaxonomyTermInterface"],
    datasource: {
      collection: "tag",
      directory: "[tag]",
      pathPrefix: "/tag",
    },
  },
];
