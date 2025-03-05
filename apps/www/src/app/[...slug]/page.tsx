import { getContent } from "./../../utils/get-content";
import { sidebarMenu } from "./../../__content/sidebar-menu";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Grid,
  GridItem,
} from "./../../components/ui";
import TableOfContents from "./../../components/table-of-contents";
import SidebarMenu from "../../components/SidebarMenu";
import Link from "next/link";

const breadcrumbs = [
  {
    title: "Home",
    url: "/",
    // isCurrentPage: true,
  },
  {
    title: "Docs",
    url: "/docs",
    isCurrentPage: false,
  },
];

export default async function PageSlugPage({
  params,
}: {
  params: Record<string, string | string[]>;
}) {
  const slug = params.slug[0];
  const page = await getContent(slug);

  return (
    <div id="page-layout" className="container mx-auto px-8 py-4">
      <main role="main">
        <Grid
          id="grid"
          className="md:grid md:grid-cols-12 md:grid-flow-col gap-5 pb-10"
        >
          <GridItem id="left-sidebar" as="aside" className="md:col-span-2">
            <SidebarMenu
              id={sidebarMenu.id}
              title={sidebarMenu.title}
              menuItems={sidebarMenu.items}
            />
          </GridItem>
          <GridItem id="main-content" className="md:col-span-8 pb-10 md:px-10">
            <article className="space-y-5 prose">
              <Breadcrumb className="m-auto max-w-xxl">
                {breadcrumbs.map((item) => {
                  return (
                    <BreadcrumbItem key={item.url}>
                      <BreadcrumbLink
                        as={Link}
                        href={item.url}
                        isCurrentPage={item.isCurrentPage}
                      >
                        {item.title}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                  );
                })}
              </Breadcrumb>
              {page.content}
            </article>
          </GridItem>
          <GridItem id="left-sidebar" as="aside" className="md:col-span-2">
            <TableOfContents data={page.toc} />
          </GridItem>
        </Grid>
      </main>
    </div>
  );
}
