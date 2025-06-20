import { BackgroundImage } from "next-image-plus";

interface HeroProps {
  title: string;
  description: string;
}

export default function Hero({ title, description }: HeroProps) {
  return (
    <section className="relative w-full h-[60vh] lg:h-[800px] overflow-hidden rounded-xl not-prose">
      <BackgroundImage
        id="examples__background-image"
        preload={true}
        className="next-image-plus__bg-img absolute inset-0 bg-cover bg-center bg-no-repeat"
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
            // @todo shouldnt this be (min-width: 430px) and (max-width: 768px) ?
            media: "(min-width: 430px) and (max-width: 1024px)",
            url: "https://picsum.photos/id/870/768/512",
            width: 768,
            height: 512,
          },
          {
            breakpoint: "lg",
            // @todo and then this should be (min-width: 768px) ?
            media: "(min-width: 1024px)",
            url: "https://picsum.photos/id/870/2560/800",
            width: 2560,
            height: 800,
          },
        ]}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative h-full w-full flex items-center justify-center">
          <div className="text-center max-w-3xl px-6 z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {title}
            </h1>
            <p className="text-lg md:text-xl !text-white/90 mb-8">
              {description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a className="inline-flex h-12 items-center no-underline hover:underline justify-center rounded-md bg-white px-6 py-3 text-base font-medium text-gray-900 shadow transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                Primary button text
              </a>
              <a className="inline-flex h-12 items-center no-underline hover:underline justify-center rounded-md border border-white bg-transparent px-6 py-3 text-base font-medium text-white shadow-sm transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                Secondary button text
              </a>
            </div>
          </div>
        </div>
      </BackgroundImage>
    </section>
  );
}
