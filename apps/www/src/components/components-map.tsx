import * as React from "react";
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Callout,
  CodeSnippet,
  FeaturedLink,
  File,
  FileTree,
  Folder,
  Heading,
  HeadingAnchorLink,
  Link,
  PageNav,
  PageNavItem,
  SimpleGrid,
  Steps,
} from "@graphinery/ui";
import NextLink from "next/link";

import { default as ExamplesCardGrid } from "./examples/card-grid";
import { default as ExamplesHero } from "./examples/hero";
import PictureExampleTabs from "./examples/picture-tabs";
import BackgroundImageExampleTabs from "./examples/background-image-tabs";
//
import BlogCollection from "./../components/blog/blog-collection";

import {
  ComponentPropsTable,
  ComponentPropsDescriptionSet,
} from "./component-props";

const createComponentMap = <T extends Record<string, React.ComponentType<any>>>(
  map: T
) => map;

/**
 * Build a components map for use in compileMDX().
 */
export const componentsMap = createComponentMap({
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  BlogCollection,
  Callout,
  FeaturedLink: (props) => {
    return <FeaturedLink as={NextLink} {...props} />;
  },
  PageNav,
  PageNavItem: (props) => {
    return (
      // The classname `[&_svg]:shrink-0` is a temporary workaround to fix the icon shrinking if text wraps
      // @todo this should get added to the `<PageNavItem />` component.
      <PageNavItem as={NextLink} className="[&_svg]:shrink-0" {...props} />
    );
  },
  FileTree,
  Folder,
  File,
  ExamplesCardGrid,
  ExamplesHero,
  PictureExampleTabs,
  Link: (props) => {
    return <Link as={NextLink} {...props} className="text-blue-600" />;
  },
  BackgroundImageExampleTabs,
  Steps,
  SimpleGrid,
  ComponentPropsTable,
  ComponentPropsDescriptionSet,
  // Overrides
  h1: (props) => {
    return <Heading level="h1" {...props} />;
  },
  h2: (props) => {
    return <HeadingAnchorLink level="h2" title={props.children as string} />;
  },
  h3: (props) => {
    return <HeadingAnchorLink level="h3" title={props.children as string} />;
  },
  table: (props) => {
    return (
      <div className="overflow-x-auto" tabIndex={0}>
        <table {...props} />
      </div>
    );
  },
  pre: (props) => {
    const code = props.children?.props?.children as string;
    const language = props.children?.props?.className.replace("language-", "");

    let codeFinal = "";
    let title;

    const firstLine = code.split("\n")[0];
    const shortcode = "@filename:";

    if (firstLine.startsWith(shortcode)) {
      codeFinal = code.split("\n").slice(1).join("\n");
      title = firstLine.split(shortcode)[1];
    } else {
      codeFinal = code;
    }

    return (
      <CodeSnippet
        title={title}
        language={language}
        code={codeFinal}
        theme="material-theme-palenight"
        colorReplacements={{
          "#676e95": "#b9bbcb",
        }}
      />
    );
  },
});
