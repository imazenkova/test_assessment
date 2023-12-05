import React, { useState } from 'react';
import MainTable from '../../components/cryptoTable/mainTable/MainTable';
import { useGetPaginationAssets } from '../../hooks/coinsHooks';
import Pagination from '../../components/sharedComponents/pagination/Pagination';
import SearchBar from '../../components/sharedComponents/searchBar/SearchBar';

const MainTablePage: React.FC = () => {
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);
  const [searchInput, setSearchInput] = useState<string>('');
  const pageSize = 15;

  const { totalPagesCount, isLoading, cryptoAssets } = useGetPaginationAssets(currentPageNumber, pageSize, searchInput)
  const pageNumbers = Array.from({ length: totalPagesCount }, (item, i) => i + 1);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPageNumber(pageNumber);
  };

  const handleSearch = (searchInput: string) => {
    setSearchInput(searchInput);
  };

  return (
    <div>
      <SearchBar onSearchInput={handleSearch} />
      <MainTable currentPageNumber={currentPageNumber} pageSize={pageSize} isLoading={isLoading} cryptoAssets={cryptoAssets} />
      <Pagination
        currentPage={currentPageNumber}
        totalPages={totalPagesCount}
        pageNumbers={pageNumbers}
        onPageChange={handlePageChange}
      />
    </div>
  );
};


export default MainTablePage;