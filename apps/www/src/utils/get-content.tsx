// @see https://edwardshturman.com/notes/mdx-nextjs-14
// @see https://github.com/edwardshturman/mdx-nextjs-14

// @todo check if adding this as a util impacts the bundle size.
// @see note here `IMPORTANT: Be very careful about putting any next-mdx-remote code into a separate "utilities" file.
// Doing so will likely cause issues with Next.js' code splitting abilities`
// https://github.com/hashicorp/next-mdx-remote?tab=readme-ov-file#examples

import fs from "fs";
import path from "path";

import { compileMDX } from "next-mdx-remote/rsc";

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

  console.log("filePath", filePath);

  try {
    // Load the MDX file
    const mdxSource = await fs.promises.readFile(filePath, "utf-8");

    // Compile the mdx file.
    // content is a react component, that can be rendered as is, ie., {content}
    // example output:
    //
    // {
    //   '$$typeof': Symbol(react.element),
    //   type: [Function: MDXContent],
    //   key: null,
    //   ref: null,
    //   _owner: null,
    //   _store: {}
    // }
    //
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
      },
      options: {
        parseFrontmatter: true,
      },
    });

    // console.log("---- compileMDX frontmatter! ----");
    // console.log(frontmatter);

    // console.log("---- compileMDX content! ----");
    // console.log(Object.getOwnPropertyNames(content.props.components.Accordion));

    return {
      frontmatter: frontmatter,
      content: content,
    };
  } catch (error) {
    throw new Error("Could not process the MDX file");
  }
}
