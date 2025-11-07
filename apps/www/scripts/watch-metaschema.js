const { watchFile } = require("fs");
const { exec } = require("child_process");

watchFile("./src/graphinery/metaschema.ts", () => {
  console.log("metaschema changed — running gql-tada generate-schema");
  exec("npm run generate:schema");
});
