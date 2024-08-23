/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "blush.design",
      },
    ],
  },
};

module.exports = nextConfig;
