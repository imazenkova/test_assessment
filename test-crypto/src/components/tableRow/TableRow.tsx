import React from 'react';
import { roundingNumericValues,formatPriceWithSuffix} from '../../utils/formatNumericValue';
import { ICurrency } from '../../types/ApiTypes';

interface TableRowProps {
  crypto: ICurrency;
  index: number;
  onClick: (crypto: ICurrency) => void;
}

const TableRow: React.FC<TableRowProps> = ({ crypto, index, onClick }) => {
  const handleClick = () => {
    onClick(crypto);
  };

  return (
    <tr key={crypto.id} onClick={handleClick}>
      <td>{index + 1}</td>
      <td>logo</td>
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