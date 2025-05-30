import { graphinery } from "./../../graphinery.config";
import { GraphineryClient } from "@graphinery/client";

export const { schema, datasources } = graphinery;

export const client = new GraphineryClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_API as string,
  schema: schema,
  datasources: datasources,
  externalApi: false,
});
