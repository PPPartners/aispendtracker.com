import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Rewrites removed as we are connecting directly to PostHog host
  async rewrites() {
    return [];
  },
  // This is required to support PostHog trailing slash API requests
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
