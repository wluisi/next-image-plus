import { resolve } from "path";
import { defineConfig } from "eslint/config";
import baseConfig from "@next-image-plus/eslint-config/base";
import nextConfig from "@next-image-plus/eslint-config/next";
// import tailwindConfig from "@next-image-plus/eslint-config/tailwind";

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
