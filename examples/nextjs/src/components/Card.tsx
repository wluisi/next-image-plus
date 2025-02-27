interface CardProps {
  title: string;
  description: string;
  image: React.ReactNode;
}

export default function Card({ title, description, image }: CardProps) {
  return (
    <div className="flex flex-col lg:flex-row overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm my-6 md:my-10">
      <div className="relative lg:flex-shrink-0">
        {/* <div className="relative aspect-square md:aspect-[2/1] lg:aspect-square lg:h-[220px] lg:w-[220px]"> */}
        <div className="relative aspect-[2/1] lg:aspect-square">{image}</div>
      </div>

      <div className="flex flex-1 flex-col p-4 lg:justify-between">
        <div>
          <h3 className="mb-2 text-slate-800 text-xl font-semibold">{title}</h3>
          <p className="mb-8 text-slate-600 leading-normal font-light">
            {description}
          </p>
        </div>

        <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-3 sm:space-y-0">
          <a
            href="/whatever"
            className="text-slate-800 font-semibold text-sm hover:underline flex items-center"
          >
            Learn More
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ml-2 h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
