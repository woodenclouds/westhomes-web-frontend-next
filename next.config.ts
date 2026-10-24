import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.29.52", "localhost:3000"],
  // Local photography is under /public/images; remotePatterns cover WoQuick media hosts.
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
      // WoQuick media uploads (S3-compatible R2 signed URLs)
      {
        protocol: "https",
        hostname: "*.r2.cloudflarestorage.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
