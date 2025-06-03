import { Picture, Source, Img } from "next-image-plus";

export default function Home() {
  return (
    <div className="grid p-10">
      <h1>Home</h1>
      <Picture preload={true} fallbackMedia="(max-width: 430px)">
        <Source
          media="(min-width: 431px) and (max-width: 1023px)"
          src="https://picsum.photos/id/59/860/430"
          width={860}
          height={430}
        />
        <Source
          media="(min-width: 1024px)"
          src="https://picsum.photos/id/59/220/220"
          width={220}
          height={220}
        />
        <Img
          src="https://picsum.photos/id/59/430/215"
          width={430}
          height={215}
          alt="Mountains and a river"
        />
      </Picture>
    </div>
  );
}
