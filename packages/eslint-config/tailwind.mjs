import eslintPluginBetterTailwindcss from "eslint-plugin-better-tailwindcss";

export default {
  plugins: { "better-tailwindcss": eslintPluginBetterTailwindcss },
  rules: {
    ...eslintPluginBetterTailwindcss.configs.recommended.rules,
    "better-tailwindcss/enforce-consistent-line-wrapping": "error",
    "better-tailwindcss/no-unknown-classes": [
      "warn",
      {
        // Only for tailwind v4
        // detectComponentClasses: true,
      },
    ],
  },
};
