import type { NextConfig } from "next";

import { withContentCollections } from "@content-collections/next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // 430 and 860 are custom sizes, for mobile.
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 430, 860],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fastly.picsum.photos",
        port: "",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
      },
    ],
  },
  transpilePackages: ["@graphinery/ui", "next-mdx-remote"],
};

export default withContentCollections(nextConfig as any);
