import * as React from "react";

import { NextUIProvider } from "@nextui-org/react";
import { UserStoreProvider } from "./UserStateProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <UserStoreProvider>
      <NextUIProvider>{children}</NextUIProvider>
    </UserStoreProvider>
  );
}
