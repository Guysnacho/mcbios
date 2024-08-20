import * as React from "react";

import { NextUIProvider } from "@nextui-org/react";
import { UserStoreProvider } from "./UserStateProvider";
import { ChakraProvider } from "@chakra-ui/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <UserStoreProvider>
      <NextUIProvider>
        <ChakraProvider>{children}</ChakraProvider>
      </NextUIProvider>
    </UserStoreProvider>
  );
}
