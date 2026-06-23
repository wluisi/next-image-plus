import { getEntry } from "../cc/collection";

import { componentsMap } from "./components-map";
import { ContentComponentsMdx } from "./content-components-mdx";

export function PropsDoc({ id }: { id: string }) {
  const path = `/props-doc/${id}`;
  const propsDoc = getEntry(path, { collection: "propsDoc" });

  if (!propsDoc || !propsDoc.content) {
    return null;
  }

  return (
    <ContentComponentsMdx mdx={propsDoc.content} components={componentsMap} />
  );
}
