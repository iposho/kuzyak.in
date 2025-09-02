'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import css from './page.module.scss';

export default function TagsPage() {
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('/api/blog/tags');
        if (!response.ok) {
          throw new Error('Failed to fetch tags');
        }

        const data = await response.json();
        setTags(data.tags);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ошибка загрузки тегов');
      } finally {
        setLoading(false);
      }
    };

    fetchTags();
  }, []);

  if (loading) {
    return (
      <div className={css.tagsPage}>
        <div className={css.loading}>Загрузка тегов...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={css.tagsPage}>
        <div className={css.error}>{error}</div>
      </div>
    );
  }

  return (
    <div className={css.tagsPage}>
      <header className={css.header}>
        <h1>Теги</h1>
        <nav className={css.breadcrumb}>
          <Link href="/blog">← Блог</Link>
        </nav>
      </header>

      <div className={css.tagsContainer}>
        {tags.length === 0 ? (
          <div className={css.emptyState}>
            <p>Тегов пока нет</p>
          </div>
        ) : (
          <div className={css.tagsList}>
            {tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog/tag/${encodeURIComponent(tag)}`}
                className={css.tag}
              >
                {tag}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
