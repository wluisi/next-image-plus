import * as React from "react";
import CardGrid from "./../../../components/CardGrid";

export default async function PicturePageApp() {
  return (
    <div id="main-content" className="container mx-auto pt-10 pb-10 max-w-4xl">
      <div className="mx-6">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6">
          Picture Example (App Router)
        </h1>
        <CardGrid />
      </div>
    </div>
  );
}
