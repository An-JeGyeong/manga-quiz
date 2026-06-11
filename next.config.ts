import type { NextConfig } from "next";

const isTossBuild = process.env.BUILD_TARGET === 'toss';

const nextConfig: NextConfig = {
  ...(isTossBuild ? { output: 'export' as const, distDir: 'dist/web' } : {}),
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.myanimelist.net",
        pathname: "/images/manga/**",
      },
    ],
  },
};

export default nextConfig;
