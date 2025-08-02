import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'cdn.dummyjson.com',
      'fakestoreapi.com', // ← add this line
    ],
  },
};

export default nextConfig;
