import { homeContent } from "./../__content/home";
import { Grid, GridItem } from "./../components/ui";
import { ContentComponents } from "./../components/content-components";
import Hero from "./../components/Hero";
import Accordion from "./../components/content-components/Accordion";
import CardGrid from "./../components/content-components/CardGrid";

import { metadataBase } from "./../__content/metadata";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata | undefined> {
  const { title, description, metadata } = homeContent;
  const titleFinal = `${title} | ${metadataBase.siteName}`;

  return {
    title: titleFinal,
    description: description,
    abstract: description,
    keywords: metadata.keywords,
    alternates: {
      canonical: metadataBase.url,
    },
    openGraph: {
      title: titleFinal,
      description: description,
      type: "website",
      siteName: metadataBase.siteName,
      url: metadataBase.url,
    },
    twitter: {
      title: titleFinal,
      description: description,
      card: "summary",
      site: metadataBase.url,
      creator: metadataBase.twitterHandle,
    },
  };
}

export default async function HomePage() {
  return (
    <Grid
      id="grid"
      className="grid md:grid-cols-8 md:grid-flow-col gap-5 pt-5 pb-10"
    >
      <GridItem
        id="home__main-content"
        className="md:col-span-8 pb-10 md:px-10"
      >
        <div className="max-w-[960px] mx-auto px-3 py-3">
          <ContentComponents
            content={homeContent.mainContent}
            components={{
              Hero: Hero,
              Accordion: Accordion,
              CardGrid: CardGrid,
            }}
          />
        </div>
      </GridItem>
    </Grid>
  );
}
