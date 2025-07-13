import { defineConfig, createSystem, defaultConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        text: {
          DEFAULT: {
            value: "#04050d",
          },
        },
        background: {
          DEFAULT: {
            value: "#f4f5fc",
          },
          50: {
            value: "#ebedfa",
          },
          100: {
            value: "#d7daf4",
          },
          200: {
            value: "#afb6e9",
          },
          300: {
            value: "#8791de",
          },
          400: {
            value: "#5f6cd3",
          },
          500: {
            value: "#3748c8",
          },
          600: {
            value: "#2c39a0",
          },
          700: {
            value: "#212b78",
          },
          800: {
            value: "#161d50",
          },
          900: {
            value: "#0b0e28",
          },
        },
        primary: {
          DEFAULT: {
            value: "#0e2dcf",
          },
          50: {
            value: "#e7ebfd",
          },
          100: {
            value: "#cfd7fc",
          },
          200: {
            value: "#a0aef8",
          },
          300: {
            value: "#7086f5",
          },
          400: {
            value: "#405ef2",
          },
          500: {
            value: "#1136ee",
          },
          600: {
            value: "#0d2bbf",
          },
          700: {
            value: "#0a208f",
          },
          800: {
            value: "#07155f",
          },
          900: {
            value: "#030b30",
          },
        },
        secondary: {
          DEFAULT: {
            value: "#e197a9",
          },
          50: {
            value: "#f9ebef",
          },
          100: {
            value: "#f4d7de",
          },
          200: {
            value: "#e8b0be",
          },
          300: {
            value: "#dd889d",
          },
          400: {
            value: "#d1617d",
          },
          500: {
            value: "#c6395c",
          },
          600: {
            value: "#9e2e4a",
          },
          700: {
            value: "#772237",
          },
          800: {
            value: "#4f1725",
          },
          900: {
            value: "#280b12",
          },
        },
        accent: {
          DEFAULT: {
            value: "#d19962",
          },
          50: {
            value: "#f9f2eb",
          },
          100: {
            value: "#f4e6d7",
          },
          200: {
            value: "#e8ccb0",
          },
          300: {
            value: "#ddb388",
          },
          400: {
            value: "#d19961",
          },
          500: {
            value: "#c68039",
          },
          600: {
            value: "#9e662e",
          },
          700: {
            value: "#774d22",
          },
          800: {
            value: "#4f3317",
          },
          900: {
            value: "#281a0b",
          },
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
