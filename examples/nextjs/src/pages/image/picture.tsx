import * as React from "react";

import { Picture, Source, Image } from "next-image-extras";

export default function ImagePagesPicture() {
  const alt = "mountains and trees";

  const fallbackDimensions = {
    width: 273,
    height: 273,
  };

  const fallback = {
    uri: `https://picsum.photos/id/263/${fallbackDimensions.width}/${fallbackDimensions.height}`,
    width: fallbackDimensions.width,
    height: fallbackDimensions.height,
  };

  const mediumDimensions = {
    width: 474,
    height: 391,
  };

  const medium = {
    uri: `https://picsum.photos/id/263/${mediumDimensions.width}/${mediumDimensions.height}`,
    width: mediumDimensions.width,
    height: mediumDimensions.height,
  };

  // 534 x 637
  const largeDimensions = {
    width: 200,
    height: 200,
  };

  const large = {
    uri: `https://picsum.photos/id/263/${largeDimensions.width}/${largeDimensions.height}`,
    width: largeDimensions.width,
    height: largeDimensions.height,
  };

  return (
    <>
      <div>
        <div
          id="main-content"
          className="container mx-auto pt-10 pb-10 max-w-5xl"
        >
          <h1>Next Image Extras: Picture Example</h1>
          <div className="hero grid grid-gap-2 lg:grid-cols-2 items-center">
            <div className="hero-text">
              <h2 className="text-xxl mb-5">
                The picture element is really awesome
              </h2>
              <p>
                It let’s us serve up completely different images depending on
                the situation at hand.
              </p>
            </div>
          </div>
          <br />
          <div className="relative flex flex-col md:flex-row w-full my-6 bg-white shadow-sm border border-slate-200 rounded-lg">
            <div className="relative p-2.5 md:w-1/5 shrink-0 overflow-hidden">
              <Picture preload={true} fallbackMedia="(max-width: 599px)">
                <Source
                  media="(min-width: 600px) and (max-width:959px)"
                  src={medium.uri}
                  width={medium.width}
                  height={medium.height}
                />
                <Source
                  media="(min-width: 960px)"
                  src={large.uri}
                  sizes="50vw"
                  width={large.width}
                  height={large.height}
                />
                <Image
                  src={fallback.uri}
                  width={fallback.width}
                  height={fallback.height}
                  alt={alt}
                  className="h-full w-full rounded-md md:rounded-lg object-cover"
                />
              </Picture>
            </div>
            <div className="p-6">
              <div className="mb-4 rounded-full bg-teal-600 py-0.5 px-2.5 border border-transparent text-xs text-white transition-all shadow-sm w-20 text-center">
                Picture
              </div>
              <h4 className="mb-2 text-slate-800 text-xl font-semibold">
                Lyft launching cross-platform service this week
              </h4>
              <p className="mb-8 text-slate-600 leading-normal font-light">
                Like so many organizations these days, Autodesk is a company in
                transition. It was until recently a traditional boxed software
                company selling licenses. Yet its own business model disruption
                is only part of the story
              </p>
              <div>
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
        </div>
      </div>
    </>
  );
}
