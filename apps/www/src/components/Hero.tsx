import Link from "next/link";

interface HeroProps {
  id: string;
  title: string;
  description: string;
  link: {
    url: string;
    text: string;
  };
}

export default function Hero({ id, title, description, link }: HeroProps) {
  return (
    <section
      id={id}
      className="relative w-full h-[50vh] lg:h-[400px] overflow-hidden"
    >
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0" />
        <div className="relative h-full w-full flex items-center justify-center">
          <div className="text-center max-w-3xl px-6 z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-black mb-6">
              {title}
            </h1>
            <p className="text-lg md:text-xl text-black/90 mb-8">
              {description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={link.url}
                className="inline-flex h-12 no-underline hover:underline items-center justify-center rounded-md bg-gray-800 px-6 py-3 font-medium text-white shadow transition-colors hover:bg-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                {link.text}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
