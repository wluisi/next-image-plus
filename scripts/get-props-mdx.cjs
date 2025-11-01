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

  const rows = [];

  // Frontmatter
  const frontmatter = [
    "---",
    `title: "${component.component} Props Table"`,
    "status: true",
    "---",
    "",
  ];

  // Table header and separator
  rows.push(["Name", "Type", "Required", "Description"]);
  rows.push(["----", "----", "--------", "-----------"]);

  for (const prop of component.props) {
    const name = prop.name || "";
    const type = `\`${(prop.type || "")
      .replace(/\|/g, "\\|")
      .replace(/\r?\n/g, " ")}\``;
    const required = prop.required ? "Yes" : "No";
    let description = (prop.description || "")
      .replace(/\|/g, "\\|")
      .replace(/\r?\n/g, " ");

    if (prop.examples && prop.examples.length > 0) {
      const example = prop.examples[0]
        .replace(/\|/g, "\\|")
        .replace(/\r?\n/g, " ");
      description += ` \`${example}\``;
    }

    rows.push([name, type, required, description]);
  }

  // Compute column widths
  const colWidths = rows[0].map((_, i) =>
    Math.max(...rows.map((r) => r[i].length))
  );

  // Build aligned table
  const table = rows
    .map((row, rowIndex) => {
      const padChar = rowIndex === 1 ? "-" : " ";
      return (
        "| " +
        row
          .map((cell, i) => {
            const padLen = colWidths[i] - cell.length;
            return rowIndex === 1
              ? padChar.repeat(colWidths[i])
              : cell + " ".repeat(padLen);
          })
          .join(" | ") +
        " |"
      );
    })
    .join("\n");

  return [...frontmatter, table, ""].join("\n");
}

module.exports = { getPropsMdx, getPropsTableMdx };
