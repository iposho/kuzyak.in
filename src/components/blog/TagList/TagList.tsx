import Link from 'next/link';
import styles from './TagList.module.scss';

interface TagListProps {
  tags: string[];
  className?: string;
}

export default function TagList({ tags, className = '' }: TagListProps) {
  if (!tags || tags.length === 0) {
    return null;
  }

  return (
    <div className={`${styles.tagList} ${className}`}>
      {tags.map((tag) => (
        <Link
          key={tag}
          href={`/blog/tags/${encodeURIComponent(tag)}`}
          className={styles.tag}
        >
          #
          {tag}
        </Link>
      ))}
    </div>
  );
}
