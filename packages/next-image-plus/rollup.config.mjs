import dts from "rollup-plugin-dts";
import esbuild from "rollup-plugin-esbuild";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import preserveDirectives from "rollup-preserve-directives";

import pkg from "./package.json" with { type: "json" };

const external = [
  ...Object.keys(pkg.dependencies ?? {}),
  ...Object.keys(pkg.devDependencies ?? {}),
  ...Object.keys(pkg.peerDependencies ?? {}),
  "next/compat/router",
  "next/head",
  "next/image",
  "next/navigation",
  "react/jsx-dev-runtime",
  "react/jsx-runtime",
];

const config = [
  {
    input: "src/index.ts",
    output: [
      {
        dir: "dist/esm",
        format: "esm",
        preserveModules: true,
        preserveModulesRoot: "src",
      },
      {
        dir: "dist/cjs",
        format: "cjs",
        preserveModules: true,
        preserveModulesRoot: "src",
      },
    ],
    plugins: [resolve(), commonjs(), esbuild(), preserveDirectives()],
    external: external,
  },
  // dts files.
  {
    input: "src/index.ts",
    output: { file: "dist/index.d.ts", format: "es" },
    plugins: [dts()],
    external: external,
  },
];

export default config;
