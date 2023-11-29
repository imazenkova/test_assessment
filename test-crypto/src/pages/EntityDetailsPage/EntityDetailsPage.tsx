import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddButton from "../../components/addButton/AddButton";
import PriceChart from "../../components/chart/priceChart/PriceChart";
import EntityInfo from "../../components/cryptoEntity/entityInfo/EntityInfo";
import Loader from "../../components/sharedComponents/loader/Loader";
import { ICurrency, IHistory, Interval } from "../../types/ApiTypes";
import { RoutesPath } from "../../types/RoutesTypes";
import style from "./EntityDetailsPage.module.scss";
import { fetchDetailsData, fetchHistoryData } from "./api";

const EntityDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [entityDetails, setEntityDetails] = useState<ICurrency | null>(null);
    const [historyData, setHistoryData] = useState<IHistory[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [apiError, setApiError] = useState(false);
    const [selectedInterval, setSelectedInterval] = useState<Interval>("h1");

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);

                const details = await fetchDetailsData(id);
                if (details) {
                    setEntityDetails(details);

                    const history = await fetchHistoryData(id, selectedInterval);
                    setHistoryData(history);
                }

                setIsLoading(false);
            } catch (error) {
                setApiError(true);
                console.error("Fetch Data Error:", error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, [id, selectedInterval]);

    useEffect(() => {
        if (apiError) {
            navigate(`${RoutesPath.ENTITY_DETAILS}/${id}/error`);
        }
    }, [apiError, id, navigate]);

    const handleIntervalChange = (interval: Interval) => {
        setSelectedInterval(interval);
    };

    return (
        <>
            {isLoading ? (
                <Loader message="Loading..." />
            ) : apiError ? (
                <></>
            ) : (
                <div>
                    <div className={style.wrapper}>
                        <div className={style.container}>
                            <div className={style.info_block}>
                                {entityDetails && (
                                    <>
                                        <AddButton coinId={id!} cost={parseFloat(entityDetails.priceUsd)} />
                                        <EntityInfo entityDetails={entityDetails} />
                                    </>
                                )}
                            </div>
                            <div className={style.schedule_block}>
                                <div className={style.intervalButtons}>
                                    <button
                                        className={`${style.intervalButton} ${selectedInterval === "h1" && style.selected}`}
                                        onClick={() => handleIntervalChange("h1")}
                                    >
                                        1 Hour
                                    </button>
                                    <button
                                        className={`${style.intervalButton} ${selectedInterval === "h12" && style.selected}`}
                                        onClick={() => handleIntervalChange("h12")}
                                    >
                                        12 Hours
                                    </button>
                                    <button
                                        className={`${style.intervalButton} ${selectedInterval === "d1" && style.selected}`}
                                        onClick={() => handleIntervalChange("d1")}
                                    >
                                        1 Day
                                    </button>
                                </div>
                                <PriceChart historyData={historyData} interval={selectedInterval} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default EntityDetailsPage;