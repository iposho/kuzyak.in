import { Metadata } from 'next';
import { METADATA } from '@/constants/base';
import css from './layout.module.scss';

export const metadata: Metadata = {
  title: `${METADATA.TITLE}. Блог`,
  description: 'Мысли, заметки и размышления о разработке, технологиях и жизни.',
  keywords: 'блог, разработка, программирование, фронтенд, javascript, typescript, react',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  openGraph: {
    title: `${METADATA.TITLE}. Блог`,
    description: 'Мысли, заметки и размышления о разработке, технологиях и жизни.',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: `${METADATA.TITLE}. Блог`,
    description: 'Мысли, заметки и размышления о разработке, технологиях и жизни.',
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={css.blogLayout}>
      {children}
    </div>
  );
}
