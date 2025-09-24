"use client";

import { system } from "@/lib/theme";
import { ChakraProvider } from "@chakra-ui/react";
import { ColorModeProvider, type ColorModeProviderProps } from "./color-mode";
import { Theme } from "@radix-ui/themes";

export function Provider(props: ColorModeProviderProps) {
  return (
    <Theme>
      <ChakraProvider value={system}>
        <ColorModeProvider {...props} />
      </ChakraProvider>
    </Theme>
  );
}
