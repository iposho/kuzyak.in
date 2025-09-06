import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/types/blog';
import TagList from '../TagList/TagList';
import styles from './PostCard.module.scss';

interface PostCardProps {
  post: BlogPost;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className={styles.postCard}>
      {post.coverImage && (
        <div className={styles.coverImage}>
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
          />
        </div>
      )}

      <div className={styles.content}>
        <div className={styles.meta}>
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString('ru-RU', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          <span className={styles.separator}>•</span>
          <span>
            {post.readingTime}
            {' '}
            мин чтения
          </span>
        </div>

        <h2 className={styles.title}>
          <Link href={`/blog/${post.slug}`}>
            {post.title}
          </Link>
        </h2>

        <p className={styles.description}>
          {post.description}
        </p>

        <TagList tags={post.tags} />
      </div>
    </article>
  );
}
