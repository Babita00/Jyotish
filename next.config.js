/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  images: { unoptimized: true },
  webpack: (config) => {
    // Ignore optional native dependencies from ws
    config.resolve.fallback = {
      ...config.resolve.fallback,
      bufferutil: false,
      "utf-8-validate": false,
    };

    // Suppress dynamic require warnings for supabase realtime
    config.module.exprContextCritical = false;

    return config;
  },
};

module.exports = nextConfig;
