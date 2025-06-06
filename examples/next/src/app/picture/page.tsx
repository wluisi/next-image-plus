import { Picture, Source, Img } from "next-image-plus";

export default function PicturePage() {
  return (
    <div className="grid p-10 m-auto max-w-3xl">
      <h1 className="mb-10">Picture Component</h1>

      <div className="mb-10">
        <h2>Picture Component default</h2>
        <Picture preload={true}>
          <Source
            media="(min-width: 430px) and (max-width: 1024px)"
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
            alt="Fencing"
          />
        </Picture>
      </div>

      <div className="mb-10">
        <h2>
          Picture Component with fallbackMedia and normalizeMediaQueries
          disabled.
        </h2>
        <Picture
          preload={true}
          fallbackMedia="(max-width: 430px)"
          normalizeMediaQueries={false}
        >
          <Source
            media="(min-width: 431px) and (max-width: 1023px)"
            src="https://picsum.photos/id/104/860/430"
            width={860}
            height={430}
          />
          <Source
            media="(min-width: 1024px)"
            src="https://picsum.photos/id/104/220/220"
            width={220}
            height={220}
          />
          <Img
            src="https://picsum.photos/id/104/430/215"
            width={430}
            height={215}
            alt="Mountains and a river"
          />
        </Picture>
      </div>
    </div>
  );
}
