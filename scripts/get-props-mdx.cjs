/**
 * Generate MDX content for a component, including frontmatter
 */
function getPropsMdx(componentName, propsList) {
  const component = propsList.find((c) => c.component === componentName);

  if (!component) {
    return null;
  }

  const lines = [];

  // Frontmatter
  lines.push("---");
  lines.push(`title: "${component.component}"`);
  lines.push("status: true");
  lines.push("---");
  lines.push("");

  const remarkHandlers = {
    info: (content) => {
      lines.push("<Callout type='info'>");
      lines.push(content.trim());
      lines.push("</Callout>");
      lines.push("");
    },
    important: (content) => {
      lines.push("<Callout type='important'>");
      lines.push(content.trim());
      lines.push("</Callout>");
      lines.push("");
    },
    quote: (content) => {
      const quoted = content
        .split("\n")
        .map((line) => `> _${line.trim()}_`)
        .join("\n");
      lines.push(quoted);
      lines.push("");
    },
    link: (content) => {
      const [href, children] = content.split("|").map((s) => s.trim());
      lines.push("");
      lines.push(`<SimpleGrid>
  <FeaturedLink
    href="${href}"
    icon="next"
  >
    ${children}
  </FeaturedLink>
</SimpleGrid>
`);
      lines.push("");
    },
  };

  if (component.props !== undefined) {
    for (const prop of component.props) {
      lines.push(`### ${prop.name}`);
      lines.push("");

      lines.push(`${prop.description}`);
      lines.push("");

      if (prop.examples.length > 0) {
        lines.push("```ts");
        lines.push(prop.examples[0]);
        lines.push("```");
        lines.push("");
      }

      if (prop.remarks && prop.remarks.length > 0) {
        const allRemarks = prop.remarks.join("\n");

        const matches = Array.from(
          allRemarks.matchAll(
            /\[\s*(info|important|quote|link)\]\s*([\s\S]*?)(?=(\n\s*\[|$))/gi
          )
        );

        const chunks = matches.map((m) => ({
          type: m[1].toLowerCase(),
          content: m[2].trim(),
        }));

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

/**
 * Generate MDX table for component props
 */
function getPropsTableMdx(componentName, propsList) {
  const component = propsList.find((c) => c.component === componentName);

  if (!component || !component.props) {
    return null;
  }

  const lines = [];

  // Frontmatter
  lines.push("---");
  lines.push(`title: "${component.component} Props Table"`);
  lines.push("status: true");
  lines.push("---");
  lines.push("");

  // Table header
  lines.push("| Name | Type | Required | Description |");
  lines.push("| ---- | ---- | -------- | ----------- |");

  for (const prop of component.props) {
    const name = prop.name || "";

    // Wrap type in backticks and escape pipes/newlines
    const type = `\`${(prop.type || "").replace(/\|/g, "\\|").replace(/\r?\n/g, " ")}\``;

    const required = prop.required ? "Yes" : "No";

    // Escape pipes/newlines in description
    let description = (prop.description || "")
      .replace(/\|/g, "\\|")
      .replace(/\r?\n/g, " ");

    // Append first example in backticks if exists
    if (prop.examples && prop.examples.length > 0) {
      const example = prop.examples[0]
        .replace(/\|/g, "\\|")
        .replace(/\r?\n/g, " ");
      description += ` \`${example}\``;
    }

    lines.push(`| ${name} | ${type} | ${required} | ${description} |`);
  }

  lines.push("");
  return lines.join("\n");
}

module.exports = { getPropsMdx, getPropsTableMdx };
