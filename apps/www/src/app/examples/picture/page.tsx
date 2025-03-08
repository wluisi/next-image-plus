import * as React from "react";
import CardGrid from "./../../../components/examples/CardGrid";
import { CodeSnippet, Grid, GridItem } from "./../../../components/ui";
import SidebarMenu from "../../../components/SidebarMenu";
import { sidebarMenu } from "./../../../__content/sidebar-menu";
// mdx
import { getContent } from "./../../../utils/get-content";

// const codeExample = `<Picture preload={preload} fallbackMedia="(max-width: 430px)">
//   <Source
//     media="(min-width: 431px) and (max-width: 1023px)"
//     src={image.medium.url}
//     sizes="100vw"
//     width={image.medium.width}
//     height={image.medium.height}
//   />
//   <Source
//     media="(min-width: 1024px)"
//     src={image.large.url}
//     width={image.large.width}
//     height={image.large.height}
//   />
//   <Image
//     src="https://picsum.photos/id/32/430/215"
//     width={430}
//     height={215}
//     alt="whatever"
//     className="object-cover"
//   />
// </Picture>
// `;

export default async function ExamplesPicture() {
  const mdx = await getContent("picture-example");

  return (
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
        <h1 className="text-4xl font-bold mb-5">Picture Component Example</h1>
        <section className="prose">
          <p>
            Responsive images with art direction, using different images and
            ratios per breakpoint.
          </p>
        </section>
        <CardGrid />
        <article className="space-y-5 prose">{mdx.content}</article>
      </GridItem>
    </Grid>
  );
}
