'use client';

import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { PostSummary } from '@/lib/blog';
import { PostSkeleton } from '@/components/ui/PostSkeleton';
import { Pagination } from '@/components/ui/Pagination';
import css from '../../page.module.scss';

export default function CategoryPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const category = decodeURIComponent(params.category as string);

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
    const fetchPostsByCategory = async () => {
      try {
        setLoading(true);
        setError(null);

        const currentPage = parseInt(searchParams.get('page') || '1', 10);
        const limit = 6;

        const response = await fetch(`/api/blog/categories/${encodeURIComponent(category)}/posts?page=${currentPage}&limit=${limit}`);

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

    if (category) {
      fetchPostsByCategory();
    }
  }, [category, searchParams]);

  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  if (loading) {
    return (
      <div className={css.blogPage}>
        <div className={css.header}>
          <h1>
            Категория:
            {category}
          </h1>
          <p>Загрузка постов...</p>
        </div>
        <PostSkeleton count={6} />
      </div>
    );
  }

  return (
    <div className={css.blogPage}>
      <div className={css.header}>
        <h1>
          Категория:
          {category}
        </h1>
        <p>
          Найдено постов:
          {posts.length}
        </p>
      </div>

      {error && <div className={css.error}>{error}</div>}

      {posts.length === 0 ? (
        <div className={css.emptyState}>
          <h3>Постов в этой категории не найдено</h3>
          <p>Попробуйте выбрать другую категорию</p>
        </div>
      ) : (
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
                  <h2 className={css.postTitle}>
                    <Link href={`/blog/${post.slug}`}>
                      {post.metadata.title}
                    </Link>
                  </h2>
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

                {post.metadata.tags && post.metadata.tags.length > 0 && (
                  <div className={css.postTags}>
                    {post.metadata.tags.map((postTag) => (
                      <Link
                        key={postTag}
                        href={`/blog/tag/${encodeURIComponent(postTag)}`}
                        className={css.tag}
                      >
                        #
                        {postTag}
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

      {pagination.totalPages > 1 && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          baseUrl={`/blog/category/${encodeURIComponent(category)}`}
        />
      )}
    </div>
  );
}
