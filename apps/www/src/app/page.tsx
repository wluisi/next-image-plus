import { notFound } from "next/navigation";

import { Grid, GridItem } from "@graphinery/ui";

import { GraphineryMdx } from "@graphinery/mdx";
import Hero from "./../components/home/hero";
import FeaturedCardGrid from "./../components/home/featured-card-grid";
import Accordion from "../components/home/accordion";

// Metadata
import { metadata as layoutMetadata } from "./layout";
import { Metadata } from "next";

// Content collections
import { getEntry } from "./../utils/get-entry";

export async function generateMetadata(): Promise<Metadata | undefined> {
  const page = getEntry("index", { collection: "page" });

  if (!page) {
    return;
  }

  return {
    title: page.title,
    description: page.description,
    abstract: page.description,
    keywords: page.keywords,
    // This sets the `<link rel="canonical">`.
    alternates: {
      canonical: page._path,
    },
    openGraph: {
      ...layoutMetadata.openGraph,
      title: page.title,
      description: page.description,
      url: page._path,
    },
    twitter: {
      ...layoutMetadata.twitter,
      title: page.title,
      description: page.description,
    },
  };
}

export default async function HomePage() {
  const home = getEntry("/", { collection: "page" });

  if (!home || !home.content) {
    notFound();
  }

  return (
    <Grid
      id="grid"
      className="grid md:grid-cols-8 md:grid-flow-col gap-5 pt-5 pb-10"
    >
      <GridItem
        id="home__main-content"
        className="md:col-span-8 pb-10 md:px-10"
      >
        <div className="max-w-[960px] mx-auto py-3">
          <GraphineryMdx
            mdx={home.content}
            components={{
              Accordion: Accordion,
              FeaturedCardGrid: FeaturedCardGrid,
              Hero: Hero,
            }}
          />
        </div>
      </GridItem>
    </Grid>
  );
}
