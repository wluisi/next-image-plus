import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  outDir: "dist",
  sourcemap: true,
  clean: true,
  treeshake: true,
  splitting: true,
  dts: true,
  format: ["esm", "cjs"],
  external: ["react", "react-dom", "next", "next/image"],
  // external: [
  //   "react",
  //   "react-dom",
  //   "next",
  //   "next/head",
  //   "next/image",
  //   "next/compat/router",
  // ],
});
