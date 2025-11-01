// @todo consider moving this script to graphinery/mdx utils

const { Project } = require("ts-morph");
const fs = require("fs");
const path = require("path");

const { getPropsMdx, getPropsTableMdx } = require("./get-props-mdx.cjs");

const __CONTENT_DIR = "apps/www/src/__content/[propsDoc]";
// const __CONTENT_DIR = "generated/[propsDoc]";

// Convert PascalCase to kebab-case
function pascalCaseToKebabCase(str) {
  return str
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2") // insert dash between lowercase/number and uppercase
    .replace(/([A-Z])([A-Z][a-z])/g, "$1-$2") // handle consecutive capitals
    .toLowerCase();
}

// Initialize TS project
const project = new Project({
  tsConfigFilePath: "packages/next-image-plus/tsconfig.json",
});

project.addSourceFilesAtPaths("packages/next-image-plus/**/src/**/*.{ts,tsx}");

const output = [];

/**
 * Strip TypeScript import(...) syntax from type strings
 */
function simplifyTypeText(typeText) {
  return typeText.replace(/import\(".*?"\)\./g, "");
}

/**
 * Extract props from a type alias (handles intersection & object types)
 */
function extractPropsFromTypeAlias(typeAlias) {
  const type = typeAlias.getType();
  const props = [];

  function extractFromType(t) {
    if (t.isIntersection()) {
      t.getIntersectionTypes().forEach(extractFromType);
      return;
    }

    if (t.isObject()) {
      t.getProperties().forEach((prop) => {
        const decl = prop.getDeclarations()[0];
        if (!decl) return;

        if (decl.getSourceFile().isDeclarationFile()) return;

        const name = prop.getName();
        const typeText = simplifyTypeText(
          prop.getTypeAtLocation(decl).getText()
        );
        const required = !decl.hasQuestionToken?.();
        const jsDocs = decl.getJsDocs ? decl.getJsDocs() : [];
        const description =
          jsDocs
            .map((d) => d.getComment())
            .filter(Boolean)
            .join(" ") || "";
        const examples = jsDocs
          .flatMap((d) => (d.getTags ? d.getTags() : []))
          .filter((t) => t.getTagName() === "example")
          .map((t) => t.getComment())
          .filter(Boolean);
        const remarks = jsDocs
          .flatMap((d) => (d.getTags ? d.getTags() : []))
          .filter((t) => t.getTagName() === "remarks")
          .map((t) => t.getComment())
          .filter(Boolean);

        props.push({
          name,
          type: typeText,
          required,
          description,
          examples,
          remarks,
        });
      });
    }
  }

  extractFromType(type);

  return props;
}

/**
 * Extract props from an interface
 */
function extractPropsFromInterface(intf) {
  const props = [];
  intf.getMembers().forEach((member) => {
    if (member.getKindName() !== "PropertySignature") return;

    const name = member.getName();
    const typeText = simplifyTypeText(member.getType().getText());
    const required = !member.hasQuestionToken();
    const jsDocs = member.getJsDocs();
    const description =
      jsDocs
        .map((d) => d.getComment())
        .filter(Boolean)
        .join(" ") || "";
    const examples = jsDocs
      .flatMap((d) => (d.getTags ? d.getTags() : []))
      .filter((t) => t.getTagName() === "example")
      .map((t) => t.getComment())
      .filter(Boolean);
    const remarks = jsDocs
      .flatMap((d) => (d.getTags ? d.getTags() : []))
      .filter((t) => t.getTagName() === "remarks")
      .map((t) => t.getComment())
      .filter(Boolean);

    props.push({
      name,
      type: typeText,
      required,
      description,
      examples,
      remarks,
    });
  });

  return props;
}

/**
 * Process a source file
 */
function processSourceFile(sourceFile) {
  const filePath = path.relative(process.cwd(), sourceFile.getFilePath());

  // Exported type aliases
  sourceFile.getTypeAliases().forEach((typeAlias) => {
    if (!typeAlias.isExported()) return;
    const props = extractPropsFromTypeAlias(typeAlias);
    output.push({
      component: typeAlias.getName(),
      filePath,
      props,
    });
  });

  // Exported interfaces
  sourceFile.getInterfaces().forEach((intf) => {
    if (!intf.isExported()) return;
    const props = extractPropsFromInterface(intf);
    output.push({
      component: intf.getName(),
      filePath,
      props,
    });
  });
}

// Process all source files
project.getSourceFiles().forEach(processSourceFile);

// Write JSON output
const outputPath = path.join(process.cwd(), "generated/props.json");
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));

console.log("✅ Props JSON generated:", outputPath);

// ----- WRITE MDX -------
const mdxDir = path.join(process.cwd(), __CONTENT_DIR);
fs.mkdirSync(mdxDir, { recursive: true });

output.forEach((component) => {
  const fileBaseName = pascalCaseToKebabCase(component.component);

  // Full props MDX
  const propsMdx = getPropsMdx(component.component, output);
  if (propsMdx) {
    fs.writeFileSync(path.join(mdxDir, `${fileBaseName}.mdx`), propsMdx);
  }

  // Props table MDX
  const tableMdx = getPropsTableMdx(component.component, output);
  if (tableMdx) {
    fs.writeFileSync(path.join(mdxDir, `${fileBaseName}-table.mdx`), tableMdx);
  }

  console.log(`📝 Wrote MDX files for ${component.component}`);
});

console.log("✅ All MDX prop docs generated");
