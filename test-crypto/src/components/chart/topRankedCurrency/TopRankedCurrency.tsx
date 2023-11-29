import React from "react";
import { Link } from 'react-router-dom';
import { formatPriceWithSuffix } from "../../../utils/formatNumericValue";
import { RoutesPath } from "../../../types/RoutesTypes";
import styles from './TopRankedCurrency.module.scss'
import { useNavigate } from "react-router-dom";

interface TopRankedCurrencyProps {
    id: string,
    name: string,
    symbol: string,
    priceUsd: string
}
function TopRankedCurrency({ id,name,symbol,priceUsd}: TopRankedCurrencyProps) {
    const navigate= useNavigate()

    const handleClick = (id: string) => {
        navigate(`${RoutesPath.ENTITY_DETAILS}/${id}`)
    };

    const imageUrl = `https://assets.coincap.io/assets/icons/${symbol.toLowerCase()}@2x.png`;

    return (
        <div onClick={()=>handleClick(id)} className={styles.currencyNavbar}>
               <img src={imageUrl} alt="" />
            <div>{name} ({symbol})</div>
            <div>${formatPriceWithSuffix(parseFloat(priceUsd))}</div>
        </div>
   );
}

export default TopRankedCurrency;
