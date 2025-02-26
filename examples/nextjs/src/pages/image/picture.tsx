import * as React from "react";
import Card from "./../../components/Card";
import { Picture, Source, Image } from "next-image-extras";

export default function ImagePagesPicture() {
  const alt = "mountains and trees";

  const fallbackDimensions = {
    width: 430,
    height: 215,
  };

  const fallback = {
    uri: `https://picsum.photos/id/59/${fallbackDimensions.width}/${fallbackDimensions.height}`,
    width: fallbackDimensions.width,
    height: fallbackDimensions.height,
  };

  const mediumDimensions = {
    width: 860,
    height: 430,
  };

  const medium = {
    uri: `https://picsum.photos/id/59/${mediumDimensions.width}/${mediumDimensions.height}`,
    width: mediumDimensions.width,
    height: mediumDimensions.height,
  };

  // 534 x 637
  const largeDimensions = {
    width: 220,
    height: 220,
  };

  const large = {
    uri: `https://picsum.photos/id/59/${largeDimensions.width}/${largeDimensions.height}`,
    width: largeDimensions.width,
    height: largeDimensions.height,
  };

  return (
    <>
      <div>
        <div
          id="main-content"
          className="container mx-auto pt-10 pb-10 max-w-4xl"
        >
          <h1>Next Image Extras: Picture Example</h1>

          <br />
          <Card
            title="Deploy your site with confidence"
            description="Get blazing fast performance with automatic CI/CD pipelines,
                  built-in CDN, and serverless functions. Scale globally with
                  zero configuration and enjoy 99.99% uptime for all your
                  projects. Experience the future of web deployment today."
            image={
              <Picture preload={true} fallbackMedia="(max-width: 430px)">
                <Source
                  media="(min-width: 431px) and (max-width: 1023px)"
                  src={medium.uri}
                  sizes="100vw"
                  width={medium.width}
                  height={medium.height}
                />
                <Source
                  media="(min-width: 1024px)"
                  src={large.uri}
                  // sizes="100vw"
                  width={large.width}
                  height={large.height}
                />
                <Image
                  src={fallback.uri}
                  width={fallback.width}
                  height={fallback.height}
                  alt={alt}
                  className="object-cover"
                />
              </Picture>
            }
          />
          <Card
            title="Build amazing experiences"
            description="Create stunning websites and applications with our powerful platform. Get started today and bring your ideas to life."
            image={
              <Picture preload={true} fallbackMedia="(max-width: 430px)">
                <Source
                  media="(min-width: 431px) and (max-width: 1023px)"
                  src={medium.uri}
                  sizes="100vw"
                  width={medium.width}
                  height={medium.height}
                />
                <Source
                  media="(min-width: 1024px)"
                  src={large.uri}
                  // sizes="100vw"
                  width={large.width}
                  height={large.height}
                />
                <Image
                  src={fallback.uri}
                  width={fallback.width}
                  height={fallback.height}
                  alt={alt}
                  className="object-cover"
                />
              </Picture>
            }
          />
          <br />
        </div>
      </div>
    </>
  );
}
