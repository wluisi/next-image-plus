import propsJson from "./../../../../generated/props.json";

// @todo consider moving this function to graphinery/mdx utils
// `@propsDescriptionSet:BackgroundImageProps`
export function getPropsDescriptionSetMdx(name: string) {
  const component = propsJson.find((c) => c.component === name);

  if (!component) {
    return null;
  }

  const lines: string[] = [];
  for (const prop of component.props) {
    lines.push(`### ${prop.name}`);
    lines.push("");

    lines.push(`${prop.description}`);

    if (prop.examples.length > 0) {
      lines.push(`\`\`\`ts\n${prop.examples[0]}\n\`\`\``);
    }

    if (prop.remarks && prop.remarks.length > 0) {
      lines.push("<Callout type='important'>");
      lines.push(`${prop.remarks[0]}`);
      lines.push("</Callout>");
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
