import { useState } from "react";
import EntityInfo from "../../components/cryptoEntity/entityInfo/EntityInfo";
import IntervalButtons from "../../components/cryptoEntity/intervalButtons/IntervalButtons";
import PriceChart from "../../components/cryptoEntity/priceChart/PriceChart";
import { useGetCoinById } from "../../hooks/coinsHooks";
import { Interval } from "../../types/ApiTypes";
import style from "./EntityDetailsPage.module.scss";

const EntityDetailsPage = () => {
    const [selectedInterval, setSelectedInterval] = useState<Interval>("h1");
    const coinId = useGetCoinById()

    const handleIntervalChange = (interval: Interval) =>
        setSelectedInterval(interval);

    return (
        <>
            <div>
                <div className={style.wrapper}>
                    {coinId && (<div className={style.container}>
                        <div className={style.info_block}>
                            <EntityInfo id={coinId} />
                        </div>
                        <div className={style.schedule_block}>
                            <IntervalButtons onIntervalChange={handleIntervalChange} />
                            <PriceChart id={coinId} interval={selectedInterval} />
                        </div>
                    </div>)}

                </div>
            </div>
        </>
    );
};

export default EntityDetailsPage;