import { useEffect, useState } from 'react';
import styles from './Pagination.module.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalResults: number;
  resultsPerPage: number;
  onPageChange: (page: number) => void;
}

function useIsMobile(breakpoint = 767): boolean {
  const [isMobile, setIsMobile] = useState(
    () => window.matchMedia(`(max-width: ${breakpoint}px)`).matches,
  );

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [breakpoint]);

  return isMobile;
}

function buildPageNumbers(
  currentPage: number,
  totalPages: number,
): (number | 'ellipsis')[] {
  const pages: (number | 'ellipsis')[] = [];

  // Always show page 1
  pages.push(1);

  // Ellipsis after page 1 if current page is far from start
  if (currentPage > 3) {
    pages.push('ellipsis');
  }

  // Pages around current: currentPage-1, currentPage, currentPage+1
  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  // Ellipsis before last page if current page is far from end
  if (currentPage < totalPages - 2) {
    pages.push('ellipsis');
  }

  // Always show last page (if more than 1 page)
  if (totalPages > 1) {
    pages.push(totalPages);
  }

  return pages;
}

function buildMobilePageNumbers(
  currentPage: number,
  totalPages: number,
): (number | 'ellipsis')[] {
  if (totalPages <= 1) return [1];
  if (totalPages === 2) return [1, 2];

  const pages: (number | 'ellipsis')[] = [];

  // Always show page 1
  pages.push(1);

  if (currentPage === 1) {
    // Current is first: [1] ... [last]
    if (totalPages > 2) pages.push('ellipsis');
    pages.push(totalPages);
  } else if (currentPage === totalPages) {
    // Current is last: [1] ... [last]
    if (totalPages > 2) pages.push('ellipsis');
    pages.push(totalPages);
  } else {
    // Current is in middle: [1] ... [current] ... [last]
    if (currentPage > 2) pages.push('ellipsis');
    pages.push(currentPage);
    if (currentPage < totalPages - 1) pages.push('ellipsis');
    pages.push(totalPages);
  }

  return pages;
}

export default function Pagination({
  currentPage,
  totalPages,
  totalResults,
  resultsPerPage,
  onPageChange,
}: PaginationProps) {
  const isMobile = useIsMobile();

  if (totalPages <= 1) {
    return null;
  }

  const rangeStart = (currentPage - 1) * resultsPerPage + 1;
  const rangeEnd = Math.min(currentPage * resultsPerPage, totalResults);
  const pageNumbers = isMobile
    ? buildMobilePageNumbers(currentPage, totalPages)
    : buildPageNumbers(currentPage, totalPages);

  return (
    <nav aria-label="Search results pagination" className={styles.pagination}>
      <span className={styles.resultCount}>
        {rangeStart}-{rangeEnd} of {totalResults} results
      </span>

      <div className={styles.pages}>
        {/* Prev button */}
        <button
          type="button"
          className={styles.pageButton}
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          aria-label="Previous page"
        >
          &lt;
        </button>

        {/* Page numbers */}
        {pageNumbers.map((item, index) =>
          item === 'ellipsis' ? (
            <span key={`ellipsis-${index}`} className={styles.ellipsis}>
              ...
            </span>
          ) : (
            <button
              key={item}
              type="button"
              className={`${styles.pageButton}${item === currentPage ? ` ${styles.active}` : ''}`}
              onClick={() => onPageChange(item)}
              aria-label={`Page ${item}`}
              aria-current={item === currentPage ? 'page' : undefined}
            >
              {item}
            </button>
          ),
        )}

        {/* Next button */}
        <button
          type="button"
          className={styles.pageButton}
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          aria-label="Next page"
        >
          &gt;
        </button>
      </div>
    </nav>
  );
}
