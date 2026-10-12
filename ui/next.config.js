/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  assetPrefix: isProd ? "/app" : undefined,
  cacheComponents: true,
};

module.exports = nextConfig;
