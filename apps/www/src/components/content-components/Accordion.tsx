import {
  Accordion as SharedAccordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Heading,
} from "@graphinery/ui";

interface AccordionProps {
  id: string;
  title: string;
  description: string;
  items: AccordionPropsItem[];
}

type AccordionPropsItem = {
  id: string;
  question: string;
  answer: string;
};

export default function Accordion({
  id,
  title,
  description,
  items,
}: AccordionProps) {
  return (
    <div id={id}>
      <Heading level="h2">{title}</Heading>
      <p className="text-lg text-black/90 mb-5">{description}</p>
      {items.map((item: AccordionPropsItem) => {
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
