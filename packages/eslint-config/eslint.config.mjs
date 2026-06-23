import { defineConfig } from "eslint/config";
import baseConfig from "./base.mjs";

export default defineConfig([
  ...baseConfig,
  {
    rules: {
      "import/no-unresolved": [
        "error",
        {
          ignore: [
            "^eslint/config$",
            "^typescript-eslint$",
            "^eslint-config-next/core-web-vitals$",
            "^eslint-config-next/typescript$",
          ],
        },
      ],
    },
  },
]);
