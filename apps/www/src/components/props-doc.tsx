// import { gql } from "@graphinery/client";
import { GraphineryMdx } from "@graphinery/mdx";
import { client } from "./../graphinery";

import { componentsMap } from "./components-map";

import { graphql, ResultOf, VariablesOf } from "../types";

type PropsDoc = ResultOf<typeof PROPS_DOC_QUERY>["propsDoc"];
type PropsDocData = { data: ResultOf<typeof PROPS_DOC_QUERY> };
type PropsDocVariables = VariablesOf<typeof PROPS_DOC_QUERY>;

const PROPS_DOC_QUERY = graphql(`
  query PropsDocQuery($path: String) {
    propsDoc(path: $path) {
      id
      title
      content
    }
  }
`);

async function getPropsDoc(path: string): Promise<PropsDoc> {
  const { data } = await client.request<PropsDocData, PropsDocVariables>({
    query: PROPS_DOC_QUERY,
    variables: {
      path: path,
    },
    options: {
      next: { tags: [path] },
    },
  });

  return data.propsDoc;
}

export async function PropsDoc({ id }: { id: string }) {
  const path = `/props-doc/${id}`;
  const propsDoc = await getPropsDoc(path);

  if (!propsDoc || !propsDoc.content) {
    return null;
  }

  return <GraphineryMdx mdx={propsDoc.content} components={componentsMap} />;
}
