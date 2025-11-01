import { gql } from "@graphinery/client";
import { GraphineryMdx } from "@graphinery/mdx";
import { client } from "./../graphinery";

import { componentsMap } from "./components-map";

const PROPS_DOC_QUERY = gql`
  query PropsDocQuery($path: String) {
    propsDoc(path: $path) {
      id
      title
      content
    }
  }
`;

async function getPropsDoc(path: string) {
  const { data } = await client.request({
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

  return <GraphineryMdx mdx={propsDoc.content} components={componentsMap} />;
}
