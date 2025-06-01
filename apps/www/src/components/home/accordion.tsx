import { default as SharedAccordion } from "../shared/Accordion";

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

export default function Accordion() {
  return <SharedAccordion {...content} />;
}
