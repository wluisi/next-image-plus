import * as React from "react";
import Card from "./Card";
import { Picture, Source, Img } from "next-image-extras";
import { cardsContent } from "./../__content/cards";

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
