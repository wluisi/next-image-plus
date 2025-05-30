import { createGraphinery } from "@graphinery/core";
import { graphineryMdxPlugin } from "@graphinery/mdx";
import { metaschema } from "./src/graphinery/metaschema";

import { cache } from "./.graphinery/cache";

export const graphinery = createGraphinery({
  name: "graphinery-docs",
  plugins: [
    graphineryMdxPlugin({
      name: "docs",
      baseDirectory: "./src/__content",
      metaschema: metaschema,
      cache: cache,
      menu: true,
    }),
  ],
});
