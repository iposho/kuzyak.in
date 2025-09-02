'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { PostSummary } from '@/lib/blog';
import css from './page.module.scss';

export default function AllPostsPage() {
  const [posts, setPosts] = useState<PostSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('/api/blog/posts');
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }

        const data = await response.json();
        setPosts(data.posts);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ошибка загрузки постов');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className={css.allPostsPage}>
        <div className={css.loading}>Загрузка постов...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={css.allPostsPage}>
        <div className={css.error}>{error}</div>
      </div>
    );
  }

  return (
    <div className={css.allPostsPage}>
      <header className={css.header}>
        <h1>
          {posts.length}
          {' '}
          заметок
        </h1>
        <nav className={css.breadcrumb}>
          <Link href="/blog">← Блог</Link>
        </nav>
      </header>

      <div className={css.postsContainer}>
        {posts.length === 0 ? (
          <div className={css.emptyState}>
            <p>Постов пока нет</p>
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
}
