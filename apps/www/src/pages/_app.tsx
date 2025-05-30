import * as React from "react";
import { AppProps } from "next/app";
import "./../global.css";

import { Header } from "../components/header/Header";
import { mainMenu } from "../__content-og/main-menu";
import { Analytics } from "@vercel/analytics/next";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header id={mainMenu.id} menuItems={mainMenu.items} />
      <div id="page-layout" className="container mx-auto px-3 py-4">
        <Component {...pageProps} />
      </div>
      <Analytics />
    </>
  );
}
