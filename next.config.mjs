import withPWA from "@ducanh2912/next-pwa";

const pwaConfig = {
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  dest: "public",
  fallbacks: {
    document: "/offline",
  },
  workboxOptions: {
    disableDevLogs: true,
  },
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

const withPWAConfig = withPWA(pwaConfig)(nextConfig);

export default withPWAConfig;