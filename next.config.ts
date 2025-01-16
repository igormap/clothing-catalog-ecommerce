import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["images.unsplash.com", "s3-sa-east-1.amazonaws.com"],
  },
};

export default nextConfig;
