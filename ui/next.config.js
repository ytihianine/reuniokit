/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  // basePath: isProd ? "/app" : undefined,
  // assetPrefix: isProd ? "/app" : undefined,
  // cacheComponents: true,
};

module.exports = nextConfig;
