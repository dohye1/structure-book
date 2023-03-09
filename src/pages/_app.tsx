import "@/styles/globals.css";
import { ThemeProvider } from "@emotion/react";
import type { AppProps } from "next/app";
import { Roboto } from "@next/font/google";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider } from "react-query";
import Header from "@/component/Header";
import theme from "@/styles/theme";
import "react-quill/dist/quill.snow.css";

const client = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false },
  },
});

const roboto = Roboto({
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={client}>
      {process.env.NODE_ENV !== "production" ? (
        <ReactQueryDevtools initialIsOpen={false} />
      ) : null}
      <main className={roboto.className}>
        <ThemeProvider theme={theme}>
          <Header />
          <Component {...pageProps} />
        </ThemeProvider>
      </main>
    </QueryClientProvider>
  );
}
