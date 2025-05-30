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
];
