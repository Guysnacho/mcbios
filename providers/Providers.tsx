import * as React from "react";

import { UserStoreProvider } from "./UserStateProvider";
import { NextUIProvider } from "@nextui-org/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <UserStoreProvider>
      <NextUIProvider>{children}</NextUIProvider>
    </UserStoreProvider>
  );
}
