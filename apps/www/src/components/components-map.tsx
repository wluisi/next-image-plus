import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  CodeSnippet,
  Heading,
  HeadingAnchorLink,
} from "./../components/ui";

/**
 * Build a components map for use in compileMDX().
 */
export const componentMap = {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  // Overrides
  h1(props: any) {
    return <Heading level="h1" {...props} />;
  },
  h2(props: any) {
    return <HeadingAnchorLink level="h2" title={props.children as string} />;
  },
  h3(props: any) {
    return <HeadingAnchorLink level="h3" title={props.children as string} />;
  },
  table(props: any) {
    return (
      <div className="overflow-x-auto">
        <table {...props} />
      </div>
    );
  },
  pre(props: any) {
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
    return <CodeSnippet title={title} language={language} code={codeFinal} />;
  },
};
