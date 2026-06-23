import { defineConfig, globalIgnores } from "eslint/config";
import baseConfig from "./packages/eslint-config/base.mjs";

export default defineConfig([
  globalIgnores(["examples/next/**"]),
  ...baseConfig,
]);
