/** @type {import('next').NextConfig} */
const nextConfig = {
  modularizeImports: {
    "@chakra-ui": {
      transform: "@chakra-ui/{{member}}",
      skipDefaultConversion: true,
      preventFullImport: true,
    },
  },
};

module.exports = nextConfig;
