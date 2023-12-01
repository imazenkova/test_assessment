import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ICurrency } from '../../../types/ApiTypes';
import { formatPriceWithSuffix, roundingNumericValues } from '../../../utils/formatNumericValue';
import { RoutesPath } from '../../../types/RoutesTypes';
import AddButton from '../../backpack/addButton/AddButton';

interface TableRowProps {
    crypto: ICurrency;
    index: number;
    currentPage: number;
    pageSize: number;
}

const TableRow: React.FC<TableRowProps> = ({ crypto, index, currentPage, pageSize }) => {
    const navigate = useNavigate();

    const imageUrl = `https://assets.coincap.io/assets/icons/${crypto.symbol.toLowerCase()}@2x.png`;

    const handleClick = (id: string) =>
        navigate(`${RoutesPath.ENTITY_DETAILS}/${id}`);

    return (

        <tr key={crypto.id} >
            <td onClick={() => handleClick(crypto.id)}>{(currentPage - 1) * pageSize + index + 1}</td>
            <td>
                <img src={imageUrl} alt="" />
            </td>
            <td onClick={() => handleClick(crypto.id)} >{crypto.symbol}</td>
            <td onClick={() => handleClick(crypto.id)} >{crypto.name}</td>
            <td onClick={() => handleClick(crypto.id)} >{formatPriceWithSuffix(parseFloat(crypto.priceUsd))}</td>
            <td onClick={() => handleClick(crypto.id)} >{formatPriceWithSuffix(parseFloat(crypto.marketCapUsd))}</td>
            <td onClick={() => handleClick(crypto.id)} >{roundingNumericValues(parseFloat(crypto.supply))}</td>
            <td onClick={() => handleClick(crypto.id)}>{formatPriceWithSuffix(parseFloat(crypto.volumeUsd24Hr))}</td>
            <td onClick={() => handleClick(crypto.id)} >{formatPriceWithSuffix(parseFloat(crypto.changePercent24Hr))}%</td>
            <td ><AddButton coinId={crypto.id} cost={parseFloat(crypto.priceUsd)} /></td>
        </tr>

    );
};

export default TableRow;