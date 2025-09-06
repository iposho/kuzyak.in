import Link from 'next/link';
import styles from './Pagination.module.scss';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export default function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = [];
  const maxVisiblePages = 5;

  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i += 1) {
    pages.push(i);
  }

  return (
    <nav className={styles.pagination}>
      {currentPage > 1 && (
        <Link
          href={`${basePath}?page=${currentPage - 1}`}
          className={styles.link}
        >
          Назад
        </Link>
      )}

      {startPage > 1 && (
        <>
          <Link
            href={`${basePath}?page=1`}
            className={styles.link}
          >
            1
          </Link>
          {startPage > 2 && <span className={styles.separator}>...</span>}
        </>
      )}

      {pages.map((page) => (
        <Link
          key={page}
          href={`${basePath}?page=${page}`}
          className={`${styles.link} ${page === currentPage ? styles.active : ''}`}
        >
          {page}
        </Link>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className={styles.separator}>...</span>}
          <Link
            href={`${basePath}?page=${totalPages}`}
            className={styles.link}
          >
            {totalPages}
          </Link>
        </>
      )}

      {currentPage < totalPages && (
        <Link
          href={`${basePath}?page=${currentPage + 1}`}
          className={styles.link}
        >
          Вперед
        </Link>
      )}
    </nav>
  );
}
