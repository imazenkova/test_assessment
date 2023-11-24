import { useEffect, useState } from 'react';
import { getPaginationCryptoAssets } from '../../api/Api';
import { ICurrency } from '../../types/ApiTypes';
import { SortOrder, SortOrderEnum } from '../../types/SortableTypes';
import Pagination from '../pagination/Pagination';
import SearchBar from '../searchBar/SearchBar';
import SortableColumn from '../sortableColumn/SortableColumn';
import TableStyles from './MainTable.module.scss';
import { customColumnNames } from '../../pages/MainTablePage/ColumnNames';
import TableRow from '../tableRow/TableRow';

const MainTable = () => {
    const [cryptoAssets, setCryptoAssets] = useState<ICurrency[]>([]);
    const [totalPagesCount, setTotalPagesCount] = useState<number>(1);
    const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);
    const [searchInput, setSearchInput] = useState('');
    const [sortColumn, setSortColumn] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrderEnum.ASC);
    // const imageUrl = `https://assets.coincap.io/assets/icons/${crypto.symbol.toLowerCase()}@2x.png`;

    const pageNumbers = Array.from({ length: totalPagesCount }, (item, i) => i + 1);
    const pageSize = 10;

    useEffect(() => {
        async function fetchData() {
            debugger
            try {
                debugger
                const offset = (currentPageNumber - 1) * pageSize;
                const data = await getPaginationCryptoAssets(pageSize, offset, searchInput);
                const dataWithoutZeroValues = data.filter(obj => {

                    const isValid = parseFloat(obj.priceUsd) !== null && parseFloat(obj.priceUsd) !== 0 &&
                        parseFloat(obj.marketCapUsd) !== null && parseFloat(obj.marketCapUsd) !== 0 &&
                        parseFloat(obj.supply) !== null && parseFloat(obj.supply) !== 0 &&
                        parseFloat(obj.volumeUsd24Hr) !== null && parseFloat(obj.volumeUsd24Hr) !== 0 &&
                        parseFloat(obj.changePercent24Hr) !== null && parseFloat(obj.changePercent24Hr) !== 0;

                    return isValid;
                });
                const totalCount = offset + data.length;
                setTotalPagesCount(totalCount);
                setCryptoAssets(dataWithoutZeroValues);
            } catch (error) {
                console.error('An error occurred:', error);
            }
        }

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

    const handleRowClick = (crypto: ICurrency) => {
        // Handle row click and redirection here
        console.log('Clicked crypto:', crypto);
    };

    return (
        <>
            <div>
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

                        </tr>
                    </thead>
                    <tbody>
                        {cryptoAssets.map((crypto, index) => (
                            <TableRow
                                key={crypto.id}
                                crypto={crypto}
                                index={index}
                                onClick={handleRowClick}
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
            </div >
        </>
    );
};

export default MainTable;