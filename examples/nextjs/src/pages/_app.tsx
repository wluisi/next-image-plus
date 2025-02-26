import * as React from "react";
import { AppProps } from "next/app";

// Components
import "./globals.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
