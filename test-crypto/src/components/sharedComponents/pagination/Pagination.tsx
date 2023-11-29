import React from 'react';
import PaginationStyles from './Pagination.module.scss';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageNumbers: number[];
  onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  pageNumbers,
  onPageChange,
}) => {
  const handlePageClick = (pageNumber: number) => {
    onPageChange(pageNumber);
  };

  const handlePrevPaginationClick = () => {
    if (currentPage !== 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPaginationClick = () => {
    if (currentPage !== totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const renderPageNumbers = () => {

    const startIndex = Math.max(0, currentPage - 5);
    const endIndex = Math.min(startIndex + 4, totalPages - 1);

    return pageNumbers.slice(startIndex, endIndex + 1).map((pageNumber) => (
      <button
        key={pageNumber}
        className={`${PaginationStyles.pageButton} ${
          pageNumber === currentPage ? PaginationStyles.activeButton : ''
        }`}
        onClick={() => handlePageClick(pageNumber)}
      >
        {pageNumber}
      </button>
    ));
  };

  return (
    <div className={PaginationStyles.pagination}>
      <button
        className={`${PaginationStyles.pageButton} ${
          currentPage === 1 ? PaginationStyles.disabledButton : ''
        }`}
        onClick={handlePrevPaginationClick}
        disabled={currentPage === 1}
      >
       &#60;
      </button>

      {renderPageNumbers()}

      <button
        className={`${PaginationStyles.pageButton} ${
          currentPage === totalPages ? PaginationStyles.disabledButton : ''
        }`}
        onClick={handleNextPaginationClick}
        disabled={currentPage === totalPages}
      >
         &#62;
      </button>
    </div>
  );
};

export default Pagination;