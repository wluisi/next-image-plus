import { getImageProps } from "next/image";

export default function VanillaNextBackgroundImagePage() {
  const bgImage = getImageProps({
    alt: "",
    src: "https://picsum.photos/id/502/2560/800",
    width: 2560,
    height: 800,
    // Has no effect.
    priority: true,
  });

  return (
    <div className="grid p-10 m-auto max-w-3xl">
      <h1 className="mb-10">Vanilla Next.js: Background Image</h1>
      <div className="relative w-full h-[50vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${bgImage.props.src})`,
          }}
        />
      </div>
    </div>
  );
}
