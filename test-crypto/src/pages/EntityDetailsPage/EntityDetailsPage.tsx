import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { RoutesPath } from "../../types/RoutesTypes";
import { getEntityDetails, getCryptoHistory } from "../../api/Api";
import EntityInfo from "../../components/entityInfo/EntityInfo";
import Loader from "../../components/loader/Loader";
import { ICurrency, IHistory, Interval } from "../../types/ApiTypes";
import style from "./EntityDetailsPage.module.scss";
import PriceChart from "../../components/priceChart/PriceChart";
import AddButton from "../../components/addButton/AddButton";

const EntityDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const [entityDetails, setEntityDetails] = useState<ICurrency>();
    const [historyData, setHistoryData] = useState<IHistory[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [apiError, setApiError] = useState(false);
    const [selectedInterval, setSelectedInterval] = useState<Interval>('h1');

    async function fetchHistoryData() {
        try {

            setIsLoading(true)

            const currentDate = new Date();
            const currentTimestamp = currentDate.getTime();

            const thirtyDays = 30 * 24 * 60 * 60 * 1000;
            const oneMonthAgoTimestamp = currentTimestamp - thirtyDays
            
            if (!id) return

            const data = await getCryptoHistory(id, selectedInterval, oneMonthAgoTimestamp, currentTimestamp);

            setHistoryData(data);
            setIsLoading(false)
        } catch (error) {
            console.error('Fetch getCryptoHistory Error:', error);
            setIsLoading(false)
            setApiError(true)
        }
    }
    async function fetchDetailsData() {
        try {
            setIsLoading(true)
            if (!id) return
            
            const data = await getEntityDetails(id);
            setEntityDetails(data);
            setIsLoading(false)
        } catch (error) {
            console.error('Fetch getEntityDetails Error:', error);
            setIsLoading(false)
            setApiError(true)
        }
    }

    useEffect(() => {
        fetchHistoryData();
        fetchDetailsData();
    }, []);

    useEffect(() => {
        fetchDetailsData();
    }, [id]);

    useEffect(() => {
        fetchHistoryData();
    }, [id, selectedInterval]);

    useEffect(() => {
        if (apiError) {
            navigate(`${RoutesPath.ENTITY_DETAILS}/${id}/error`)
        }
    }, [apiError, id, navigate])

    const handleIntervalChange = (interval: Interval) => {
        setSelectedInterval(interval);
    };

    return (
        <>
            {isLoading ? <Loader message="Loading..." /> :
                <div>
                    <div className={style.wrapper}>
                        <div className={style.container}>
                            <div className={style.info_block}>
                                <AddButton coinId={id!} cost={parseFloat(entityDetails!.priceUsd)} />
                                <EntityInfo entityDetails={entityDetails!} />
                            </div>
                            <div className={style.schedule_block}>
                                <div className={style.intervalButtons}>
                                    <button
                                        className={`${style.intervalButton} ${selectedInterval === 'h1' && style.selected
                                            }`}
                                        onClick={() => handleIntervalChange('h1')}
                                    >
                                        1 Hour
                                    </button>
                                    <button
                                        className={`${style.intervalButton} ${selectedInterval === 'h12' && style.selected}`}
                                        onClick={() => handleIntervalChange('h12')}
                                    >
                                        12 Hours
                                    </button>
                                    <button
                                        className={`${style.intervalButton} ${selectedInterval === 'd1' && style.selected}`}
                                        onClick={() => handleIntervalChange('d1')}
                                    >
                                        1 Day
                                    </button>
                                </div>
                                <PriceChart historyData={historyData} interval={selectedInterval} />
                            </div>
                        </div>
                    </div>
                </div>}
        </>
    )
};

export default EntityDetailsPage;