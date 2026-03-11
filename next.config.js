const { version } = require('./package.json')

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // Apply CORS headers to all API routes
        source: "/checkout",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "localhost, mcbios", // Allow all origins (or specify specific domains)
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization, session_id",
          }
        ],
      },
    ];
  },
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
