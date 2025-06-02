const path = require("path");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    // Set glob pattern to find the @graphinery/ui components.
    // This tells tailwind where to look for react components and find class names.
    path.join(
      path.dirname(require.resolve("@graphinery/ui")),
      "**/*.{js, jsx, ts, tsx}"
    ),
  ],
  theme: {
    container: {
      screens: {
        sm: "640px",
        // Default is 768px.
        md: "740px",
        lg: "1024px",
        xl: "1280px",
        // Default is 1536px.
        "2xl": "1440px",
      },
    },
  },
  darkMode: "selector",
  presets: [require("@graphinery/ui/tailwind-preset")],
};
