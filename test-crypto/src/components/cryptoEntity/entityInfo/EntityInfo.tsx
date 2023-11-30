import React from "react";
import style from "../../../pages/EntityDetailsPage/EntityDetailsPage.module.scss";
import { ICurrency } from "../../../types/ApiTypes";
import { roundingNumericValues, formatPriceWithSuffix } from "../../../utils/formatNumericValue";
import { customColumnNames } from "../../../pages/MainTablePage/ColumnNames";

interface EntityInfoProps {
    entityDetails: ICurrency;
}

const EntityInfo: React.FC<EntityInfoProps> = ({ entityDetails }) => {
    const { symbol, name, priceUsd, rank, marketCapUsd, supply, maxSupply } = entityDetails;

    const imageUrl = `https://assets.coincap.io/assets/icons/${symbol.toLowerCase()}@2x.png`;

    return (
        <>
            {entityDetails && (
                <div className={style.container_info}>
                    <div className={style.title_info}>
                        <div className={style.img}>
                            <img src={imageUrl} alt="" />
                        </div>
                        <div className={style.crypto_symbol}>{symbol}</div>
                        <div className={style.name}>{name}</div>
                    </div>
                    <div className={style.price}>${formatPriceWithSuffix(+priceUsd)}</div>
                    <div className={style.value_block}>
                        <div className={style.key_of_value_block}>{customColumnNames.rank}</div>
                        <div className={style.numeric_values}>{roundingNumericValues(+rank)}</div>
                    </div>
                    <div className={style.value_block}>
                        <div className={style.key_of_value_block}>{customColumnNames.marketCapUsd}</div>
                        <div className={style.numeric_values}>{roundingNumericValues(+marketCapUsd)}</div>
                    </div>
                    <div className={style.value_block}>
                        <div className={style.key_of_value_block}>{customColumnNames.supply} :</div>
                        <div className={style.numeric_values}>{roundingNumericValues(+supply)} {symbol}</div>
                    </div>
                    <div className={style.value_block}>
                        <div className={style.key_of_value_block}>{customColumnNames.maxSupply}:</div>
                        <div className={style.numeric_values}>{roundingNumericValues(+maxSupply)} {symbol}</div>
                    </div>
                </div>
            )}
        </>
    );
};

export default EntityInfo;