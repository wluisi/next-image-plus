import { getImageProps } from "next/image";

export default function VanillaNextImgPage() {
  const imageProps = getImageProps({
    alt: "Img Example",
    sizes: "100vw",
    width: 1440,
    height: 875,
    quality: 80,
    src: "https://picsum.photos/id/403/1440/875",
    priority: true,
    fetchPriority: "high",
  });

  return (
    <div className="grid p-10 m-auto max-w-3xl">
      <h1 className="mb-10">Vanilla Next.js: Img</h1>
      <img {...imageProps.props} style={{ width: "100%", height: "auto" }} />
    </div>
  );
}
