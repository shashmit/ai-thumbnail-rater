import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [{
      hostname: "striped-aardvark-938.convex.cloud",
    }
    ]
  }
};

export default nextConfig;
