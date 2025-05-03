/** @type {import('next').NextConfig} */

// https://nextjs.org/docs/app/api-reference/next-config-js/

const buildDate = new Date().toISOString();

const nextConfig = {
  productionBrowserSourceMaps: false,
  compress: true,
  devIndicators: {
    buildActivityPosition: 'bottom-right',
  },
  env: {
    YANDEX_METRIKA_ID: process.env.YANDEX_METRIKA_ID,
    BUILD_DATE: process.env.BUILD_DATE || buildDate,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lastfm.freetls.fastly.net',
      },
    ],
  },
};

module.exports = nextConfig;
