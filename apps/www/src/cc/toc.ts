import { fromMarkdown } from "mdast-util-from-markdown";
import { frontmatter } from "micromark-extension-frontmatter";
import { frontmatterFromMarkdown } from "mdast-util-frontmatter";
import { toString } from "mdast-util-to-string";

export type TableOfContentsItem = {
  id: string;
  title: string;
  level: string;
};

function getSlug(text: string) {
  return text
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
}

export function getTocFromMarkdown(markdown: string) {
  const tree = fromMarkdown(markdown, {
    extensions: [frontmatter(["yaml", "toml"])],
    mdastExtensions: [frontmatterFromMarkdown(["yaml", "toml"])],
  });

  const data: TableOfContentsItem[] = [];

  tree.children.forEach((item) => {
    if (item.type === "heading" && item.depth !== 1) {
      const title = toString(item);

      data.push({
        id: getSlug(title),
        level: `h${item.depth}`,
        title,
      });
    }
  });

  return data;
}
