import { getImageProps } from "next/image";

export default function VanillaNextPicturePage() {
  const common = {
    alt: "Art Direction Example",
    sizes: "100vw",
  };

  const { props: desktopProps, ...desktopRest } = getImageProps({
    ...common,
    width: 1440,
    height: 875,
    quality: 80,
    src: "https://picsum.photos/id/502/1440/875",
    // Has no effect, and does not add preload links to `<head>`.
    priority: true,
  });

  const { props: mobileProps, ...mobileRest } = getImageProps({
    ...common,
    width: 750,
    height: 1334,
    quality: 70,
    src: "https://picsum.photos/id/502/750/1334",
    // Has no effect, and does not add preload links to `<head>`.
    priority: true,
  });

  return (
    <div className="grid p-10 m-auto max-w-3xl">
      <h1 className="mb-10">Vanilla Next.js: Picture</h1>
      <picture>
        <source
          media="(min-width: 1000px)"
          {...desktopRest}
          srcSet={desktopProps.srcSet}
        />
        <source
          media="(min-width: 500px)"
          {...mobileRest}
          srcSet={mobileProps.srcSet}
        />
        <img {...mobileRest} style={{ width: "100%", height: "auto" }} />
      </picture>
    </div>
  );
}
