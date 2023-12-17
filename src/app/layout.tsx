import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { Noto_Sans } from 'next/font/google';
import {
  METADATA_BASE, METADATA_DESCRIPTION, METADATA_SITE_NAME, METADATA_TITLE,
} from '@/app/constants/metadata';

import ThemeProvider from './theme-provider';
import ThemeSwitcher from './components/ui/themeSwitcher';

import './styles/globals.scss';

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

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={notoSans.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ThemeSwitcher />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
