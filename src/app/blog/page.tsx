import { Metadata } from 'next';
import { getAllPosts, getAllTags } from '@/lib/posts';
import { PostCard, TagList, Pagination } from '@/components/blog';
import { notFound } from 'next/navigation';
import styles from './page.module.scss';

interface BlogPageProps {
  searchParams: {
    page?: string;
  };
}

export const metadata: Metadata = {
  title: 'Блог | kuzyak.in',
  description: 'Мои мысли о разработке, технологиях и жизни',
};

export default function BlogPage({ searchParams }: BlogPageProps) {
  // Проверяем включен ли блог
  if (process.env.NEXT_PUBLIC_ENABLE_BLOG !== 'true') {
    notFound();
  }

  const posts = getAllPosts();
  const tags = getAllTags();
  const currentPage = parseInt(searchParams.page || '1', 10);
  const postsPerPage = 6;
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const paginatedPosts = posts.slice(startIndex, endIndex);

  return (
    <div className={styles.blogPage}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Блог</h1>
        </div>

        {tags.length > 0 && (
          <div className={styles.tagsSection}>
            <h2 className={styles.tagsTitle}>Теги</h2>
            <TagList tags={tags.map((tag) => tag.name)} />
          </div>
        )}

        {paginatedPosts.length > 0 ? (
          <>
            <div className={styles.postsGrid}>
              {paginatedPosts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              basePath="/blog"
            />
          </>
        ) : (
          <div className={styles.emptyState}>
            <p className={styles.message}>Пока нет постов</p>
          </div>
        )}
      </div>
    </div>
  );
}
