import createMDX from '@next/mdx';

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
    NEXT_PUBLIC_ENABLE_BLOG: process.env.NEXT_PUBLIC_ENABLE_BLOG || 'true',
  },
  
  images: {
    unoptimized: true,
  },
  
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  
  // Настройки для правильной работы с Vercel
  experimental: {
    mdxRs: false,
  },
  
  // Стандартный режим Next.js
};

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: [(await import('remark-gfm')).default],
  },
});

export default withMDX(nextConfig);
