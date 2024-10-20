/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "mcbios.com",
      },
    ],
  },
};

export default nextConfig;
