import * as React from "react";
import Card from "./../../../components/Card";
import { Picture, Source, Image } from "next-image-extras";
import { cardsContent } from "./../../../__content/cards";

export default async function PicturePageApp() {
  return (
    <div id="main-content" className="container mx-auto pt-10 pb-10 max-w-4xl">
      <div className="mx-6">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6">
          next-image-extras: Picture Example
        </h1>

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
                  <Image
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
    </div>
  );
}
