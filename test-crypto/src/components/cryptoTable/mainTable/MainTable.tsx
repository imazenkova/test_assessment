import { useEffect, useState } from 'react';
import { getPaginationCryptoAssets } from '../../../api/Api';
import { customColumnNames } from '../../../pages/MainTablePage/ColumnNames';
import { ICurrency } from '../../../types/ApiTypes';
import { SortOrder, SortOrderEnum } from '../../../types/SortableTypes';
import Pagination from '../../sharedComponents/pagination/Pagination';
import SearchBar from '../../sharedComponents/searchBar/SearchBar';
import SortableColumn from '../sortableColumn/SortableColumn';
import TableRow from '../tableRow/TableRow';
import TableStyles from './MainTable.module.scss';
import Loader from '../../sharedComponents/loader/Loader';
import Header from '../../header/Header';

const MainTable = () => {
    const [cryptoAssets, setCryptoAssets] = useState<ICurrency[]>([]);
    const [totalPagesCount, setTotalPagesCount] = useState<number>(1);
    const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);
    const [searchInput, setSearchInput] = useState('');
    const [sortColumn, setSortColumn] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrderEnum.ASC);
    const [isLoading, setIsLoading] = useState(true);

    const pageNumbers = Array.from({ length: totalPagesCount }, (item, i) => i + 1);
    const pageSize = 15;

    async function fetchData() {

        try {
            const offset = (currentPageNumber - 1) * pageSize;
            const data = await getPaginationCryptoAssets(pageSize, offset, searchInput);
            const dataWithoutZeroValues = data.filter(obj => {

                const isValid = !isNaN(parseFloat(obj.priceUsd)) && parseFloat(obj.priceUsd) !== 0 &&
                    !isNaN(parseFloat(obj.marketCapUsd)) && parseFloat(obj.marketCapUsd) !== 0 &&
                    !isNaN(parseFloat(obj.supply)) && parseFloat(obj.supply) !== 0 &&
                    !isNaN(parseFloat(obj.volumeUsd24Hr)) && parseFloat(obj.volumeUsd24Hr) !== 0 &&
                    !isNaN(parseFloat(obj.changePercent24Hr)) && parseFloat(obj.changePercent24Hr) !== 0 &&
                    !isNaN(parseFloat(obj.maxSupply)) && parseFloat(obj.maxSupply) !== 0

                return isValid;
            });
            const totalCount = offset + data.length;
            setTotalPagesCount(totalCount);
            setCryptoAssets(dataWithoutZeroValues);
            setIsLoading(false)
        } catch (error) {
            console.error('Api Error:', error);
        }
    }

    useEffect(() => {
        fetchData();
    }, [currentPageNumber, searchInput]);

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
                </div >}
        </>
    );
};

export default MainTable;