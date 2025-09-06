import { Metadata } from 'next';
import { getAllPosts } from '@/lib/posts';
import { PostCard } from '@/components/blog';
import { notFound } from 'next/navigation';
import styles from './page.module.scss';

export const metadata: Metadata = {
  title: 'Блог | kuzyak.in',
  description: 'Мои мысли о разработке, технологиях и жизни',
};

export default function BlogPage() {
  // Проверяем включен ли блог
  if (process.env.NEXT_PUBLIC_ENABLE_BLOG !== 'true') {
    notFound();
  }

  const posts = getAllPosts();

  return (
    <div className={styles.blogPage}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Блог</h1>
        </div>

        {/* {tags.length > 0 && (
          <div className={styles.tagsSection}>
            <h2 className={styles.tagsTitle}>Теги</h2>
            <TagList tags={tags.map((tag) => tag.name)} />
          </div>
        )} */}

        {posts.length > 0 ? (
          <div className={styles.postsGrid}>
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <p className={styles.message}>Пока нет постов</p>
          </div>
        )}
      </div>
    </div>
  );
}
