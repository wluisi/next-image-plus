// @see https://edwardshturman.com/notes/mdx-nextjs-14
// @see https://github.com/edwardshturman/mdx-nextjs-14

// @todo check if adding this as a util impacts the bundle size.
// @see note here `IMPORTANT: Be very careful about putting any next-mdx-remote code into a separate "utilities" file.
// Doing so will likely cause issues with Next.js' code splitting abilities`
// https://github.com/hashicorp/next-mdx-remote?tab=readme-ov-file#examples

import fs from "fs";
import path from "path";

import { compileMDX } from "next-mdx-remote/rsc";

import CustomComponent from "./../components/CustomComponent";
import CustomComponentTwo from "./../components/CustomComponentTwo";

export async function getContent(slug: string) {
  const filePath = path.join(process.cwd(), "src/__content", `${slug}.mdx`);

  console.log("filePath", filePath);

  try {
    // Load the MDX file
    const mdxSource = await fs.promises.readFile(filePath, "utf-8");

    // Compile the mdx file.
    const { content, frontmatter } = await compileMDX<{ title: string }>({
      source: mdxSource,
      options: { parseFrontmatter: true },
      components: { CustomComponent, CustomComponentTwo },
    });

    // console.log("---- compileMDX content! ----");
    // console.log(content);

    return {
      frontmatter: frontmatter,
      content: content,
    };
  } catch (error) {
    throw new Error("Could not process the MDX file");
  }
}
