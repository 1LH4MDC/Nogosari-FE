import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compress: true,
  // Optimize package imports to reduce bundle size via tree-shaking
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  // HTTP caching headers — static data pages get short cache; admin pages no-cache
  async headers() {
    return [
      {
        source: '/data',
        headers: [{ key: 'Cache-Control', value: 'public, s-maxage=60, stale-while-revalidate=120' }],
      },
      {
        source: '/admin/:path*',
        headers: [{ key: 'Cache-Control', value: 'no-store' }],
      },
    ];
  },
};

export default nextConfig;
