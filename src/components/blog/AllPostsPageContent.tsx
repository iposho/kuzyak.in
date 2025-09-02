'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { PostSummary } from '@/lib/blog';
import { PostSkeleton } from '@/components/ui/PostSkeleton';
import { Pagination } from '@/components/ui/Pagination';
import css from '../../app/blog/all/page.module.scss';

export default function AllPostsPageContent() {
  const searchParams = useSearchParams();
  const [posts, setPosts] = useState<PostSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalPosts: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);

        const currentPage = parseInt(searchParams.get('page') || '1', 10);
        const limit = 12; // Больше постов на странице "Все посты"

        const response = await fetch(`/api/blog/posts?page=${currentPage}&limit=${limit}`);
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }

        const data = await response.json();
        setPosts(data.posts);
        setPagination(data.pagination);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ошибка загрузки постов');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [searchParams]);

  if (loading) {
    return (
      <div className={css.allPostsPage}>
        <section className={css.section}>
          <h1>Все посты</h1>
          <p>Полный список всех статей в блоге</p>
        </section>
        <section className={css.section}>
          <PostSkeleton count={8} />
        </section>
      </div>
    );
  }

  if (error) {
    return (
      <div className={css.allPostsPage}>
        <section className={css.section}>
          <div className={css.error}>{error}</div>
        </section>
      </div>
    );
  }

  return (
    <div className={css.allPostsPage}>
      <section className={css.section}>
        <h1>Все посты</h1>
        <p>Полный список всех статей в блоге</p>
      </section>

      {posts.length === 0 ? (
        <section className={css.section}>
          <h2>Постов пока нет</h2>
          <p>Скоро здесь появятся интересные статьи</p>
        </section>
      ) : (
        <section className={css.section}>
          <div className={css.postsList}>
            {posts.map((post, index) => (
              <div key={post.slug} className={css.postItem}>
                <Link href={`/blog/${post.slug}`} className={css.postLink}>
                  {post.metadata.title}
                </Link>
                {/* Добавляем звездочку для некоторых постов (можно настроить логику) */}
                {index % 3 === 0 && <span className={css.star}>★</span>}
              </div>
            ))}
          </div>
        </section>
      )}

      {pagination.totalPages > 1 && (
        <section className={css.section}>
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            baseUrl="/blog/all"
          />
        </section>
      )}
    </div>
  );
}
