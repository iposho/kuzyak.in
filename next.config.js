/** @type {import('next').NextConfig} */

// https://nextjs.org/docs/app/api-reference/next-config-js/

const buildDate = new Date().toISOString();

const nextConfig = {
  productionBrowserSourceMaps: true,
  compress: true,
  devIndicators: {
    buildActivityPosition: 'bottom-right',
  },
  env: {
    YANDEX_METRIKA_ID: process.env.YANDEX_METRIKA_ID,
    BUILD_DATE: buildDate,
    IS_OPEN_TO_WORK: process.env.IS_OPEN_TO_WORK,
  },
};

module.exports = nextConfig;
