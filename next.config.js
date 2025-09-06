/** @type {import('next').NextConfig} */

const nextConfig = {
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  env: {
    YANDEX_METRIKA_ID: process.env.YANDEX_METRIKA_ID,
    BUILD_DATE: process.env.BUILD_DATE || new Date().toISOString(),
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://kuzyak.in',
  },
  
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
