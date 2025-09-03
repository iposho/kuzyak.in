import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllTags, getPostsByTagPaginated } from '@/lib/blog';
import { Pagination } from '@/components/ui/Pagination';

import css from '../../page.module.scss';

interface TagPageProps {
  params: {
    tag: string;
  };
  searchParams: {
    page?: string;
  };
}

// Генерируем статические параметры для всех тегов
export async function generateStaticParams() {
  const tags = getAllTags();

  return tags.map((tag) => ({
    tag: encodeURIComponent(tag),
  }));
}

// Генерируем метаданные для SEO
export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const tag = decodeURIComponent(params.tag);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kuzyak.in';
  const tagUrl = `${siteUrl}/blog/tag/${params.tag}`;

  return {
    title: `Посты с тегом #${tag} | Блог Павла Кузякина`,
    description: `Все статьи с тегом #${tag} на блоге Павла Кузякина. Читайте интересные материалы о разработке и технологиях.`,
    keywords: `${tag}, блог, разработка, программирование, технологии`,
    openGraph: {
      title: `Посты с тегом #${tag}`,
      description: `Все статьи с тегом #${tag} на блоге Павла Кузякина.`,
      url: tagUrl,
      siteName: 'kuzyak.in',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `Посты с тегом #${tag}`,
      description: `Все статьи с тегом #${tag} на блоге Павла Кузякина.`,
    },
    alternates: {
      canonical: tagUrl,
    },
  };
}

export default async function TagPage({ params, searchParams }: TagPageProps) {
  const tag = decodeURIComponent(params.tag);
  const currentPage = parseInt(searchParams.page || '1', 10);
  const limit = 6;

  const { posts, totalPages } = getPostsByTagPaginated(tag, currentPage, limit);

  // Если постов с этим тегом нет, показываем 404
  if (posts.length === 0 && currentPage === 1) {
    notFound();
  }

  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className={css.blogPage}>
      <div className={css.header}>
        <h1>
          Посты с тегом #
          {tag}
        </h1>
        <p>
          Найдено постов:
          {posts.length}
        </p>
      </div>

      {posts.length === 0 ? (
        <div className={css.emptyState}>
          <h3>Постов с этим тегом не найдено</h3>
          <p>Попробуйте выбрать другой тег</p>
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
                    loading="lazy"
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
                        className={`${css.tag} ${postTag === tag ? css.active : ''}`}
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

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          baseUrl={`/blog/tag/${encodeURIComponent(tag)}`}
        />
      )}
    </div>
  );
}
