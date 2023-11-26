import React from "react";
import style from "../../pages/EntityDetailsPage/EntityDetailsPage.module.scss";
import { ICurrency } from "../../types/ApiTypes";
import { formatPriceWithSuffix, roundingNumericValues } from "../../utils/formatNumericValue";
import { customColumnNames } from "../../pages/MainTablePage/ColumnNames";

interface EntityInfoProps {
    entityDetails: ICurrency;

}

const EntityInfo: React.FC<EntityInfoProps> = ({ entityDetails }) => {

    const imageUrl = `https://assets.coincap.io/assets/icons/${entityDetails?.symbol.toLowerCase()}@2x.png`;

    return (
        <>
            {entityDetails && (
                <>
                    <div></div>
                    <div className={style.title_info}>
                        <div className={style.img}> <img src={imageUrl} alt="" /></div>
                        <div className={style.crypto_symbol}>{entityDetails.symbol}</div>
                        <div className={style.name}>{entityDetails.name}</div>
                    </div>
                    <div className={style.price}>${formatPriceWithSuffix(parseFloat(entityDetails.priceUsd))}</div>
                    <div className={style.value_block}>
                        <div className={style.key_of_value_block}>{customColumnNames.rank}</div>
                        <div className={style.numeric_values} >{roundingNumericValues(parseFloat(entityDetails.rank))} :</div>
                    </div>
                    <div className={style.value_block}>
                        <div className={style.key_of_value_block}>{customColumnNames.marketCapUsd}</div>
                        <div className={style.numeric_values}>{roundingNumericValues(parseFloat(entityDetails.marketCapUsd))} :</div>
                    </div>
                    <div className={style.value_block}>
                        <div className={style.key_of_value_block}>{customColumnNames.supply} :</div>
                        <div className={style.numeric_values}>{roundingNumericValues(parseFloat(entityDetails.supply))} {entityDetails!.symbol}</div>
                    </div>
                    <div className={style.value_block}>
                        <div className={style.key_of_value_block}>{customColumnNames.maxSupply}:</div>
                        <div className={style.numeric_values}>{roundingNumericValues(parseFloat(entityDetails.maxSupply))} {entityDetails.symbol}</div>
                    </div>
                </>)}
        </>
    )
};

export default EntityInfo;