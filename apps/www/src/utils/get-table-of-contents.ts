import { fromMarkdown } from "mdast-util-from-markdown";
import getSlug from "./get-slug";

export type TableOfContentsItem = {
  id: string;
  title: string;
  level: string;
};

export default function getTableOfContents(source: string) {
  const tree = fromMarkdown(source);

  const data: TableOfContentsItem[] = [];
  tree.children.forEach((item) => {
    if (item.type === "heading" && item.depth !== 1) {
      console.log(item);

      data.push({
        // @ts-expect-error - fml
        id: getSlug(item.children[0]?.value),
        level: `h${item.depth}`,
        // @ts-expect-error - fml
        title: item.children[0]?.value,
      });
    }
  });

  // For some reason fromMarkdown() thinks frontmatter values are headings ?
  // So, for now, we just cut the first element from the array.
  const dataFinal = data.slice(1);

  return dataFinal;
}
