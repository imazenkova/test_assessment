import React, { FC } from 'react';
import { SortOrder,SortOrderEnum } from '../../../types/SortableTypes';
import { ICurrency } from '../../../types/ApiTypes';
import { customColumnNames } from '../../../pages/MainTablePage/ColumnNames';

type SortableColumnProps = {
    cryptoAssets:ICurrency[];
    columnName: keyof ICurrency;
    sortColumn: string;
    sortOrder: SortOrder;
    onSort: (column: string, order: SortOrder) => void;
};

const SortableColumn: FC<SortableColumnProps> = ({
    cryptoAssets,
    columnName,
    sortColumn,
    sortOrder,
    onSort,
}) => {
    const handleClick = () => {
        const newSortOrder: SortOrderEnum =
          sortColumn === columnName && sortOrder === SortOrderEnum.ASC
            ? SortOrderEnum.DESC
            : SortOrderEnum.ASC;
      
        onSort(columnName, newSortOrder);
      
        cryptoAssets.sort((a, b) => {
          const aValue = parseFloat(a[columnName]);
          const bValue = parseFloat(b[columnName]);
          return newSortOrder === SortOrderEnum.ASC ? aValue - bValue : bValue - aValue;
        });
      };

    return (
        <th scope='col' onClick={handleClick}>
            { customColumnNames[columnName]}
            {sortColumn === columnName && (
                <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>
            )}
            {sortColumn !== columnName && <span>↑↓</span>}
        </th>
    );
};

export default SortableColumn;
