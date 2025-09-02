'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Post, PostSummary } from '@/lib/blog';
import css from './page.module.scss';

export default function PostPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [post, setPost] = useState<Post | null>(null);
  const [navigation, setNavigation] = useState<{
    previous: PostSummary | null;
    next: PostSummary | null;
  }>({ previous: null, next: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;

      try {
        setLoading(true);
        setError(null);

        const [postRes, navRes] = await Promise.all([
          fetch(`/api/blog/posts/${slug}`),
          fetch(`/api/blog/posts/${slug}/navigation`),
        ]);

        if (!postRes.ok) {
          if (postRes.status === 404) {
            setError('Пост не найден');
          } else {
            throw new Error('Failed to fetch post');
          }
          return;
        }

        const postData = await postRes.json();
        setPost(postData.post);

        if (navRes.ok) {
          const navData = await navRes.json();
          setNavigation(navData);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ошибка загрузки поста');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  if (loading) {
    return (
      <div className={css.postPage}>
        <div className={css.loading}>Загрузка поста...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={css.postPage}>
        <Link href="/blog" className={css.backLink}>
          ← Назад к блогу
        </Link>
        {error === 'Пост не найден' ? (
          <div className={css.notFound}>
            <h2>Пост не найден</h2>
            <p>Возможно, пост был удален или перемещен</p>
          </div>
        ) : (
          <div className={css.error}>{error}</div>
        )}
      </div>
    );
  }

  if (!post) {
    return (
      <div className={css.postPage}>
        <div className={css.notFound}>
          <h2>Пост не найден</h2>
          <p>Возможно, пост был удален или перемещен</p>
        </div>
      </div>
    );
  }

  return (
    <div className={css.postPage}>
      <Link href="/blog" className={css.backLink}>
        ← Назад к блогу
      </Link>

      <article>
        <header className={css.postHeader}>
          {post.metadata.featured_image && (
            <div className={css.featuredImage}>
              <img
                src={post.metadata.featured_image}
                alt={post.metadata.title}
              />
            </div>
          )}

          <h1 className={css.postTitle}>{post.metadata.title}</h1>

          <div className={css.postMeta}>
            <div className={css.publishDate}>
              📅
              {' '}
              {formatDate(post.metadata.date)}
            </div>
            {post.metadata.author && (
              <div className={css.author}>
                👤
                {' '}
                {post.metadata.author}
              </div>
            )}
            {post.metadata.category && (
              <span className={css.category}>
                {post.metadata.category}
              </span>
            )}
          </div>

          {post.metadata.tags && post.metadata.tags.length > 0 && (
            <div className={css.postTags}>
              {post.metadata.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog/tag/${encodeURIComponent(tag)}`}
                  className={css.tag}
                >
                  #
                  {tag}
                </Link>
              ))}
            </div>
          )}
        </header>

        <div
          className={css.postContent}
          dangerouslySetInnerHTML={{ __html: post.htmlContent }}
        />
      </article>

      {(navigation.previous || navigation.next) && (
        <nav className={css.postNavigation}>
          <div className={css.navLinks}>
            {navigation.previous && (
              <Link
                href={`/blog/${navigation.previous.slug}`}
                className={`${css.navLink} ${css.previous}`}
              >
                <span className={css.navDirection}>← Предыдущий пост</span>
                <span className={css.navTitle}>{navigation.previous.metadata.title}</span>
              </Link>
            )}
            {navigation.next && (
              <Link
                href={`/blog/${navigation.next.slug}`}
                className={`${css.navLink} ${css.next}`}
              >
                <span className={css.navDirection}>Следующий пост →</span>
                <span className={css.navTitle}>{navigation.next.metadata.title}</span>
              </Link>
            )}
          </div>
        </nav>
      )}
    </div>
  );
}
