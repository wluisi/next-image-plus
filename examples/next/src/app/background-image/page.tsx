import { BackgroundImage } from "next-image-plus";

export default function BackgroundImagePage() {
  return (
    <div className="grid p-10 m-auto max-w-3xl">
      <h1 className="mb-10">BackgroundImage Component</h1>

      <div className="mb-10">
        <h2>BackgroundImage Component</h2>
        <p>Single background image with no media and no breakpoint.</p>
        <div className="relative w-full h-[30vh] overflow-hidden">
          <BackgroundImage
            id="examples__background-image"
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            images={[
              {
                url: "https://picsum.photos/id/502/2560/800",
                width: 2560,
                height: 800,
              },
            ]}
          />
        </div>
      </div>

      <div className="mb-10">
        <h2>BackgroundImage Component With Preload</h2>
        <p>Single background image with no media and no breakpoint.</p>
        <div className="relative w-full h-[30vh] overflow-hidden">
          <BackgroundImage
            id="examples__background-image-preload"
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            images={[
              {
                url: "https://picsum.photos/id/502/2560/800",
                width: 2560,
                height: 800,
              },
            ]}
            preload={true}
          />
        </div>
      </div>

      <div className="mb-10">
        <h2>BackgroundImage Component (Responsive)</h2>
        <div className="relative w-full h-[60vh] lg:h-[800px] overflow-hidden">
          <BackgroundImage
            id="examples__background-image-responsive"
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            preload={true}
            images={[
              {
                url: "https://picsum.photos/id/870/430/466",
                media: "(max-width: 430px)",
                width: 430,
                height: 466,
              },
              {
                url: "https://picsum.photos/id/870/768/512",
                media: "(min-width: 430px) and (max-width: 768px)",
                width: 768,
                height: 512,
              },
              {
                // breakpoint: "lg",
                url: "https://picsum.photos/id/870/2560/800",
                media: "(min-width: 768px)",
                width: 2560,
                height: 800,
              },
            ]}
          />
        </div>
      </div>

      <div className="mb-10">
        <h2>
          BackgroundImage Component (Responsive) with normalizeMediaQueries
          disabled.
        </h2>
        <div className="relative w-full h-[60vh] lg:h-[800px] overflow-hidden">
          <BackgroundImage
            id="examples__background-image-responsive-two"
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            preload={true}
            normalizeMediaQueries={false}
            images={[
              {
                media: "(max-width: 430px)",
                url: "https://picsum.photos/id/700/430/466",
                width: 430,
                height: 466,
              },
              {
                media: "(min-width: 430px) and (max-width: 768px)",
                url: "https://picsum.photos/id/700/768/512",
                width: 768,
                height: 512,
              },
              {
                media: "(min-width: 768px)",
                url: "https://picsum.photos/id/700/2560/800",
                width: 2560,
                height: 800,
              },
            ]}
          />
        </div>
      </div>

      <div className="mb-10">
        <h2>BackgroundImage Component Responsive</h2>
        <p></p>
        <div className="relative w-full h-[30vh] overflow-hidden">
          <BackgroundImage
            id="examples__responsive-background-image"
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            images={[
              {
                url: "https://picsum.photos/id/502/430/430",
                media: "(max-width: 430px)",
                width: 430,
                height: 430,
              },
              {
                url: "https://picsum.photos/id/502/768/768",
                media: "(min-width: 430px) and (max-width: 768px)",
                width: 768,
                height: 768,
              },
              {
                url: "https://picsum.photos/id/502/1024/1024",
                media: "(min-width: 768px)",
                width: 1024,
                height: 1024,
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
