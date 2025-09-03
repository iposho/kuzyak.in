import Link from 'next/link';
import { PostSummary } from '@/lib/blog';
import css from './RelatedPosts.module.scss';

interface RelatedPostsProps {
  posts: PostSummary[];
  title?: string;
}

export function RelatedPosts({ posts, title = 'Похожие статьи' }: RelatedPostsProps) {
  if (posts.length === 0) {
    return null;
  }

  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <section className={css.relatedPosts}>
      <h3 className={css.title}>{title}</h3>
      <div className={css.postsGrid}>
        {posts.map((post) => (
          <article key={post.slug} className={css.postCard}>
            {post.metadata.featured_image && (
              <div className={css.postImage}>
                <img
                  src={post.metadata.featured_image}
                  alt={post.metadata.title}
                  loading="lazy"
                />
              </div>
            )}

            <div className={css.postContent}>
              <h4 className={css.postTitle}>
                <Link href={`/blog/${post.slug}`}>
                  {post.metadata.title}
                </Link>
              </h4>

              <div className={css.postMeta}>
                <div className={css.publishDate}>
                  📅
                  {' '}
                  {formatDate(post.metadata.date)}
                </div>
                {post.metadata.readingTime && (
                  <div className={css.readingTime}>
                    ⏱️
                    {' '}
                    {post.metadata.readingTime}
                    {' '}
                    мин
                  </div>
                )}
              </div>

              {post.metadata.excerpt && (
                <p className={css.postExcerpt}>{post.metadata.excerpt}</p>
              )}

              {post.metadata.tags && post.metadata.tags.length > 0 && (
                <div className={css.postTags}>
                  {post.metadata.tags.slice(0, 3).map((tag) => (
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

              <Link href={`/blog/${post.slug}`} className={css.readMore}>
                Читать далее →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
