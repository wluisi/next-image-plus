import * as React from "react";
import { BackgroundImage } from "next-image-plus";
import "./../../global.css";

export default function PagesBackground() {
  return (
    <div>
      <h1>BackgroundImage Example (Pages Router)</h1>
      <BackgroundImage
        id="examples__background-image"
        preload={true}
        images={[
          {
            breakpoint: "fallback",
            media: "(max-width: 430px)",
            url: "https://picsum.photos/id/870/430/466",
            width: 430,
            height: 466,
          },
          {
            breakpoint: "md",
            media: "(min-width: 768px) and (max-width: 1023px)",
            url: "https://picsum.photos/id/870/768/512",
            width: 768,
            height: 512,
          },
          {
            breakpoint: "lg",
            media: "(min-width: 1024px)",
            url: "https://picsum.photos/id/870/2560/800",
            width: 2560,
            height: 800,
          },
        ]}
      />
    </div>
  );
}
