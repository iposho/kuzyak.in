import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { Noto_Sans } from 'next/font/google';

import './styles/globals.scss';

const notoSans = Noto_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://kuzyak.in'),
  title: 'Павел Кузякин',
  description: 'Фронтенд-разработчик c опытом руководства командами и направлением',
  openGraph: {
    title: 'Павел Кузякин',
    description: 'Фронтенд-разработчик c опытом руководства командами и направлением',
    url: 'https://kuzyak.in',
    siteName: 'kuzyak.in',
    locale: 'ru_RU',
    images: './opengraph-image.png',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="ru">
      <body className={notoSans.className}>
        {children}
      </body>
    </html>
  );
}
