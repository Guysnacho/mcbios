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
  async redirects() {
    // Late registration is now just the registration window set in the suite
    return [{ source: "/late", destination: "/events", permanent: true }];
  },
};

module.exports = nextConfig;
