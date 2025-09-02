'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { PostSummary } from '@/lib/blog';
import css from './page.module.scss';

export default function BlogPage() {
  const [posts, setPosts] = useState<PostSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [allTags, setAllTags] = useState<string[]>([]);
  const [allCategories, setAllCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [postsRes, tagsRes, categoriesRes] = await Promise.all([
          fetch('/api/blog/posts'),
          fetch('/api/blog/tags'),
          fetch('/api/blog/categories'),
        ]);

        if (!postsRes.ok || !tagsRes.ok || !categoriesRes.ok) {
          throw new Error('Failed to fetch blog data');
        }

        const [postsData, tagsData, categoriesData] = await Promise.all([
          postsRes.json(),
          tagsRes.json(),
          categoriesRes.json(),
        ]);

        setPosts(postsData.posts);
        setAllTags(tagsData.tags);
        setAllCategories(categoriesData.categories);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ошибка загрузки блога');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, []);

  const filteredPosts = posts.filter((post) => {
    const tagMatch = !selectedTag || post.metadata.tags?.includes(selectedTag);
    const categoryMatch = !selectedCategory || post.metadata.category === selectedCategory;
    return tagMatch && categoryMatch;
  });

  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  if (loading) {
    return (
      <div className={css.blogPage}>
        <div className={css.loading}>Загрузка постов...</div>
      </div>
    );
  }

  return (
    <div className={css.blogPage}>

      {error && <div className={css.error}>{error}</div>}

      {(allTags.length > 0 || allCategories.length > 0) && (
        <div className={css.filters}>
          {allCategories.length > 0 && (
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={css.filterSelect}
            >
              <option value="">Все категории</option>
              {allCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          )}

          {allTags.length > 0 && (
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className={css.filterSelect}
            >
              <option value="">Все теги</option>
              {allTags.map((tag) => (
                <option key={tag} value={tag}>
                  #
                  {tag}
                </option>
              ))}
            </select>
          )}
        </div>
      )}

      {filteredPosts.length === 0 ? (
        <div className={css.emptyState}>
          <h3>Постов пока нет</h3>
          <p>Скоро здесь появятся интересные статьи</p>
        </div>
      ) : (
        <div className={css.postsGrid}>
          {filteredPosts.map((post) => (
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
                    {post.metadata.tags.map((tag) => (
                      <button
                        type="button"
                        key={tag}
                        onClick={() => setSelectedTag(selectedTag === tag ? '' : tag)}
                        className={`${css.tag} ${selectedTag === tag ? css.active : ''}`}
                      >
                        #
                        {tag}
                      </button>
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
