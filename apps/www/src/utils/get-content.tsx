// @see https://edwardshturman.com/notes/mdx-nextjs-14
// @see https://github.com/edwardshturman/mdx-nextjs-14

// @todo check if adding this as a util impacts the bundle size.
// @see note here `IMPORTANT: Be very careful about putting any next-mdx-remote code into a separate "utilities" file.
// Doing so will likely cause issues with Next.js' code splitting abilities`
// https://github.com/hashicorp/next-mdx-remote?tab=readme-ov-file#examples

import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
// Utils
import getTableOfContents from "./get-table-of-contents";
// Components
import { componentMap } from "./../components/components-map";

import { notFound } from "next/navigation";

export async function getContent(slug: string) {
  const filePath = path.join(process.cwd(), "src/__content", `${slug}.mdx`);

  try {
    const mdxSource = await fs.promises.readFile(filePath, "utf-8");

    const { content, frontmatter } = await compileMDX({
      source: mdxSource,
      components: componentMap,
      options: {
        parseFrontmatter: true,
      },
    });

    const toc = getTableOfContents(mdxSource);

    return {
      frontmatter: frontmatter,
      content: content,
      toc: toc,
    };
  } catch (error) {
    notFound();
  }
}
