import {
  JumbotronBodyLeft,
  JumbotronBodyRight,
  JumbotronCta,
  JumbotronHeading,
  JumbotronProse,
  GraphTreeIcon,
  ImageIcon,
  Jumbotron as SharedJumbotron,
  JumbotronLink as SharedJumbotronLink,
} from "@graphinery/ui";

import NextLink from "next/link";

// @todo move this to a css var in the graphinery/ui tailwind preset?
const graphBgClass =
  "bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,theme(colors.zinc.600)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.zinc.600)_1px,transparent_1px)] bg-[size:24px_24px]";

function JumbotronIcon() {
  // stroke-red-500 dark:stroke-red-100
  return (
    <ImageIcon className="h-[200px] w-[200px] text-red-200 dark:text-red-100 opacity-25 dark:opacity-10" />
  );
}

function JumbotronLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <SharedJumbotronLink as={NextLink} href={href}>
      {children}
    </SharedJumbotronLink>
  );
}

interface JumbotronProps {
  children: React.ReactNode;
}

function Jumbotron({ children }: JumbotronProps) {
  return <SharedJumbotron>{children}</SharedJumbotron>;
}

export const JumbotronComponents = {
  Jumbotron,
  JumbotronLink,
  JumbotronIcon,
  JumbotronBodyLeft,
  JumbotronBodyRight,
  JumbotronCta,
  JumbotronHeading,
  JumbotronProse,
};

export default JumbotronComponents;
