const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    nextui({
      addCommonColors: true,
      themes: {
        light: {
          extend: "light",
          colors: {
            text: "#050f0e",
            background: "#effbfa",
            primary: "#63ab9f",
            secondary: "#9ed1cb",
            accent: "#d18461",
          },
        },
        dark: {
          extend: "dark",
          colors: {
            text: "#f0faf9",
            background: "#04100f",
            primary: "#549c90",
            secondary: "#2e615b",
            accent: "#9e512e",
          },
        },
      },
    }),
  ],
};
