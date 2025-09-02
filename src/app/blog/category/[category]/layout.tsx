import { Metadata } from 'next';
import { getPostsByCategory } from '@/lib/blog';
import { METADATA } from '@/constants/base';

interface Props {
  params: { category: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const category = decodeURIComponent(params.category);
    const posts = getPostsByCategory(category);
    
    const title = `Категория: ${category} | ${METADATA.TITLE}`;
    const description = `Все посты в категории "${category}". Найдено: ${posts.length} ${posts.length === 1 ? 'пост' : 'постов'}.`;

    return {
      title,
      description,
      keywords: [category, 'блог', 'посты', 'разработка'].join(', '),
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
    console.error('Error generating category metadata:', error);
    return {
      title: `Категория | ${METADATA.TITLE}`,
      description: 'Посты по категории',
    };
  }
}

export default function CategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}