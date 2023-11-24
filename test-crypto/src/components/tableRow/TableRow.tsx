import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ICurrency } from '../../types/ApiTypes';
import { formatPriceWithSuffix, roundingNumericValues } from '../../utils/formatNumericValue';
import { RoutesPath } from '../../types/Routes';

interface TableRowProps {
    crypto: ICurrency;
    index: number;
    currentPage: number;
    pageSize: number;
}

const TableRow: React.FC<TableRowProps> = ({ crypto, index, currentPage, pageSize }) => {
    const navigate = useNavigate();
    const imageUrl = `https://assets.coincap.io/assets/icons/${crypto.symbol.toLowerCase()}@2x.png`;

    const handleClick = (id: string) => {
        navigate(`${RoutesPath.ENTITY_DETAILS}/${id}`)
    };

    return (

        <tr key={crypto.id} onClick={() => handleClick(crypto.id)}>

            <td>{(currentPage - 1) * pageSize + index + 1}</td>
            <td>
                <img src={imageUrl} alt="" />
            </td>
            <td>{crypto.symbol}</td>
            <td>{crypto.name}</td>
            <td>{formatPriceWithSuffix(parseFloat(crypto.priceUsd))}</td>
            <td>{formatPriceWithSuffix(parseFloat(crypto.marketCapUsd))}</td>
            <td>{roundingNumericValues(parseFloat(crypto.supply))}</td>
            <td>{formatPriceWithSuffix(parseFloat(crypto.volumeUsd24Hr))}</td>
            <td>{formatPriceWithSuffix(parseFloat(crypto.changePercent24Hr))}%</td>

        </tr>

    );
};

export default TableRow;