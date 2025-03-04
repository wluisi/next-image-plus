const path = require("path");
// import typographyPlugin from "@tailwindcss/typography";
import typographyStyles from "./typography";
const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontSize: {
      xs: ["0.8125rem", { lineHeight: "1.5rem" }],
      sm: ["0.875rem", { lineHeight: "1.5rem" }],
      base: ["1rem", { lineHeight: "1.75rem" }],
      lg: ["1.125rem", { lineHeight: "1.75rem" }],
      xl: ["1.25rem", { lineHeight: "2rem" }],
      "2xl": ["1.5rem", { lineHeight: "2rem" }],
      "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
      "4xl": ["2rem", { lineHeight: "2.5rem" }],
      "5xl": ["3rem", { lineHeight: "3.5rem" }],
      "6xl": ["3.75rem", { lineHeight: "1" }],
      "7xl": ["4.5rem", { lineHeight: "1" }],
      "8xl": ["6rem", { lineHeight: "1" }],
      "9xl": ["8rem", { lineHeight: "1" }],
    },
    typography: typographyStyles,
    extend: {},
  },
  plugins: [
    plugin(function ({ addBase, config }) {
      // Add default styles
      addBase({
        p: {
          margin: `${config("theme.spacing.2")} 0`,
        },
        a: {
          color: config("theme.colors.blue.500"),
          textDecoration: "underline",
          textUnderlineOffset: config("theme.spacing.1"),
        },
        hr: {
          margin: `${config("theme.spacing.5")} 0`,
        },
        ul: {
          listStyleType: "disc",
          paddingLeft: config("theme.spacing.7"),
        },
        ol: {
          listStyleType: "decimal",
          paddingLeft: config("theme.spacing.7"),
        },
        h2: {
          fontWeight: "bold",
          marginBottom: config("theme.spacing.5"),
          fontSize: config("theme.fontSize.2xl"),
        },
        // h3: {
        //   fontWeight: "bold",
        //   marginBottom: config("theme.spacing.3"),
        //   fontSize: config("theme.fontSize.1xl"),
        // },
        table: {
          width: "100%",
          marginBottom: config("theme.spacing.7"),
          fontSize: config("theme.fontSize.xs"),
          // overflowX: "auto",
          // whiteSpace: "pre-wrap",
        },
        "table tr th": {
          textAlign: "left",
          backgroundColor: config("theme.colors.gray.700"),
          color: config("theme.colors.white"),
          padding: `${config("theme.spacing.3")} ${config("theme.spacing.4")}`,
        },
        "table tr td": {
          borderBottom: `1px solid ${config("theme.colors.gray.500")}`,
          padding: `${config("theme.spacing.3")} ${config("theme.spacing.4")}`,
        },
      });
    }),
  ],
};
