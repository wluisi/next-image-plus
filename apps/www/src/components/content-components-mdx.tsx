import * as React from "react";

import remarkGfm from "remark-gfm";
import { compileMDX } from "next-mdx-remote/rsc";

type ComponentsMap = Record<string, React.ComponentType<any>>;

type ContentComponentsMdxProps = {
  /**
   * The mdx string.
   *
   * @example
   * mdx = "whatever"
   */
  mdx: string;

  /**
   * The components map, or map of react of components.
   *
   * @example
   * components = "something"
   */
  components: ComponentsMap;
};

export async function getContent(
  mdx: string,
  components: ComponentsMap
): Promise<React.ReactElement> {
  const { content } = await compileMDX({
    source: mdx,
    components: components,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    },
  });

  return content;
}

/**
 * The component description.
 *
 * @returns The return value for `ContentComponentsMdx`.
 */
export async function ContentComponentsMdx({
  mdx,
  components,
}: ContentComponentsMdxProps) {
  const content = await getContent(mdx, components);

  return <>{content}</>;
}
