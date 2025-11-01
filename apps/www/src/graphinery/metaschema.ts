import { Metaschema } from "@graphinery/mdx";

import { getContentWithTokenReplacement } from "./utils";

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
        // datasource: {
        //   name: "mdx",
        //   // Computed only changes the value at the datasource level, which works for toc field,
        //   // but we also need an additional resolver for this field to alter the return value
        //   // @todo figure out why this happens ?
        //   computed: (data) => {
        //     return getContentWithTokenReplacement(data?.mdx);
        //   },
        // },
        // resolver: (data) => {
        //   return getContentWithTokenReplacement(data?.mdx);
        // },
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
    name: "Tag",
    type: "collection",
    interfaces: ["MdxTaxonomyTermInterface"],
    datasource: {
      collection: "tag",
      directory: "[tag]",
      pathPrefix: "/tag",
    },
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
];
