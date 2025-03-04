import { Grid, GridItem } from "./../components/ui";
import Hero from "./../components/Hero";

import { getContent } from "./../utils/get-content";

export default async function HomePage() {
  const page = await getContent("home");

  return (
    <div id="page-layout" className="max-w-[960px] mx-auto px-10 py-3">
      <main role="main">
        <Grid
          id="grid"
          className="grid md:grid-cols-8 md:grid-flow-col gap-5 pt-5 pb-10"
        >
          <GridItem id="main-content" className="md:col-span-8 pb-10 md:px-10">
            <Hero />
            <article className="space-y-7 prose">{page.content}</article>
          </GridItem>
        </Grid>
      </main>
    </div>
  );
}
