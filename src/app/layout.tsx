import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { Noto_Sans } from 'next/font/google';
import {
  METADATA_BASE, METADATA_DESCRIPTION, METADATA_SITE_NAME, METADATA_TITLE,
} from '@/app/constants/metadata';

import Script from 'next/script';

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
  const isProduction = process.env.NODE_ENV === 'production';
  const ymId = process.env.YANDEX_METRIKA_ID;

  return (
    <html
      lang="ru"
      suppressHydrationWarning
    >
      <body className={notoSans.className}>
        {
          (isProduction && !!ymId)
          && (
            <Script id="metrika-counter" strategy="afterInteractive">
              {`
                (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                  m[i].l=1*new Date();
                  for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                  k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
                  (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

                  ym(${process.env.YANDEX_METRIKA_ID}, "init", {
                    defer: true,
                    clickmap:true,
                    trackLinks:true,
                    accurateTrackBounce:true,
                    webvisor:true
                  });
                  console.log('YMetrika init');
              `}
            </Script>
          )
        }
        <ThemeProvider
          attribute="data-theme"
          enableSystem
        >
          <ThemeSwitcher />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
