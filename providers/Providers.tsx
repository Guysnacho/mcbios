import * as React from "react";

import { ChakraProvider } from "@chakra-ui/react";
import { UserStoreProvider } from "./UserStateProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <UserStoreProvider>
      <ChakraProvider>{children}</ChakraProvider>
    </UserStoreProvider>
  );
}
