import * as React from "react";
import Hero from "./../../../components/examples/Hero";
import { Grid, GridItem } from "./../../../components/ui";
import SidebarMenu from "../../../components/SidebarMenu";
import { sidebarMenu } from "./../../../__content/sidebar-menu";
// mdx
import { getContent } from "./../../../utils/get-content";

export default async function ExamplesBackgroundImagePage() {
  const mdx = await getContent("background-image-example");

  return (
    <>
      <Hero
        title="Background image example"
        description="Create stunning websites and applications with our powerful platform. Get started today and bring your ideas to life."
      />
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
          <h1 className="text-4xl font-bold mb-5">Background image example</h1>
          <section className="prose">
            <p>fjsdjhsdfdssfd</p>
          </section>
          {/* <CardGrid /> */}
          <article className="space-y-5 prose">{mdx.content}</article>
        </GridItem>
      </Grid>
    </>
  );
}
