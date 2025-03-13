import * as React from "react";
import { Picture, Source, Img } from "next-image-plus";
import "./../../global.css";

export default async function PictureApp() {
  return (
    <div>
      <h1>Picture Example (App Router)</h1>
      <Picture preload={true} fallbackMedia="(max-width: 430px)">
        <Source
          src="https://picsum.photos/id/59/430/215"
          width={600}
          height={600}
          media="(min-width: 960px)"
        />
        {/* <Source
          src="/images/medium.jpg"
          width={400}
          height={200}
          media="(min-width: 600px) and (max-width:959px)"
        /> */}
        <Img
          src="https://picsum.photos/id/59/430/215"
          width={600}
          height={600}
          alt="Mountains and a river"
        />
      </Picture>
    </div>
  );
}
