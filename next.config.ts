import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    urlApi: process.env.URL_API,
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/todo",
        permanent: true, // Set to false for temporary redirect
      },
    ];
  },
};

export default nextConfig;
