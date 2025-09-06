import { ReactNode } from 'react';
import { Metadata } from 'next';

import { IBM_Plex_Sans } from 'next/font/google';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

// IMPORTANT: Do not change the import order! React may throw Error 425 if
// client components imports ('use client') appear after server component imports.
// See documentation: https://react.dev/errors/425
import { Scripts } from '@/scripts';

import {
  METADATA,
} from '@/constants/base';

import '@/styles/globals.scss';
import styles from './layout.module.scss';

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: {
    default: METADATA.TITLE,
    template: '%s | Павел Кузякин',
  },
  description: METADATA.DESCRIPTION,
  keywords: METADATA.KEYWORDS,
  authors: [{ name: 'Павел Кузякин', url: 'https://kuzyak.in' }],
  creator: 'Павел Кузякин',
  publisher: 'Павел Кузякин',
  metadataBase: METADATA.BASE,
  alternates: {
    canonical: '/',
    types: {
      'application/rss+xml': '/blog/rss.xml/',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: METADATA.BASE,
    siteName: METADATA.TITLE,
    title: METADATA.TITLE,
    description: METADATA.DESCRIPTION,
    images: [
      {
        url: '/images/face-with-correct-shadow.webp',
        width: 1200,
        height: 630,
        alt: 'Павел Кузякин - Фронтенд разработчик',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: METADATA.TITLE,
    description: METADATA.DESCRIPTION,
    images: ['/images/face-with-correct-shadow.webp'],
    creator: '@iposho',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
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
            <Scripts />
          )
        }
        <div className={styles.layout}>
          <Header />
          <main
            className="main"
            data-isproduction={isProduction}
          >
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
