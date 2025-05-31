import { Hero as GraphineryUiHero } from "@graphinery/ui";
import Link from "next/link";

const content = {
  id: "homepage-hero",
  title: "next-image-plus",
  description:
    "Primitive React components, that extend Next.js Image, to turbocharge your site's performance.",
  link: {
    url: "/docs/getting-started",
    text: "Get started",
  },
};

export default function Hero() {
  return <GraphineryUiHero {...content} linkAs={Link} />;
}
