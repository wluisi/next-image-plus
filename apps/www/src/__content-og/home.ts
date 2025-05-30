export const homeContent = {
  id: "home",
  title: "Next Image Plus",
  description: "Next Image Plus desc",
  metadata: {
    keywords: "keywords replace me",
  },
  mainContent: [
    {
      __typename: "Hero",
      id: "homepage-hero",
      title: "next-image-plus",
      description:
        "Primitive React components, that extend Next.js Image, to turbocharge your site's performance.",
      link: {
        url: "/docs",
        text: "Get started",
      },
    },
    {
      __typename: "CardGrid",
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
    },
    {
      __typename: "Accordion",
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
    },
  ],
};
