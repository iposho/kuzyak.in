import { ReactNode } from 'react';
import type { Metadata } from 'next';

import { IBM_Plex_Sans } from 'next/font/google';

import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

import Scripts from '@/scripts';

import { METADATA_TITLE, METADATA_DESCRIPTION, METADATA_KEYWORDS } from '@/constants/base';

import '@/styles/globals.scss';

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: METADATA_TITLE,
  description: METADATA_DESCRIPTION,
  keywords: METADATA_KEYWORDS,
};

const ProductionScripts = () => {
  const isProduction = process.env.NODE_ENV === 'production';

  return isProduction ? <Scripts /> : null;
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={ibmPlexSans.className}>
        <ProductionScripts />
        <Header />
        <main className="main">
          {children}
        </main>
        <Footer />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
