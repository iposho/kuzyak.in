'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase, Post } from '@/lib/supabase';
import css from './page.module.scss';

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error: fetchError } = await supabase
          .from('posts')
          .select(`
            *,
            category:categories(*),
            tags:post_tags(tag:tags(*))
          `)
          .eq('status', 'published')
          .order('published_at', { ascending: false });

        if (fetchError) throw fetchError;

        // Transform posts data to include tags properly
        const transformedPosts = data.map(post => ({
          ...post,
          tags: post.tags?.map((pt: any) => pt.tag) || []
        }));

        setPosts(transformedPosts);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ошибка загрузки постов');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className={css.blogPage}>
        <div className={css.loading}>Загрузка постов...</div>
      </div>
    );
  }

  return (
    <div className={css.blogPage}>
      <div className={css.header}>
        <h1>Блог</h1>
        <p>Мысли, заметки и размышления о разработке</p>
      </div>

      {error && <div className={css.error}>{error}</div>}

      {posts.length === 0 ? (
        <div className={css.emptyState}>
          <h3>Постов пока нет</h3>
          <p>Скоро здесь появятся интересные статьи</p>
        </div>
      ) : (
        <div className={css.postsGrid}>
          {posts.map(post => (
            <article key={post.id} className={css.postCard}>
              <div className={css.postHeader}>
                <h2 className={css.postTitle}>
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>
                <div className={css.postMeta}>
                  <div className={css.publishDate}>
                    📅 {formatDate(post.published_at || post.created_at)}
                  </div>
                  {post.category && (
                    <span className={css.category}>
                      {post.category.name}
                    </span>
                  )}
                </div>
              </div>

              {post.excerpt && (
                <p className={css.postExcerpt}>{post.excerpt}</p>
              )}

              {post.tags && post.tags.length > 0 && (
                <div className={css.postTags}>
                  {post.tags.map(tag => (
                    <Link
                      key={tag.id}
                      href={`/blog/tag/${tag.slug}`}
                      className={css.tag}
                    >
                      #{tag.name}
                    </Link>
                  ))}
                </div>
              )}

              <Link href={`/blog/${post.slug}`} className={css.readMore}>
                Читать далее →
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}