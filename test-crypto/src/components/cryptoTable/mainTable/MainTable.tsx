import { useState } from 'react';
import { customColumnNames } from '../../../pages/MainTablePage/ColumnNames';
import { ICurrency } from '../../../types/ApiTypes';
import { SortOrder, SortOrderEnum } from '../../../types/SortableTypes';
import Loader from '../../sharedComponents/loader/Loader';
import SortableColumn from '../sortableColumn/SortableColumn';
import TableRow from '../tableRow/TableRow';
import TableStyles from './MainTable.module.scss';

interface MainTableProps {
    isLoading: boolean,
    cryptoAssets: ICurrency[]
    currentPageNumber: number,
    pageSize: number
}

const MainTable: React.FC<MainTableProps> = ({ currentPageNumber, pageSize, isLoading, cryptoAssets }) => {

    const [sortColumn, setSortColumn] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrderEnum.ASC);

    const handleSort = (column: string, order: SortOrder) => {
        setSortColumn(column);
        setSortOrder(order);
    };

    return (
        <>
            {isLoading ? <Loader message="Loading..." /> :
                <div className={TableStyles.wrapper}>
                    <table  >
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
                </div>
            }
        </>
    );
};

export default MainTable;