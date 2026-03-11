const { version } = require('./package.json')

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
  images: {
    remotePatterns: [
      {
        hostname: "blush.design",
      },
    ],
  },
  env: {
    version,
  },
};

module.exports = nextConfig;
