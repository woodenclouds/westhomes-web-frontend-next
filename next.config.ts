import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.29.52", "localhost:3000"],
  // Local photography is under /public/images; remotePatterns cover WoQuick media hosts.
  images: {
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
    ],
  },
};

export default nextConfig;
