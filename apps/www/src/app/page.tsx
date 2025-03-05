import { homeContent } from "./../__content/home";
import { Grid, GridItem } from "./../components/ui";
import { ContentComponents } from "./../components/content-components";
import Hero from "./../components/Hero";
import Accordion from "./../components/content-components/Accordion";
import CardGrid from "./../components/content-components/CardGrid";

export default async function HomePage() {
  return (
    <div id="page-layout" className="max-w-[960px] mx-auto px-10 py-3">
      <main role="main">
        <Grid
          id="grid"
          className="grid md:grid-cols-8 md:grid-flow-col gap-5 pt-5 pb-10"
        >
          <GridItem id="main-content" className="md:col-span-8 pb-10 md:px-10">
            <ContentComponents
              content={homeContent.mainContent}
              components={{
                Hero: Hero,
                Accordion: Accordion,
                CardGrid: CardGrid,
              }}
            />
          </GridItem>
        </Grid>
      </main>
    </div>
  );
}
