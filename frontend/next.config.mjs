/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Static export ships images as-is; no remote optimisation needed.
    // All product imagery now lives under `/public/brand` so we no longer
    // need to allow-list any third-party hosts.
    unoptimized: true,
  },
};

export default nextConfig;