import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { IBM_Plex_Sans } from 'next/font/google';

import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';

import { METADATA_TITLE, METADATA_DESCRIPTION } from '@/constants/base';

import '@/styles/globals.scss';

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: METADATA_TITLE,
  description: METADATA_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={ibmPlexSans.className}>
        <Header />
        <main className="main">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
