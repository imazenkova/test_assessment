import { useGetEntityInfo } from "../../../hooks/coinsHooks";
import style from "../../../pages/EntityDetailsPage/EntityDetailsPage.module.scss";
import { customColumnNames } from "../../../pages/MainTablePage/ColumnNames";
import { formatPriceWithSuffix, roundingNumericValues } from "../../../utils/formatNumericValue";
import AddButton from "../../backpack/addButton/AddButton";
import Loader from "../../sharedComponents/loader/Loader";

interface IEntityInfoProps {
    id: string;
}

const EntityInfo: React.FC<IEntityInfoProps> = ({ id }) => {
    const { entityDetails, isLoading } = useGetEntityInfo()

    return (<>
        {isLoading ? (
            <Loader message="" />) : (
            <>
                {entityDetails && (
                    <div className={style.container_info}>
                        <AddButton coinId={id!} cost={parseFloat(entityDetails.priceUsd)} />
                        <div className={style.title_info}>
                            <div className={style.img}>
                                <img src={`https://assets.coincap.io/assets/icons/${entityDetails.symbol.toLowerCase()}@2x.png`} alt="" />
                            </div>
                            <div className={style.crypto_symbol}>{entityDetails.symbol}</div>
                            <div className={style.name}>{entityDetails.name}</div>
                        </div>
                        <div className={style.price}>${formatPriceWithSuffix(+entityDetails.priceUsd)}</div>
                        <div className={style.value_block}>
                            <div className={style.key_of_value_block}>{customColumnNames.rank}</div>
                            <div className={style.numeric_values}>{roundingNumericValues(+entityDetails.rank)}</div>
                        </div>
                        <div className={style.value_block}>
                            <div className={style.key_of_value_block}>{customColumnNames.marketCapUsd}</div>
                            <div className={style.numeric_values}>{roundingNumericValues(+entityDetails.marketCapUsd)}</div>
                        </div>
                        <div className={style.value_block}>
                            <div className={style.key_of_value_block}>{customColumnNames.supply} :</div>
                            <div className={style.numeric_values}>{roundingNumericValues(+entityDetails.supply)} {entityDetails.symbol}</div>
                        </div>
                        <div className={style.value_block}>
                            <div className={style.key_of_value_block}>{customColumnNames.maxSupply}:</div>
                            <div className={style.numeric_values}>{roundingNumericValues(+entityDetails.maxSupply)} {entityDetails.symbol}</div>
                        </div>
                    </div>
                )}</>
        )}
    </>
    );
};

export default EntityInfo;