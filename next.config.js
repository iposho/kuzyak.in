/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: {
    buildActivityPosition: 'bottom-right',
  },
  env: {
    YANDEX_METRIKA_ID: process.env.YANDEX_METRIKA_ID,
  },
}

module.exports = nextConfig
