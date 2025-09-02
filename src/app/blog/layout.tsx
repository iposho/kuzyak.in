import { Metadata } from 'next';
import { METADATA } from '@/constants/base';

export const metadata: Metadata = {
  title: `Блог | ${METADATA.TITLE}`,
  description: 'Мысли, заметки и размышления о разработке, технологиях и жизни.',
  keywords: 'блог, разработка, программирование, фронтенд, javascript, typescript, react',
  openGraph: {
    title: `Блог | ${METADATA.TITLE}`,
    description: 'Мысли, заметки и размышления о разработке, технологиях и жизни.',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: `Блог | ${METADATA.TITLE}`,
    description: 'Мысли, заметки и размышления о разработке, технологиях и жизни.',
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}