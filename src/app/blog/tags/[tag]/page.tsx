import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllTagSlugs, getPostsByTag } from '@/lib/posts';
import { PostCard } from '@/components/blog';
import styles from './page.module.scss';

interface TagPageProps {
  params: {
    tag: string;
  };
}

export async function generateStaticParams() {
  const tags = getAllTagSlugs();
  return tags.map((tag) => ({
    tag,
  }));
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const tag = decodeURIComponent(params.tag);

  return {
    title: `Тег: ${tag} | kuzyak.in`,
    description: `Посты с тегом ${tag}`,
  };
}

export default function TagPage({ params }: TagPageProps) {
  // Проверяем включен ли блог
  if (process.env.NEXT_PUBLIC_ENABLE_BLOG !== 'true') {
    notFound();
  }

  const tag = decodeURIComponent(params.tag);
  const posts = getPostsByTag(tag);

  return (
    <div className={styles.tagPage}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            Тег:
            {' '}
            {tag}
          </h1>
          <p className={styles.description}>
            {posts.length}
            {' '}
            {(() => {
              if (posts.length === 1) return 'пост';
              if (posts.length < 5) return 'поста';
              return 'постов';
            })()}
            {' '}
            с тегом
            {' '}
            {tag}
          </p>
        </div>

        {posts.length > 0 ? (
          <div className={styles.postsGrid}>
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <p className={styles.message}>Нет постов с этим тегом</p>
          </div>
        )}
      </div>
    </div>
  );
}
