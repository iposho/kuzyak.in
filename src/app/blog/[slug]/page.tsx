import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllPostSlugs, getPostBySlug } from '@/lib/posts';
import { TagList, MDXContent } from '@/components/blog';
import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.scss';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Пост не найден',
    };
  }

  return {
    title: `${post.title} | kuzyak.in`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  // Проверяем включен ли блог
  if (process.env.NEXT_PUBLIC_ENABLE_BLOG !== 'true') {
    notFound();
  }

  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className={styles.postPage}>
      <div className={styles.container}>
        <div className={styles.postCard}>
          {post.coverImage && (
            <div className={styles.coverImage}>
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 56rem"
              />
            </div>
          )}

          <div className={styles.content}>
            <div className={styles.meta}>
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('ru-RU', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <span className={styles.separator}>•</span>
              <span>
                {post.readingTime}
                {' '}
                мин чтения
              </span>
              <span className={styles.separator}>•</span>
              <span>
                Автор:
                {' '}
                {post.author}
              </span>
            </div>

            <h1 className={styles.title}>
              {post.title}
            </h1>

            <p className={styles.description}>
              {post.description}
            </p>

            <div className={styles.tagsWrapper}>
              <TagList tags={post.tags} />
            </div>

            <div className={styles.content}>
              <MDXContent content={post.content} />
            </div>

            <div className={styles.backLinkWrapper}>
              <Link
                href="/blog"
                className={styles.backLink}
              >
                ← Вернуться к блогу
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}