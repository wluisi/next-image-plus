import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  globalIgnores(["**/.next/**", "**/out/**", "**/next-env.d.ts"]),

  // Next.js
  ...nextTs,
  ...nextVitals,

  {
    rules: {
      "@next/next/no-html-link-for-pages": "off",
    },
  },
]);
