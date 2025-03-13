import * as React from "react";
import { Picture, Source, Img } from "next-image-plus";
import "./../../global.css";

export default function PagesPicture() {
  return (
    <div>
      <h1>Picture Example (Pages Router)</h1>
      <Picture preload={true} fallbackMedia="(max-width: 430px)">
        <Source
          media="(min-width: 1024px)"
          src="https://picsum.photos/id/59/220/220"
          width={220}
          height={220}
        />
        <Source
          media="(min-width: 431px) and (max-width: 1023px)"
          src="https://picsum.photos/id/59/860/430"
          width={860}
          height={430}
        />
        <Img
          src="https://picsum.photos/id/59/430/215"
          width={430}
          height={215}
          alt="Fencing"
        />
      </Picture>
    </div>
  );
}
