import { Metadata } from 'next';
import { getPostBySlug } from '@/lib/blog';
import { METADATA } from '@/constants/base';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const post = await getPostBySlug(params.slug);
    
    if (!post) {
      return {
        title: 'Пост не найден',
        description: 'Запрашиваемый пост не найден',
      };
    }

    const title = `${post.metadata.title} | ${METADATA.TITLE}`;
    const description = post.metadata.excerpt || 'Читайте в блоге на kuzyak.in';
    const publishedTime = post.metadata.date;
    const tags = post.metadata.tags || [];

    return {
      title,
      description,
      keywords: [...tags, 'блог', 'разработка', 'программирование'].join(', '),
      authors: [{ name: post.metadata.author || 'Павел Кузякин' }],
      openGraph: {
        title,
        description,
        type: 'article',
        publishedTime,
        authors: [post.metadata.author || 'Павел Кузякин'],
        tags,
        images: post.metadata.featured_image ? [
          {
            url: post.metadata.featured_image,
            width: 1200,
            height: 630,
            alt: post.metadata.title,
          }
        ] : undefined,
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: post.metadata.featured_image ? [post.metadata.featured_image] : undefined,
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Ошибка загрузки поста',
      description: 'Произошла ошибка при загрузке поста',
    };
  }
}

export default function PostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}