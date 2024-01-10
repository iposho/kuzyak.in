import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { Noto_Sans } from 'next/font/google';

import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';

import {
  METADATA_BASE, METADATA_DESCRIPTION, METADATA_SITE_NAME, METADATA_TITLE,
} from '@/constants/metadata';

import Scripts from '@/scripts';

import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

import '@/styles/globals.scss';

const notoSans = Noto_Sans({ subsets: ['latin', 'cyrillic'], display: 'swap' });

export const metadata: Metadata = {
  metadataBase: METADATA_BASE,
  title: METADATA_TITLE,
  description: METADATA_DESCRIPTION,
  openGraph: {
    url: METADATA_BASE,
    siteName: METADATA_SITE_NAME,
    locale: 'ru_RU',
    images: './opengraph-image.tsx',
    type: 'website',
  },
};

const ProductionScripts = () => {
  const isProduction = process.env.NODE_ENV === 'production';

  return isProduction ? <Scripts /> : null;
};

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html
      lang="ru"
      suppressHydrationWarning
    >
      <body className={notoSans.className}>
        <ProductionScripts />
        <Header />
        {children}
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
