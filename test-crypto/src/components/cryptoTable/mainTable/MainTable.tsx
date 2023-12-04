import { useState } from 'react';
import { useGetPaginationAssets } from '../../../hooks/coinsHooks';
import { customColumnNames } from '../../../pages/MainTablePage/ColumnNames';
import { SortOrder, SortOrderEnum } from '../../../types/SortableTypes';
import Loader from '../../sharedComponents/loader/Loader';
import Pagination from '../../sharedComponents/pagination/Pagination';
import SearchBar from '../../sharedComponents/searchBar/SearchBar';
import SortableColumn from '../sortableColumn/SortableColumn';
import TableRow from '../tableRow/TableRow';
import TableStyles from './MainTable.module.scss';

const MainTable = () => {

    const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);
    const [searchInput, setSearchInput] = useState<string>('');
    const [sortColumn, setSortColumn] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrderEnum.ASC);

    const pageSize = 15;

    const { totalPagesCount, isLoading, cryptoAssets } = useGetPaginationAssets(currentPageNumber, pageSize, searchInput)
    const pageNumbers = Array.from({ length: totalPagesCount }, (item, i) => i + 1);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPageNumber(pageNumber);
    };

    const handleSearch = (searchInput: string) => {
        setSearchInput(searchInput);
    };

    const handleSort = (column: string, order: SortOrder) => {
        setSortColumn(column);
        setSortOrder(order);
    };

    return (
        <>
            {isLoading ? <Loader message="Loading..." /> :
                 <div className={TableStyles.wrapper}>
                    <SearchBar onSearchInput={handleSearch} />
                    <table className={TableStyles.main_table}>
                        <thead>
                            <tr>
                                <th scope='col'>#</th>
                                <th scope='col'></th>
                                <th scope='col'></th>
                                <th scope='col'>{customColumnNames.name}</th>
                                <SortableColumn
                                    cryptoAssets={cryptoAssets}
                                    columnName='priceUsd'
                                    sortColumn={sortColumn}
                                    sortOrder={sortOrder}
                                    onSort={handleSort}
                                />
                                <SortableColumn
                                    cryptoAssets={cryptoAssets}
                                    columnName="marketCapUsd"
                                    sortColumn={sortColumn}
                                    sortOrder={sortOrder}
                                    onSort={handleSort}
                                />
                                <th scope='col'>{customColumnNames.supply}</th>
                                <th scope='col'>{customColumnNames.volumeUsd24Hr}</th>
                                <SortableColumn
                                    cryptoAssets={cryptoAssets}
                                    columnName="changePercent24Hr"
                                    sortColumn={sortColumn}
                                    sortOrder={sortOrder}
                                    onSort={handleSort}
                                />
                                <th>+</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cryptoAssets.map((crypto, index) => (
                                <TableRow
                                    key={crypto.id}
                                    crypto={crypto}
                                    index={index}
                                    currentPage={currentPageNumber}
                                    pageSize={pageSize}
                                />
                            ))}
                        </tbody>
                    </table>
                    <Pagination
                        currentPage={currentPageNumber}
                        totalPages={totalPagesCount}
                        pageNumbers={pageNumbers}
                        onPageChange={handlePageChange}
                    />
                    </div>
                }
        </>
    );
};

export default MainTable;