import { createGraphQLServer } from "@graphinery/server/next";
import { datasources, schema } from "./../../../graphinery";

export const { GET, POST, OPTIONS } = createGraphQLServer({
  schema,
  datasources,
});
