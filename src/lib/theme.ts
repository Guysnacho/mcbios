import { defineConfig, createSystem, defaultConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        text: {
          value: "#021524",
        },
        background: {
          main: {
            value: "#ecf6fe",
          },
          50: {
            value: "#e7f3fe",
          },
          100: {
            value: "#cfe8fc",
          },
          200: {
            value: "#9ed1fa",
          },
          300: {
            value: "#6eb9f7",
          },
          400: {
            value: "#3da2f5",
          },
          500: {
            value: "#0d8bf2",
          },
          600: {
            value: "#0a6fc2",
          },
          700: {
            value: "#085391",
          },
          800: {
            value: "#053861",
          },
          900: {
            value: "#031c30",
          },
        },
        primary: {
          main: {
            value: "#0f9cf2",
          },
          50: {
            value: "#e7f5fe",
          },
          100: {
            value: "#cfebfc",
          },
          200: {
            value: "#9ed7fa",
          },
          300: {
            value: "#6ec3f7",
          },
          400: {
            value: "#3daef5",
          },
          500: {
            value: "#0d9af2",
          },
          600: {
            value: "#0a7bc2",
          },
          700: {
            value: "#085d91",
          },
          800: {
            value: "#053e61",
          },
          900: {
            value: "#031f30",
          },
        },
        secondary: {
          main: {
            value: "#a36ef7",
          },
          50: {
            value: "#f0e7fe",
          },
          100: {
            value: "#e0cffc",
          },
          200: {
            value: "#c19efa",
          },
          300: {
            value: "#a26ef7",
          },
          400: {
            value: "#843df5",
          },
          500: {
            value: "#650df2",
          },
          600: {
            value: "#510ac2",
          },
          700: {
            value: "#3c0891",
          },
          800: {
            value: "#280561",
          },
          900: {
            value: "#140330",
          },
        },
        accent: {
          main: {
            value: "#b74df5",
          },
          50: {
            value: "#f5e7fe",
          },
          100: {
            value: "#eccffc",
          },
          200: {
            value: "#d89ff9",
          },
          300: {
            value: "#c56ef7",
          },
          400: {
            value: "#b13ef4",
          },
          500: {
            value: "#9e0ef1",
          },
          600: {
            value: "#7e0bc1",
          },
          700: {
            value: "#5f0891",
          },
          800: {
            value: "#3f0660",
          },
          900: {
            value: "#200330",
          },
        },
      },
    },
  },
});

export const  system = createSystem(defaultConfig, config);