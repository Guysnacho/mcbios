import { Footer } from "@/components/Footer";
import Nav from "@/components/Nav";
import { Provider } from "@/components/ui/provider";
import { Toaster } from "@/components/ui/toaster";

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;
  return (
    <html suppressHydrationWarning>
      <body>
        <Provider>
          <Nav />
          {children}
          <Footer />
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
