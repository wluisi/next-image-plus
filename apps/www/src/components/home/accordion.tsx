import {
  Accordion as SharedAccordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Heading,
} from "@graphinery/ui";

const content = {
  id: "homepage-accordion",
  title: "FAQ",
  description: "Answers to common questions",
  items: [
    {
      id: "faq-1",
      question: "Can I use next-image-plus with the Next.js app router ?",
      answer:
        "Yes, next-image-plus is compatible with Next.js pages and app routers.",
    },
    {
      id: "faq-2",
      question: "Doesn't Next.js already have an Image component ?",
      answer:
        "Yes, but the Next.js Image component only works for <img> element. next-image-plus introduces two new React components, that does the heavy lifting for using <picture> element and responsive background images.",
    },
    {
      id: "faq-3",
      question: "What versions of React and Next.js are supported ?",
      answer:
        "Currently, only React 19 and Next.js 15 are supported. If support for React 18 and/or Next.js 14 is something you'd like to see added, please open an issue on github and we can discuss.",
    },
  ],
};

type AccordionPropsItem = {
  id: string;
  question: string;
  answer: string;
};

export default function Accordion() {
  return (
    <div id={content.id}>
      <Heading level="h2">{content.title}</Heading>
      <p className="text-lg text-black/90 mb-5">{content.description}</p>
      {content.items.map((item: AccordionPropsItem) => {
        return (
          <SharedAccordion key={item.id}>
            <AccordionItem>
              <h3 className="mb-0 text-m">
                <AccordionButton>{item.question}</AccordionButton>
              </h3>
              <AccordionPanel>{item.answer}</AccordionPanel>
            </AccordionItem>
          </SharedAccordion>
        );
      })}
    </div>
  );
}
