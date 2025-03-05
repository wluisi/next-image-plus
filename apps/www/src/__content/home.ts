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
      description: "Turbocharge responsive images in your Nextjs app",
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
            "Optimize loading of your images to get a perfect lighthouse score.",
          icon: "lightning-bolt",
        },
        {
          id: "feature-2",
          title: "Open Source",
          description:
            "Yes, but out of the box, it does not directly support the picture element or background images.",
          icon: "image",
        },
        {
          id: "feature-3",
          title: "Background Images",
          description:
            "Get started in no time! Explore comprehensive documentation and rich examples.",
          icon: "rocketship",
        },
        {
          id: "feature-4",
          title: "Preloading",
          description:
            "Yes, but out of the box, it does not directly support the picture element or background images.",
          icon: "code",
        },
        // {
        //   id: "feature-5",
        //   title: "Open Source",
        //   description:
        //     "Yes, but out of the box, it does not directly support the picture element or background images.",
        //   icon: "desktop",
        // },
        // {
        //   id: "feature-6",
        //   title: "Background Images",
        //   description:
        //     "Get started in no time! Explore comprehensive documentation and rich examples.",
        //   icon: "gear",
        // },
      ],
    },
    {
      __typename: "Accordion",
      id: "homepage-accordion",
      title: "FAQ",
      description: "Turbocharge responsive images in your Nextjs app",
      items: [
        {
          id: "faq-1",
          question: "Can I use next-image-extras with the app router ?",
          answer:
            "Yes, next-image-extras is compatible with Nextjs pages and app routers.",
        },
        {
          id: "faq-2",
          question: "Doesn't next already have an image component?",
          answer:
            "Yes, but out of the box, it does not directly support the picture element or background images.",
        },
        {
          id: "faq-3",
          question: "Doesn't next already have an image component?",
          answer:
            "Yes, but out of the box, it does not directly support the picture element or background images.",
        },
      ],
    },
  ],
};
