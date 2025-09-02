'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Loader } from '@/components/ui/Loader';
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
        <section className={css.section}>
          <h1>Теги</h1>
          <p>Все теги, используемые в блоге</p>
        </section>
        <section className={css.section}>
          <Loader size="medium" text="Загрузка тегов..." />
        </section>
      </div>
    );
  }

  if (error) {
    return (
      <div className={css.tagsPage}>
        <section className={css.section}>
          <div className={css.error}>{error}</div>
        </section>
      </div>
    );
  }

  return (
    <div className={css.tagsPage}>
      <section className={css.section}>
        <h1>Теги</h1>
        <p>Все теги, используемые в блоге</p>
      </section>

      <section className={css.section}>
        {tags.length === 0 ? (
          <div className={css.emptyState}>
            <h2>Тегов пока нет</h2>
            <p>Скоро здесь появятся теги</p>
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
      </section>
    </div>
  );
}
