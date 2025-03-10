import * as React from "react";
import { Picture, Source, Img } from "next-image-plus";

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

  console.log(url);

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

interface CardProps {
  id: string;
  title: string;
  description: string;
  image: React.ReactNode;
}

export function Card({ id, title, description, image }: CardProps) {
  return (
    <div
      id={`card-item__${id}`}
      className="flex flex-col lg:flex-row overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm my-6 md:my-10"
    >
      <div className="card-image relative lg:flex-shrink-0">
        {/* <div className="relative aspect-square md:aspect-[2/1] lg:aspect-square lg:h-[220px] lg:w-[220px]"> */}
        <div className="relative aspect-[2/1] lg:aspect-square">{image}</div>
      </div>

      <div className="flex flex-1 flex-col p-4 lg:justify-between">
        <div>
          <h3 className="mb-2 text-slate-800 text-xl font-semibold">{title}</h3>
          <p className="mb-8 text-slate-600 leading-normal font-light">
            {description}
          </p>
        </div>

        <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-3 sm:space-y-0">
          <a
            href="/whatever"
            className="text-slate-800 font-semibold text-sm hover:underline flex items-center"
          >
            Learn More
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ml-2 h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function CardGrid() {
  return (
    <div className="card-grid">
      {cardsContent.map((item, index) => {
        const image = item.image;
        // Only preload the first card.
        const preload = index === 0 ? true : false;

        return (
          <Card
            id={item.id}
            key={item.id}
            title={item.title}
            description={item.description}
            image={
              <Picture preload={preload} fallbackMedia="(max-width: 430px)">
                <Source
                  media="(min-width: 431px) and (max-width: 1023px)"
                  src={image.medium.url}
                  sizes="100vw"
                  width={image.medium.width}
                  height={image.medium.height}
                />
                <Source
                  media="(min-width: 1024px)"
                  src={image.large.url}
                  width={image.large.width}
                  height={image.large.height}
                />
                <Img
                  src={image.fallback.url}
                  width={image.fallback.width}
                  height={image.fallback.height}
                  alt={image.fallback.alt}
                  className="object-cover"
                />
              </Picture>
            }
          />
        );
      })}
    </div>
  );
}
