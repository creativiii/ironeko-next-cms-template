const rewrites = async () => [
  { source: "/sitemap.xml", destination: "/api/sitemap" },
  { source: "/robots.txt", destination: "/api/robots" },
  { source: "/feed", destination: "/api/feed" },
];

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  rewrites,
  images: {
    domains: ["pbs.twimg.com"],
  },
  experimental: { esmExternals: true },
  /**
   * @type {import('next').NextConfig.webpack}
   */
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }

    return config;
  },
};

module.exports = nextConfig;
