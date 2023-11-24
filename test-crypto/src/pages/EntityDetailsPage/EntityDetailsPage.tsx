import React, { useState, useEffect } from "react";
import { getEntityDetails } from "../../api/Api";
import { useParams } from 'react-router-dom';
import { ICurrency } from "../../types/ApiTypes";
import { roundingNumericValues, formatPriceWithSuffix } from "../../utils/formatNumericValue";
import style from "./EntityDetailsPage.module.scss"

const EntityDetailsPage = () => {
    const { id } = useParams();
    const [entityDetails, setEntityDetails] = useState<ICurrency>();
    const imageUrl = `https://assets.coincap.io/assets/icons/${entityDetails?.symbol.toLowerCase()}@2x.png`;

    useEffect(() => {
        async function fetchData() {
            try {
                if (id) {
                    const data = await getEntityDetails(id);
                    setEntityDetails(data);
                }
            } catch (error) {
                console.error('Api getEntityDetails Error:', error);
            }
        }
        fetchData();
    }, [id]);

    return (
        <div>
            {entityDetails && (
                <div className={style.container}>
                    <div className={style.details_block}>
                        <div></div>
                        <div className={style.title_info}>
                            <div className={style.img}> <img src={imageUrl} alt="" /></div>
                            <div className={style.crypto_symbol}>{entityDetails.symbol}</div>
                            <div className={style.name}>{entityDetails.name}</div>
                        </div>
                        <div className={style.price}>${formatPriceWithSuffix(parseFloat(entityDetails.priceUsd))}</div>
                        <div className={style.value_block}>
                            <div className={style.key_of_value_block}>Rank:</div>
                            <div className={style.numeric_values} >{roundingNumericValues(parseFloat(entityDetails.rank))}</div>
                        </div>
                        <div className={style.value_block}>
                            <div className={style.key_of_value_block}>Market Cap:</div>
                            <div className={style.numeric_values}>{roundingNumericValues(parseFloat(entityDetails.marketCapUsd))}</div>
                        </div>
                        <div className={style.value_block}>
                            <div className={style.key_of_value_block}>Supply:</div>
                            <div className={style.numeric_values}>{roundingNumericValues(parseFloat(entityDetails.supply))} {entityDetails.symbol}</div>
                        </div>
                        <div className={style.value_block}>
                            <div className={style.key_of_value_block}>Max. Supply:</div>
                            <div className={style.numeric_values}>{roundingNumericValues(parseFloat(entityDetails.maxSupply))} {entityDetails.symbol}</div>
                        </div>
                    </div>
                    <div className={style.schedule_block}></div>
                </div>
            )}
        </div>)
};

export default EntityDetailsPage;