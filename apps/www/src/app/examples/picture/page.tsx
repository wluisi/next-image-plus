import * as React from "react";
import CardGrid from "./../../../components/examples/CardGrid";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Grid,
  GridItem,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./../../../components/ui";
import SidebarMenu from "../../../components/SidebarMenu";
import Link from "next/link";

import { sidebarMenu } from "./../../../__content/sidebar-menu";
// mdx
import { getContent } from "./../../../utils/get-content";

const breadcrumbs = [
  {
    title: "Home",
    url: "/",
    isCurrentPage: false,
  },
  {
    title: "Examples",
    url: "/examples",
    isCurrentPage: false,
  },
  {
    title: "Picture Component",
    url: "/examples/picture",
    isCurrentPage: true,
  },
];

export default async function ExamplesPicture() {
  const mdx = await getContent("picture-example");

  return (
    <Grid
      id="grid"
      className="md:grid md:grid-cols-12 md:grid-flow-col gap-5 pb-10"
    >
      <GridItem
        id="left-sidebar"
        as="aside"
        className="hidden md:flex md:col-span-2 md:h-screen md:sticky md:top-[var(--docs-navbar-height)]"
      >
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
          <h1 className="text-4xl font-bold mb-5">Picture Component Example</h1>

          <Tabs defaultValue="preview">
            <TabsList>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>
            <TabsContent value="preview">
              <CardGrid />
            </TabsContent>
            <TabsContent value="code">
              <div className="md:my-10">{mdx.content}</div>
            </TabsContent>
          </Tabs>
        </article>

        {/* <section className="prose">
          <p>
            Responsive images with art direction, using different images and
            ratios per breakpoint.
          </p>
        </section>
        {/* <CardGrid /> */}
        {/* <article className="space-y-5 prose">{mdx.content}</article> */}
      </GridItem>
    </Grid>
  );
}
