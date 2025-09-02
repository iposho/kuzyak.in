'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { PostSummary } from '@/lib/blog';
import css from '../../page.module.scss';

export default function TagPage() {
  const params = useParams();
  const tag = decodeURIComponent(params.tag as string);
  
  const [posts, setPosts] = useState<PostSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPostsByTag = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/blog/tags/${encodeURIComponent(tag)}/posts`);
        
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

    if (tag) {
      fetchPostsByTag();
    }
  }, [tag]);

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
        <Link href="/blog" className={css.backLink}>
          ← Назад к блогу
        </Link>
        <h1>Посты с тегом #{tag}</h1>
        <p>Найдено постов: {posts.length}</p>
      </div>

      {error && <div className={css.error}>{error}</div>}

      {posts.length === 0 ? (
        <div className={css.emptyState}>
          <h3>Постов с этим тегом не найдено</h3>
          <p>Попробуйте выбрать другой тег</p>
        </div>
      ) : (
        <div className={css.postsGrid}>
          {posts.map(post => (
            <article key={post.slug} className={css.postCard}>
              {post.metadata.featured_image && (
                <div className={css.postImage}>
                  <img 
                    src={post.metadata.featured_image} 
                    alt={post.metadata.title}
                  />
                </div>
              )}
              
              <div className={css.postContent}>
                <div className={css.postHeader}>
                  <h2 className={css.postTitle}>
                    <Link href={`/blog/${post.slug}`}>
                      {post.metadata.title}
                    </Link>
                  </h2>
                  <div className={css.postMeta}>
                    <div className={css.publishDate}>
                      📅 {formatDate(post.metadata.date)}
                    </div>
                    {post.metadata.category && (
                      <span className={css.category}>
                        {post.metadata.category}
                      </span>
                    )}
                  </div>
                </div>

                {post.metadata.excerpt && (
                  <p className={css.postExcerpt}>{post.metadata.excerpt}</p>
                )}

                {post.metadata.tags && post.metadata.tags.length > 0 && (
                  <div className={css.postTags}>
                    {post.metadata.tags.map(postTag => (
                      <Link
                        key={postTag}
                        href={`/blog/tag/${encodeURIComponent(postTag)}`}
                        className={`${css.tag} ${postTag === tag ? css.active : ''}`}
                      >
                        #{postTag}
                      </Link>
                    ))}
                  </div>
                )}

                <Link href={`/blog/${post.slug}`} className={css.readMore}>
                  Читать далее →
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}