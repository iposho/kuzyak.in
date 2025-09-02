import React from 'react';
import Link from 'next/link';
import css from './Pagination.module.scss';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  baseUrl,
  className = '',
}) => {
  if (totalPages <= 1) {
    return null;
  }

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 7;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i += 1) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push('...');
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i += 1) {
        if (i !== 1 && i !== totalPages) {
          pages.push(i);
        }
      }

      if (currentPage < totalPages - 2) {
        pages.push('...');
      }

      // Always show last page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav className={`${css.pagination} ${className}`} aria-label="Пагинация">
      <div className={css.paginationContainer}>
        {/* Previous button */}
        {currentPage > 1 ? (
          <Link
            href={`${baseUrl}?page=${currentPage - 1}`}
            className={`${css.paginationButton} ${css.prevButton}`}
            aria-label="Предыдущая страница"
          >
            ← Предыдущая
          </Link>
        ) : (
          <span className={`${css.paginationButton} ${css.disabled}`}>
            ← Предыдущая
          </span>
        )}

        {/* Page numbers */}
        <div className={css.pageNumbers}>
          {pageNumbers.map((page) => {
            if (page === '...') {
              return (
                <span key={`ellipsis-${Math.random()}`} className={css.ellipsis}>
                  ...
                </span>
              );
            }

            const pageNum = page as number;
            const isCurrentPage = pageNum === currentPage;

            return (
              <Link
                key={`page-${pageNum}`}
                href={`${baseUrl}?page=${pageNum}`}
                className={`${css.pageButton} ${isCurrentPage ? css.active : ''}`}
                aria-label={`Страница ${pageNum}`}
                aria-current={isCurrentPage ? 'page' : undefined}
              >
                {pageNum}
              </Link>
            );
          })}
        </div>

        {/* Next button */}
        {currentPage < totalPages ? (
          <Link
            href={`${baseUrl}?page=${currentPage + 1}`}
            className={`${css.paginationButton} ${css.nextButton}`}
            aria-label="Следующая страница"
          >
            Следующая →
          </Link>
        ) : (
          <span className={`${css.paginationButton} ${css.disabled}`}>
            Следующая →
          </span>
        )}
      </div>

      {/* Page info */}
      <div className={css.pageInfo}>
        Страница
        {' '}
        {currentPage}
        {' '}
        из
        {' '}
        {totalPages}
      </div>
    </nav>
  );
};

export default Pagination;
