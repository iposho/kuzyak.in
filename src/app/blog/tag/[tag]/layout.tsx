import { Metadata } from 'next';
import { getPostsByTag } from '@/lib/blog';
import { METADATA } from '@/constants/base';

interface Props {
  params: { tag: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const tag = decodeURIComponent(params.tag);
    const posts = getPostsByTag(tag);
    
    const title = `Посты с тегом #${tag} | ${METADATA.TITLE}`;
    const description = `Все посты с тегом #${tag}. Найдено: ${posts.length} ${posts.length === 1 ? 'пост' : 'постов'}.`;

    return {
      title,
      description,
      keywords: [tag, 'блог', 'посты', 'разработка'].join(', '),
      openGraph: {
        title,
        description,
        type: 'website',
      },
      twitter: {
        card: 'summary',
        title,
        description,
      },
    };
  } catch (error) {
    console.error('Error generating tag metadata:', error);
    return {
      title: `Тег | ${METADATA.TITLE}`,
      description: 'Посты по тегу',
    };
  }
}

export default function TagLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}