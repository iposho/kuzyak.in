import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { Noto_Sans } from 'next/font/google';

import './styles/globals.scss';

const notoSans = Noto_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Павел Кузякин',
  description: 'Ведущий фронтенд-разработчик',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="ru">
      <body className={notoSans.className}>{children}</body>
    </html>
  );
}
