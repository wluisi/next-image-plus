// eslint-disable-next-line @typescript-eslint/no-require-imports
const { withGraphineryMdx } = require("@graphinery/mdx/next");
import { metaschema } from "./src/graphinery/metaschema";

/** @type {import('next').NextConfig} */
const nextConfig = {
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
};

// Apply your plugin
export default withGraphineryMdx({
  baseDirectory: "./src/__content",
  metaschema: metaschema,
  menu: true,
})(nextConfig);
