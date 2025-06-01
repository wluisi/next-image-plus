import * as React from "react";
import { AppProps } from "next/app";

// Graphinery
import { GraphineryPageProps } from "@graphinery/client";
import {
  GraphineryProvider,
  useGraphineryClient,
} from "@graphinery/client/react";
import { config } from "./../graphinery";

// Components
import { default as PagesHeader } from "../components/examples/pages/header";

import "./../global.css";
import { Analytics } from "@vercel/analytics/next";

export default function MyApp({
  Component,
  pageProps,
}: AppProps<GraphineryPageProps>) {
  const client = useGraphineryClient(pageProps.initialState, config);

  return (
    <GraphineryProvider client={client} state={pageProps.initialState}>
      <PagesHeader />
      <div id="page-layout" className="container mx-auto px-4 py-4">
        <Component {...pageProps} />
      </div>
      <Analytics />
    </GraphineryProvider>
  );
}
