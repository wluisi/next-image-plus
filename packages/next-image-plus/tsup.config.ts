import { defineConfig, Format } from "tsup";

const config = {
  dts: true,
  format: ["esm", "cjs"] as Format[],
  sourcemap: true,
  clean: true,
  // This is a workaround because the tsup --watch flag,
  // typically used in dev script does not properly hot reload.
  // @see https://github.com/egoist/tsup/issues/1245#issuecomment-2610240295
  watch: ["src/**/*.{ts,tsx}"],
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
