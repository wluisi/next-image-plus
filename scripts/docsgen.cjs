// eslint-disable-next-line
const { createDocsgen } = require("@graphinery/docsgen");

createDocsgen(["next-image-plus"], {
  packagesRoot: "packages",
  mdxOutputDir: "apps/www/src/__content/[propsDoc]",
  jsonOutputDir: "docsgen.json",
});
