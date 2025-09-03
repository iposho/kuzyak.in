'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { PostSummary } from '@/lib/blog';
import { PostSkeleton } from '@/components/ui/PostSkeleton';
import { Pagination } from '@/components/ui/Pagination';
import css from '../../app/blog/page.module.scss';

export default function BlogPageContent() {
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
    const fetchBlogData = async () => {
      try {
        setLoading(true);
        setError(null);

        const currentPage = parseInt(searchParams.get('page') || '1', 10);
        const limit = 6;

        const postsRes = await fetch(`/api/blog/posts?page=${currentPage}&limit=${limit}`);

        if (!postsRes.ok) {
          throw new Error('Failed to fetch blog data');
        }

        const postsData = await postsRes.json();

        setPosts(postsData.posts);
        setPagination(postsData.pagination);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ошибка загрузки блога');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, [searchParams]);

  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  if (loading) {
    return (
      <div className={css.blogPage}>
        {/* <section className={css.section}>
          <h1>Блог</h1>
          <p>
            Мысли, заметки и размышления о разработке, технологиях и жизни.
          </p>
          <nav className={css.blogNav}>
            <Link href="/blog/all">Все посты</Link>
            <Link href="/blog/tags">Теги</Link>
            <Link href="/blog/archive">Архив</Link>
            <a
              href="/blog/rss.xml"
              target="_blank"
              rel="noopener noreferrer"
            >
              RSS
            </a>
          </nav>
        </section> */}
        <section className={css.section}>
          <PostSkeleton count={6} />
        </section>
      </div>
    );
  }

  return (
    <div className={css.blogPage}>
      {/* <section className={css.section}>
        <h1>Блог</h1>
        <p>
          Мысли, заметки и размышления о разработке, технологиях и жизни.
        </p>
        <nav className={css.blogNav}>
          <Link href="/blog/all">Все посты</Link>
          <Link href="/blog/tags">Теги</Link>
          <Link href="/blog/archive">Архив</Link>
          <a
            href="/blog/rss.xml"
            target="_blank"
            rel="noopener noreferrer"
          >
            RSS
          </a>
        </nav>
      </section> */}

      {error && (
        <section className={css.section}>
          <div className={css.error}>{error}</div>
        </section>
      )}

      {posts.length === 0 ? (
        <section className={css.section}>
          <h2>Постов пока нет</h2>
          <p>Скоро здесь появятся интересные статьи</p>
        </section>
      ) : (
        <section className={css.section}>
          {/* <h2>Последние посты</h2> */}
          <div className={css.postsGrid}>
            {posts.map((post) => (
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
                    <h3 className={css.postTitle}>
                      <Link href={`/blog/${post.slug}`}>
                        {post.metadata.title}
                      </Link>
                    </h3>
                    <div className={css.postMeta}>
                      <div className={css.publishDate}>
                        📅
                        {' '}
                        {formatDate(post.metadata.date)}
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

                  <Link href={`/blog/${post.slug}`} className={css.readMore}>
                    Читать далее →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {pagination.totalPages > 1 && (
        <section className={css.section}>
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            baseUrl="/blog"
          />
        </section>
      )}
    </div>
  );
}
