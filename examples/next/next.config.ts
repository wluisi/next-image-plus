module.exports = {
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
  // transpilePackages: ["next-image-plus"],
};
