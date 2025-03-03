// @see https://edwardshturman.com/notes/mdx-nextjs-14
// @see https://github.com/edwardshturman/mdx-nextjs-14

// @todo check if adding this as a util impacts the bundle size.
// @see note here `IMPORTANT: Be very careful about putting any next-mdx-remote code into a separate "utilities" file.
// Doing so will likely cause issues with Next.js' code splitting abilities`
// https://github.com/hashicorp/next-mdx-remote?tab=readme-ov-file#examples

import fs from "fs";
import path from "path";

import { compileMDX } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";

import getTableOfContents from "./get-table-of-contents";

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  CodeSnippet,
  Heading,
  HeadingAnchorLink,
} from "./../components/ui";

export async function getContent(slug: string) {
  const filePath = path.join(process.cwd(), "src/__content", `${slug}.mdx`);

  try {
    const mdxSource = await fs.promises.readFile(filePath, "utf-8");

    const { content, frontmatter } = await compileMDX({
      source: mdxSource,
      components: {
        Accordion,
        AccordionButton,
        AccordionItem,
        AccordionPanel,
        // @ts-expect-error - fix me later
        CodeSnippet,
        Heading,
        h1(props) {
          return <Heading level="h1" {...props} />;
        },
        h2(props) {
          return (
            <HeadingAnchorLink level="h2" title={props.children as string} />
          );
        },
        h3(props) {
          return (
            <HeadingAnchorLink level="h3" title={props.children as string} />
          );
        },
        pre(props) {
          // @ts-expect-error - fuck off
          const code = props.children?.props?.children as string;
          // @ts-expect-error - fuck off
          const language = props.children?.props?.className.replace(
            "language-",
            ""
          );

          let codeFinal = "";
          let title;

          const firstLine = code.split("\n")[0];
          const shortcode = "@filename:";

          if (firstLine.startsWith(shortcode)) {
            codeFinal = code.split("\n").slice(1).join("\n");
            title = firstLine.split(shortcode)[1];
          } else {
            codeFinal = code;
          }

          return (
            <CodeSnippet title={title} language={language} code={codeFinal} />
          );
        },
      },
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
