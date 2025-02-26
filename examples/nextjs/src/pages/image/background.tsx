import * as React from "react";
import Hero from "./../../components/Hero";

export default function BackgroundImagePage() {
  return (
    <>
      <Hero
        title="Build amazing experiences"
        description="Create stunning websites and applications with our powerful platform. Get started today and bring your ideas to life."
      />
      <div>
        <div
          id="main-content"
          className="container mx-auto pt-10 pb-10 max-w-5xl"
        >
          main content
        </div>
      </div>
    </>
  );
}
