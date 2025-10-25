const { Project } = require("ts-morph");
const fs = require("fs");
const path = require("path");

// Initialize project with tsconfig
const project = new Project({
  tsConfigFilePath: "packages/next-image-plus/tsconfig.json", // adjust if using package-specific tsconfig
});

// Add all source files in your package
project.addSourceFilesAtPaths("packages/next-image-plus/**/src/**/*.{ts,tsx}");

const output = [];

// Recursive scan: all interfaces in all files
project.getSourceFiles().forEach((sourceFile) => {
  sourceFile.getInterfaces().forEach((intf) => {
    const props = intf.getProperties().map((prop) => {
      const jsDocs = prop.getJsDocs();
      const description =
        jsDocs
          .map((d) => d.getComment())
          .filter(Boolean)
          .join(" ") || "";
      const examples = jsDocs
        .flatMap((d) => d.getTags())
        .filter((t) => t.getTagName() === "example")
        .map((t) => t.getComment())
        .filter(Boolean);

      return {
        name: prop.getName(),
        type: prop.getType().getText(),
        required: !prop.hasQuestionToken(),
        description,
        examples,
      };
    });

    output.push({
      interfaceName: intf.getName(),
      filePath: path.relative(process.cwd(), sourceFile.getFilePath()),
      props,
    });
  });
});

// Write JSON output
const outputPath = path.join(process.cwd(), "generated/props.json");
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));

console.log("✅ Props JSON generated:", outputPath);
