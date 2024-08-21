import * as React from "react";

import { UserStoreProvider } from "./UserStateProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <UserStoreProvider>
      {children}
    </UserStoreProvider>
  );
}
