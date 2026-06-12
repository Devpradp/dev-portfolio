import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Order matters — AVIF preferred when the browser supports it
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
