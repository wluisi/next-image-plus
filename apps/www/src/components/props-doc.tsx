import { getEntry } from "../cc/collection";

import { componentsMap } from "./components-map";
import { GraphineryMdx } from "@graphinery/mdx";

export function PropsDoc({ id }: { id: string }) {
  const path = `/props-doc/${id}`;
  const propsDoc = getEntry(path, { collection: "propsDoc" });

  if (!propsDoc || !propsDoc.content) {
    return null;
  }

  return <GraphineryMdx mdx={propsDoc.content} components={componentsMap} />;
}
