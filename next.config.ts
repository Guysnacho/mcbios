import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // Dev only: lets the e2e shared-cookie test reach the dev server as a.mcbios.test and b.mcbios.test
  allowedDevOrigins: ["*.mcbios.test"],
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
