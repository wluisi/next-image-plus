const FALLBACK_WIDTH = 430;
const FALLBACK_HEIGHT = 215;

const MEDIUM_WIDTH = 860;
const MEDIUM_HEIGHT = 430;

const LARGE_WIDTH = 220;
const LARGE_HEIGHT = 220;

function getImage({ id, breakpoint }: any) {
  let url = `https://picsum.photos/id/${id}`;

  if (breakpoint === "fallback") {
    url = `${url}/${FALLBACK_WIDTH}/${FALLBACK_HEIGHT}`;
  }

  if (breakpoint === "medium") {
    url = `${url}/${MEDIUM_WIDTH}/${MEDIUM_HEIGHT}`;
  }

  if (breakpoint === "large") {
    url = `${url}/${LARGE_WIDTH}/${LARGE_HEIGHT}`;
  }

  return url;
}

export const cardsContent = [
  {
    id: "abcd-1234",
    title: "Deploy your site with confidence",
    description:
      "Get blazing fast performance with automatic CI/CD pipelines, built-in CDN, and serverless functions. Scale globally with zero configuration and enjoy 99.99% uptime for all your projects. Experience the future of web deployment today.",
    image: {
      fallback: {
        alt: "fallback",
        url: getImage({ id: 59, breakpoint: "fallback" }),
        width: FALLBACK_WIDTH,
        height: FALLBACK_HEIGHT,
      },
      medium: {
        alt: "medium",
        url: getImage({ id: 59, breakpoint: "medium" }),
        width: MEDIUM_WIDTH,
        height: MEDIUM_HEIGHT,
      },
      large: {
        alt: "large",
        url: getImage({ id: 59, breakpoint: "large" }),
        width: LARGE_WIDTH,
        height: LARGE_HEIGHT,
      },
    },
  },
  {
    id: "efgh-5678",
    title: "Build amazing experiences",
    description:
      "Create stunning websites and applications with our powerful platform. Get started today and bring your ideas to life.",
    image: {
      fallback: {
        alt: "fallback",
        url: getImage({ id: 44, breakpoint: "fallback" }),
        width: FALLBACK_WIDTH,
        height: FALLBACK_HEIGHT,
      },
      medium: {
        alt: "medium",
        url: getImage({ id: 44, breakpoint: "medium" }),
        width: MEDIUM_WIDTH,
        height: MEDIUM_HEIGHT,
      },
      large: {
        alt: "large",
        url: getImage({ id: 44, breakpoint: "large" }),
        width: LARGE_WIDTH,
        height: LARGE_HEIGHT,
      },
    },
  },
  {
    id: "ijkl-91011",
    title: "Responsive images with preloading",
    description:
      "Easily create responsive images that improve your web core vitals.",
    image: {
      fallback: {
        alt: "fallback",
        url: getImage({ id: 12, breakpoint: "fallback" }),
        width: FALLBACK_WIDTH,
        height: FALLBACK_HEIGHT,
      },
      medium: {
        alt: "medium",
        url: getImage({ id: 12, breakpoint: "medium" }),
        width: MEDIUM_WIDTH,
        height: MEDIUM_HEIGHT,
      },
      large: {
        alt: "large",
        url: getImage({ id: 12, breakpoint: "large" }),
        width: LARGE_WIDTH,
        height: LARGE_HEIGHT,
      },
    },
  },
  {
    id: "mnop-1213",
    title: "The 4th Card",
    description:
      "Easily create responsive images that improve your web core vitals.",
    image: {
      fallback: {
        alt: "fallback",
        url: getImage({ id: 32, breakpoint: "fallback" }),
        width: FALLBACK_WIDTH,
        height: FALLBACK_HEIGHT,
      },
      medium: {
        alt: "medium",
        url: getImage({ id: 32, breakpoint: "medium" }),
        width: MEDIUM_WIDTH,
        height: MEDIUM_HEIGHT,
      },
      large: {
        alt: "large",
        url: getImage({ id: 32, breakpoint: "large" }),
        width: LARGE_WIDTH,
        height: LARGE_HEIGHT,
      },
    },
  },
];
