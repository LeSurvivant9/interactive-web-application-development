import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [new URL("https://artworks.thetvdb.com/**")],
  },
};

export default nextConfig;
