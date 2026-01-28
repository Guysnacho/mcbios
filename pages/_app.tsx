import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import RootLayout from "@/components/layout";
import { Provider } from "@/components/ui/provider";
import { Toaster } from "@/components/ui/toaster";

import "@/styles/globals.css";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement<any>) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(
    <Provider>
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
      <Toaster />
    </Provider>
  );
}
