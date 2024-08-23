/** @type {import('next').NextConfig} */
const nextConfig = {
  // modularizeImports: {
  //   "@nextui-org": {
  //     transform: "@nextui-org/{{member}}",
  //     skipDefaultConversion: true,
  //     preventFullImport: true,
  //   },
  // },
  images: {
    remotePatterns: [
      {
        hostname: "blush.design",
      },
    ],
  },
};

module.exports = nextConfig;
