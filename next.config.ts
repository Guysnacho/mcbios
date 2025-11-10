import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL("https://images.unsplash.com/**")], // Add domains for external images
  },
};

export default nextConfig;
