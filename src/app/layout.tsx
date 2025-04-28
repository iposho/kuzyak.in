import { ReactNode } from 'react';
import { Metadata } from 'next';

import { IBM_Plex_Sans } from 'next/font/google';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { EasterEgg } from '@/components/layout/EasterEgg';
import { CookieConsent } from '@/components/layout/CookieConsent';

import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';

// IMPORTANT: Do not change the import order! React may throw Error 425 if
// client components imports ('use client') appear after server component imports.
// See documentation: https://react.dev/errors/425
import { Scripts } from '@/scripts';

import {
  METADATA,
} from '@/constants/base';

import '@/styles/globals.scss';

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: METADATA.TITLE,
  description: METADATA.DESCRIPTION,
  keywords: METADATA.KEYWORDS,
  metadataBase: METADATA.BASE,
  openGraph: {
    url: METADATA.BASE,
    siteName: METADATA.TITLE,
    type: 'website',
  },
};

const isProduction = process.env.NODE_ENV === 'production';

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={ibmPlexSans.className}>
        {
          isProduction && (
            <>
              <Scripts />
              <SpeedInsights />
              <Analytics />
            </>
          )
        }
        <Header />
        {/* <CurrentTrack /> */}
        <main
          className="main"
          data-isproduction={isProduction}
        >
          {children}
        </main>
        <Footer />
        <EasterEgg />
        <CookieConsent />
      </body>
    </html>
  );
}
