import { resolve } from "path";
import { defineConfig } from "eslint/config";
import baseConfig from "@graphinery/eslint-config/base";
import nextConfig from "@graphinery/eslint-config/next";
// import tailwindConfig from "@graphinery/eslint-config/tailwind";

export default defineConfig([
  ...baseConfig,
  ...nextConfig,
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
  // {
  //   ...tailwindConfig,
  //   files: ["**/*.{js,jsx,ts,tsx}"],
  //   settings: {
  //     "better-tailwindcss": {
  //       cwd: resolve(import.meta.dirname),
  //       entryPoint: "src/app/globals.css",
  //     },
  //   },
  // },
]);
