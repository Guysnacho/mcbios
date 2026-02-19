"use client";

import { AptabaseProvider } from "@aptabase/react";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { ColorModeProvider, type ColorModeProviderProps } from "./color-mode";

export function Provider(props: ColorModeProviderProps) {
  return (
    <AptabaseProvider
      appKey={process.env.NEXT_PUBLIC_ANALYTICS_KEY}
      options={{
        appVersion: process.env.version,
      }}
    >
      <ChakraProvider value={defaultSystem}>
        <ColorModeProvider {...props} />
      </ChakraProvider>
    </AptabaseProvider>
  );
}
