import propsJson from "./../../../../generated/props.json";

// @todo consider moving this function to graphinery/mdx utils
// `@propsDescriptionSet:BackgroundImageProps`
export function getPropsDescriptionSetMdx(name: string) {
  const component = propsJson.find((c) => c.component === name);

  if (!component) {
    return null;
  }

  const lines: string[] = [];

  const remarkHandlers: Record<string, (content: string) => void> = {
    info: (content) => {
      lines.push("<Callout type='info'>");
      lines.push(content.trim());
      lines.push("</Callout>");
    },
    important: (content) => {
      lines.push("<Callout type='important'>");
      lines.push(content.trim());
      lines.push("</Callout>");
    },
    quote: (content) => {
      const quoted = content
        .split("\n")
        .map((line) => `> _${line.trim()}_`)
        .join("\n");
      lines.push(quoted);
      lines.push(""); // blank line after blockquote
    },
    featuredlink: (content) => {
      const [href, children] = content.split("|").map((s) => s.trim());
      lines.push(""); // blank line before the link
      lines.push(`<SimpleGrid>
        <FeaturedLink
          href="${href}"
          icon="next"
        >
          ${children}
        </FeaturedLink>
      </SimpleGrid>
      `);
      lines.push(""); // blank line after
    },
  };

  if (component.props !== undefined) {
    for (const prop of component.props) {
      lines.push(`### ${prop.name}`);
      lines.push("");

      lines.push(`${prop.description}`);

      if (prop.examples.length > 0) {
        lines.push(`\`\`\`ts\n${prop.examples[0]}\n\`\`\``);
      }

      // if (prop.remarks && prop.remarks.length > 0) {
      //   for (const remark of prop.remarks) {
      //     // Match all tagged segments like [quote] ... or [featuredLink] ...
      //     const matches = remark.matchAll(
      //       /\[(info|important|quote|featuredLink)\]\s*([\s\S]*?)(?=\n\s*\[|$)/gi
      //     );

      //     for (const match of matches) {
      //       const [, type, content] = match;
      //       const handler =
      //         remarkHandlers[type.toLowerCase()] || remarkHandlers["info"];
      //       handler(content.trim());
      //     }
      //   }
      // }
      if (prop.remarks && prop.remarks.length > 0) {
        const allRemarks = prop.remarks.join("\n");

        // Match all blocks starting with a tag, even after blank lines
        const matches = Array.from(
          allRemarks.matchAll(
            /\[\s*(info|important|quote|featuredLink)\]\s*([\s\S]*?)(?=(\n\s*\[|$))/gi
          )
        );

        const chunks = matches.map((m) => ({
          type: m[1].toLowerCase(),
          content: m[2].trim(),
        }));

        console.log(chunks); // now you will get exactly 2 chunks

        // Process each chunk
        for (const { type, content } of chunks) {
          const handler = remarkHandlers[type];
          if (handler) {
            handler(content);
          }
        }
      }
    }
  }

  return lines.join("\n");
}

// @todo this needs to work for multiple tokens.
// @todo consider moving this function to graphinery/mdx utils
export function getContentWithTokenReplacement(content: string) {
  const tokenName = "propsDescriptionSet";
  const tokenPattern = new RegExp(`@${tokenName}:([\\w-]+)`, "g");

  const value = content.replace(tokenPattern, (_match, componentName) => {
    return getPropsDescriptionSetMdx(componentName) ?? "";
  });

  return value;
}
