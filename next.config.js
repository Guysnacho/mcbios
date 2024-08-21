/** @type {import('next').NextConfig} */
const nextConfig = {
  modularizeImports: {
    "@react-aria": {
      transform: "@react-aria/{{member}}",
      skipDefaultConversion: true,
      preventFullImport: true,
    },
  },
};

module.exports = nextConfig;
