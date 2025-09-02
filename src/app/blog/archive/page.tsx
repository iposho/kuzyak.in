import Link from 'next/link';
import { getAllPosts, PostSummary } from '@/lib/blog';
import css from './page.module.scss';

export const metadata = {
  title: 'Архив блога',
};

function groupPostsByYear(posts: PostSummary[]): Record<string, PostSummary[]> {
  return posts.reduce<Record<string, PostSummary[]>>((acc, post) => {
    const year = new Date(post.metadata.date).getFullYear().toString();
    acc[year] = acc[year] ? [...acc[year], post] : [post];
    return acc;
  }, {});
}

export default function BlogArchivePage() {
  const posts = getAllPosts();
  const postsByYear = groupPostsByYear(posts);

  const years = Object.keys(postsByYear).sort((a, b) => Number(b) - Number(a));

  const formatDate = (date: string) => new Date(date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });

  return (
    <div className={css.archivePage}>
      <section className={css.section}>
        <h1>Архив блога</h1>
        <p>Все посты, отсортированные по годам</p>
      </section>

      {years.map((year) => (
        <section key={year} className={css.yearSection}>
          <h2>{year}</h2>
          <ul className={css.postList}>
            {postsByYear[year].map((post) => (
              <li key={post.slug} className={css.postItem}>
                <span className={css.postDate}>{formatDate(post.metadata.date)}</span>
                <Link href={`/blog/${post.slug}`} className={css.postLink}>
                  {post.metadata.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
