/** @type {import('next').NextConfig} */

// https://nextjs.org/docs/app/api-reference/next-config-js/

const buildDate = new Date().toISOString();

const nextConfig = {
  // Оптимизация для Vercel
  output: process.env.NODE_ENV === 'production' ? 'export' : undefined,
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  
  // Оптимизация производительности
  productionBrowserSourceMaps: false, // Отключаем в продакшене для лучшей производительности
  compress: true,
  poweredByHeader: false,
  
  // Настройки для разработки
  devIndicators: {
    buildActivityPosition: 'bottom-right',
  },
  
  // Переменные окружения
  env: {
    YANDEX_METRIKA_ID: process.env.YANDEX_METRIKA_ID,
    BUILD_DATE: process.env.BUILD_DATE || buildDate,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://kuzyak.in',
  },
  
  // Оптимизация изображений
  images: {
    unoptimized: true, // Для статического экспорта
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lastfm.freetls.fastly.net',
      },
    ],
  },
  
  // Настройки кэширования
  async headers() {
    return [
      {
        source: '/blog/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/api/blog/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=86400',
          },
        ],
      },
    ];
  },
  
  // Webpack конфигурация
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      type: 'asset/source',
    });
    
    // Оптимизация для статической генерации
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          // Группируем vendor библиотеки
          vendor: {
            name: 'vendor',
            chunks: 'all',
            test: /node_modules/,
          },
        },
      },
    };
    
    return config;
  },
  
  // Экспериментальные функции
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['react-icons'],
  },
};

module.exports = nextConfig;
