// @todo consider moving this script to graphinery/mdx utils

const { Project } = require("ts-morph");
const fs = require("fs");
const path = require("path");

// Initialize the TS project
const project = new Project({
  tsConfigFilePath: "packages/next-image-plus/tsconfig.json",
});

// Add all source files
project.addSourceFilesAtPaths("packages/next-image-plus/**/src/**/*.{ts,tsx}");

const output = [];

// Recursive function to extract props with children
function extractPropsFromType(type, depth = 0) {
  if (!type) return [];

  return type
    .getProperties()
    .filter((prop) => {
      // Exclude symbols that come from lib.d.ts or Object methods
      const decl = prop.getDeclarations()[0];
      if (!decl) return false;
      const sourceFile = decl.getSourceFile();
      return !sourceFile.isDeclarationFile();
    })
    .map((prop) => {
      const decl = prop.getDeclarations()[0];
      if (!decl) return null;

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

      let required = true;
      if (
        decl.getKindName &&
        (decl.getKindName() === "PropertySignature" ||
          decl.getKindName() === "PropertyDeclaration")
      ) {
        required = !decl.hasQuestionToken();
      }

      const propType = prop.getTypeAtLocation(decl);

      // Only one level for children
      let children = [];
      if (depth === 0) {
        if (propType.isArray()) {
          const elementType = propType.getArrayElementType();
          if (
            elementType &&
            (elementType.isInterface() || elementType.isObject())
          ) {
            children = elementType
              .getProperties()
              .filter((p) => {
                const d = p.getDeclarations()[0];
                return d && !d.getSourceFile().isDeclarationFile();
              })
              .map((p) => ({
                name: p.getName(),
                type: p.getTypeAtLocation(p.getDeclarations()[0]).getText(),
                required: !p.getDeclarations()[0].hasQuestionToken(),
              }));
          }
        } else if (propType.isInterface() || propType.isObject()) {
          children = propType
            .getProperties()
            .filter((p) => {
              const d = p.getDeclarations()[0];
              return d && !d.getSourceFile().isDeclarationFile();
            })
            .map((p) => ({
              name: p.getName(),
              type: p.getTypeAtLocation(p.getDeclarations()[0]).getText(),
              required: !p.getDeclarations()[0].hasQuestionToken(),
            }));
        }
      }

      const result = {
        name: prop.getName(),
        type: propType.getText(),
        required,
        description,
        examples,
        remarks,
      };

      if (children.length) {
        result.children = children;
      }

      return result;
    })
    .filter(Boolean);
}

// Scan all files
project.getSourceFiles().forEach((sourceFile) => {
  const filePath = path.relative(process.cwd(), sourceFile.getFilePath());

  // 1️⃣ Exported interfaces
  sourceFile.getInterfaces().forEach((intf) => {
    if (!intf.isExported()) return;

    output.push({
      component: intf.getName(),
      filePath,
      props: extractPropsFromType(intf.getType()),
    });
  });

  // 2️⃣ Exported type aliases (object literals)
  sourceFile.getTypeAliases().forEach((typeAlias) => {
    if (!typeAlias.isExported()) return;

    const typeNode = typeAlias.getTypeNode();
    if (!typeNode || typeNode.getKindName() !== "TypeLiteral") return;

    output.push({
      component: typeAlias.getName(),
      filePath,
      props: extractPropsFromType(typeAlias.getType()),
    });
  });

  // 3️⃣ Exported functions (components)
  sourceFile.getFunctions().forEach((fn) => {
    if (!fn.isExported()) return;
    const params = fn.getParameters();
    if (!params.length) return;

    output.push({
      component: fn.getName(),
      filePath,
      props: extractPropsFromType(params[0].getType()),
    });
  });

  // 4️⃣ Exported arrow/function expressions
  sourceFile.getVariableDeclarations().forEach((v) => {
    if (!v.isExported()) return;
    const init = v.getInitializer();
    if (!init) return;
    const kind = init.getKindName();
    if (kind !== "ArrowFunction" && kind !== "FunctionExpression") return;
    const params = init.getParameters();
    if (!params.length) return;

    output.push({
      component: v.getName(),
      filePath,
      props: extractPropsFromType(params[0].getType()),
    });
  });
});

// Write JSON output
const outputPath = path.join(process.cwd(), "generated/props.json");
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));

console.log("✅ Props JSON generated:", outputPath);
