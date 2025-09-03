import { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts, getPostsPaginated } from '@/lib/blog';
import { Pagination } from '@/components/ui/Pagination';
import css from './page.module.scss';

interface BlogPageProps {
  searchParams: {
    page?: string;
  };
}

// Генерируем метаданные для SEO
export async function generateMetadata(): Promise<Metadata> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kuzyak.in';

  return {
    title: 'Блог | Павел Кузякин',
    description: 'Мысли, заметки и размышления о разработке, технологиях и жизни. Статьи о фронтенде, бэкенде, DevOps и не только.',
    keywords: 'блог, разработка, программирование, технологии, фронтенд, бэкенд, DevOps',
    openGraph: {
      title: 'Блог | Павел Кузякин',
      description: 'Мысли, заметки и размышления о разработке, технологиях и жизни.',
      url: `${siteUrl}/blog`,
      siteName: 'kuzyak.in',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Блог | Павел Кузякин',
      description: 'Мысли, заметки и размышления о разработке, технологиях и жизни.',
    },
    alternates: {
      canonical: `${siteUrl}/blog`,
    },
  };
}

// Генерируем статические параметры для пагинации
export async function generateStaticParams() {
  const allPosts = getAllPosts();
  const totalPages = Math.ceil(allPosts.length / 6);

  return Array.from({ length: totalPages }, (_, i) => ({
    page: (i + 1).toString(),
  }));
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const currentPage = parseInt(searchParams.page || '1', 10);
  const limit = 6;

  const {
    posts, totalPages,
  } = getPostsPaginated(currentPage, limit);

  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className={css.blogPage}>
      <section className={css.section}>
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
      </section>

      {posts.length === 0 ? (
        <section className={css.section}>
          <h2>Постов пока нет</h2>
          <p>Скоро здесь появятся интересные статьи</p>
        </section>
      ) : (
        <section className={css.section}>
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

      {totalPages > 1 && (
        <section className={css.section}>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            baseUrl="/blog"
          />
        </section>
      )}
    </div>
  );
}
