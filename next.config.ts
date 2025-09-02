import type { NextConfig } from "next";

const nextConfig = {
  images: {
    domains: [
      'viamarket.vtexassets.com',
      'http2.mlstatic.com',
      'images.unsplash.com',
      'images.fravega.com'
    ],
  },
  typescript: {
    ignoreBuildErrors: true, // ❌ NO recomendado para producción
  },
};

export default nextConfig;
