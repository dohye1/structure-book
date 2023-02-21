import "@/styles/globals.css";
import { ThemeProvider } from "@emotion/react";
import type { AppProps } from "next/app";
import Header from "@/component/Header";
import theme from "@/styles/theme";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
