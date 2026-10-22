import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.29.52", "localhost:3000"],
  // Local photography is under /public/images. Remote patterns cover WoQuick and public Cloudflare R2 hosts.
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "west-homes.api.woquick.in",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api.woquick.in",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.woquick.in",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.r2.dev",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
