/** @type {import('next').NextConfig} */
const nextConfig = {
  // API Rewrites
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:5000/api/v1/:path*",
      },
    ];
  },

  // Image Optimization
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.pixabay.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "media.istockphoto.com",
        port: "",
        pathname: "/**",
      },
    ],
  },

  // Core Settings (swcMinify removed in v15 as it's default)
  reactStrictMode: true,

  // Build Optimization
  eslint: {
    ignoreDuringBuilds: true,
  },

  // ✅ FIXED: Moved to top level in Next.js 15
  serverExternalPackages: ["mongoose", "prisma", "sharp", "@vercel/blob"],

  // Experimental flags that are still valid in v15
  experimental: {
    // Use workers for builds to save main thread memory
    webpackBuildWorker: true,
    // Reduce memory overhead in dev
    optimizePackageImports: ["@mui/material", "@mui/icons-material", "lodash"],
  },

  // Webpack Configuration: Optimized for Low Memory
  webpack: (config, { isServer, dev }) => {
    // 1. Disable source maps in dev (Saves ~30-50% RAM)
    if (dev) {
      config.devtool = false;
    }

    // 2. Reduce chunk splitting overhead
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          ...config.optimization?.splitChunks,
          maxAsyncRequests: 5,
          maxInitialRequests: 5,
        },
      };
    }

    // 3. Stop watching node_modules (Huge RAM saver)
    config.watchOptions = {
      ...config.watchOptions,
      ignored: /node_modules/,
    };

    // 4. Disable unused Webpack experiments
    if (config.experiments) {
      config.experiments.asyncWebAssembly = false;
      config.experiments.topLevelAwait = false;
    }

    return config;
  },
};

module.exports = nextConfig;
