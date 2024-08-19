import * as React from "react";

import { getLocalTimeZone, today } from "@internationalized/date";
import { NextUIProvider } from "@nextui-org/react";
import { UserStoreProvider } from "./UserStateProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <UserStoreProvider>
      <NextUIProvider defaultDates={{ maxDate: today(getLocalTimeZone()) }}>
        {children}
      </NextUIProvider>
    </UserStoreProvider>
  );
}
