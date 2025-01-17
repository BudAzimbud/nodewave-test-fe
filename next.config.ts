import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  env: {
    urlApi: process.env.URL_API,
  },
};

export default nextConfig;
