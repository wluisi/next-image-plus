import { AppProps } from "next/app";

// Components
import { default as PagesHeader } from "../components/examples-pages/header";

import "./../global.css";
import { Analytics } from "@vercel/analytics/next";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <PagesHeader />
      <div id="page-layout" className="container mx-auto px-4 py-4">
        <Component {...pageProps} />
      </div>
      <Analytics />
    </>
  );
}
