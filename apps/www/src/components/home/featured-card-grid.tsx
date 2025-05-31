import CardGrid from "../shared/CardGrid";

const content = {
  id: "homepage-card-grid",
  title: "Features",
  layout: "column",
  items: [
    {
      id: "feature-1",
      title: "Preloading",
      description:
        "Optimize loading of your images to boost your Core Web Vitals.",
      icon: "lightning-bolt",
    },
    {
      id: "feature-2",
      title: "Responsive Images",
      description:
        "Fully responsive components for picture and background images, built on top of Next.js Image API and React 19.",
      icon: "image",
    },
    {
      id: "feature-3",
      title: "Visual Stability",
      description:
        "Prevent Cumulative Layout Shift (CLS) and improve your Core Web Vitals score.",
      icon: "rocketship",
    },
    {
      id: "feature-4",
      title: "Fully Compatible",
      description:
        "All components are unstyled and compatible with any React styling framework.",
      icon: "code",
    },
  ],
};

export default function FeaturedCardGrid() {
  return <CardGrid {...content} layout="column" />;
}
