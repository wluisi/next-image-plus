import { getContent } from "./../../utils/get-content";
import { Grid, GridItem } from "./../../components/ui";
import TableOfContents from "./../../components/table-of-contents";

export default async function PageSlugPage({
  params,
}: {
  params: Record<string, string | string[]>;
}) {
  const slug = params.slug[0];
  const page = await getContent(slug);

  return (
    <div id="page-layout" className="container mx-auto px-10 py-3">
      <main role="main">
        <Grid
          id="grid"
          className="grid md:grid-cols-12 md:grid-flow-col gap-5 pt-5 pb-10"
        >
          <GridItem id="left-sidebar" as="aside" className="md:col-span-2">
            Sidebar nav
          </GridItem>
          <GridItem id="main-content" className="md:col-span-8 pb-10 md:px-10">
            <article className="space-y-7 prose">{page.content}</article>
          </GridItem>
          <GridItem id="left-sidebar" as="aside" className="md:col-span-2">
            <TableOfContents data={page.toc} />
          </GridItem>
        </Grid>
      </main>
    </div>
  );
}
