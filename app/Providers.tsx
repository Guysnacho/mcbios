// app/providers.tsx
'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  colors: {
    text: {
      main: "#100217",
    },
    background: {
      main: "#f4f2f1",
      50: "#f4f2f1",
      100: "#e9e4e2",
      200: "#d2cac6",
      300: "#bcafa9",
      400: "#a5958d",
      500: "#8f7a70",
      600: "#72625a",
      700: "#564943",
      800: "#39312d",
      900: "#1d1816",
    },
    primary: {
      main: "#ae2a0f",
      50: "#fdebe8",
      100: "#fbd7d0",
      200: "#f7afa1",
      300: "#f38872",
      400: "#ef6043",
      500: "#eb3814",
      600: "#bc2d10",
      700: "#8d220c",
      800: "#5e1608",
      900: "#2f0b04",
    },
    secondary: {
      main: "#bfd9d0",
      50: "#eff5f3",
      100: "#dfece7",
      200: "#bfd9d0",
      300: "#9fc6b8",
      400: "#80b3a1",
      500: "#609f89",
      600: "#4d806e",
      700: "#396052",
      800: "#264037",
      900: "#13201b",
    },
    accent: {
      main: "#764091",
      50: "#f4edf7",
      100: "#e9dcef",
      200: "#d3b8e0",
      300: "#bc95d0",
      400: "#a671c1",
      500: "#904eb1",
      600: "#733e8e",
      700: "#562f6a",
      800: "#3a1f47",
      900: "#1d1023",
    },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </CacheProvider>
  )
}