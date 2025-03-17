import { defineConfig, Format } from "tsup";

const config = {
  dts: true,
  format: ["esm", "cjs"] as Format[],
  sourcemap: true,
  clean: true,
};

export default defineConfig([
  {
    ...config,
    entry: ["src/index.ts"],
    outDir: "dist",
    bundle: true,
    treeshake: false,
    splitting: false,
    // external: [/^src\/preload\/.+$/],
    esbuildOptions(options) {
      // We exclude the preload file, since we want to import it, as it has a `use client` directive.
      options.external = [
        "./preload",
        "react",
        "react-dom",
        "next",
        "next/image",
      ];
    },
  },
  {
    ...config,
    entry: ["src/preload.tsx"],
    outDir: "dist",
    bundle: false,
    splitting: false,
    treeshake: false,
    external: ["react", "react-dom", "next", "next/image"],
  },
]);
