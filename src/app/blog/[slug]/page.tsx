import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import {
  getPostBySlug, getPostNavigation, getAllPostSlugs,
} from '@/lib/blog';
import { ShareButtons } from '@/components/blog/ShareButtons';
import { NewsletterSignup } from '@/components/blog/NewsletterSignup';
import css from './page.module.scss';

interface PostPageProps {
  params: {
    slug: string;
  };
}

// Генерируем статические параметры для всех постов
export async function generateStaticParams() {
  const slugs = getAllPostSlugs();

  return slugs.map((slug) => ({
    slug,
  }));
}

// Генерируем метаданные для SEO
export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Пост не найден',
    };
  }

  const { metadata } = post;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kuzyak.in';
  const postUrl = `${siteUrl}/blog/${params.slug}`;

  return {
    title: metadata.title,
    description: metadata.excerpt || `Читайте пост "${metadata.title}" на блоге Павла Кузякина`,
    keywords: metadata.tags?.join(', ') || '',
    authors: metadata.author ? [{ name: metadata.author }] : undefined,
    openGraph: {
      title: metadata.title,
      description: metadata.excerpt || `Читайте пост "${metadata.title}" на блоге Павла Кузякина`,
      url: postUrl,
      siteName: 'kuzyak.in',
      type: 'article',
      publishedTime: metadata.date,
      authors: metadata.author ? [metadata.author] : undefined,
      tags: metadata.tags,
      images: metadata.featured_image ? [
        {
          url: metadata.featured_image,
          width: 1200,
          height: 630,
          alt: metadata.title,
        },
      ] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata.title,
      description: metadata.excerpt || `Читайте пост "${metadata.title}" на блоге Павла Кузякина`,
      images: metadata.featured_image ? [metadata.featured_image] : undefined,
    },
    alternates: {
      canonical: postUrl,
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const navigation = getPostNavigation(params.slug);

  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className={css.postPage}>
      <article>
        <header className={css.postHeader}>
          {post.metadata.featured_image && (
            <div className={css.featuredImage}>
              <img
                src={post.metadata.featured_image}
                alt={post.metadata.title}
                loading="eager"
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
            {post.metadata.readingTime && (
              <div className={css.readingTime}>
                ⏱️
                {' '}
                {post.metadata.readingTime}
                {' '}
                мин чтения
              </div>
            )}
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

      <ShareButtons title={post.metadata.title} />

      <NewsletterSignup />

      {(navigation.previous || navigation.next) && (
        <nav className={css.postNavigation}>
          <div className={css.navLinks}>
            {navigation.previous && (
              <Link
                href={`/blog/${navigation.previous.slug}`}
                className={`${css.navLink} ${css.previous}`}
                prefetch={false}
              >
                <span className={css.navDirection}>← Предыдущий пост</span>
                <span className={css.navTitle}>{navigation.previous.metadata.title}</span>
              </Link>
            )}
            {navigation.next && (
              <Link
                href={`/blog/${navigation.next.slug}`}
                className={`${css.navLink} ${css.next}`}
                prefetch={false}
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
