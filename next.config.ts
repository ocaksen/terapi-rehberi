import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "randomuser.me" },
    ],
  },
  experimental: {
    // Modern tarayıcılar için gereksiz polyfill'leri kaldır
    browsersListForSwc: true,
  },
};

export default nextConfig;
