import * as React from "react";

import { UserStoreProvider } from "./UserStateProvider";
import { NextUIProvider } from "@nextui-org/react";
import { ChakraProvider } from "@chakra-ui/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider>
      <UserStoreProvider>
        <NextUIProvider>{children}</NextUIProvider>
      </UserStoreProvider>
    </ChakraProvider>
  );
}
