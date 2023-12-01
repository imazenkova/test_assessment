import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCoinById, getEntityDetails, getPaginationCryptoAssets } from "../api/Api";
import { fetchHistoryData } from "../pages/EntityDetailsPage/api";
import { ICurrency, IHistory, Interval } from "../types/ApiTypes";
import { RoutesPath } from "../types/RoutesTypes";

export function useGetPaginationAssets(currentPageNumber: number, pageSize: number, searchInput: string) {
    const [totalPagesCount, setTotalPagesCount] = useState<number>(1);
    const [isLoading, setIsLoading] = useState(true);
    const [cryptoAssets, setCryptoAssets] = useState<ICurrency[]>([]);

    async function fetchData() {

        try {
            const offset = (currentPageNumber - 1) * pageSize;
            const data = await getPaginationCryptoAssets(pageSize, offset, searchInput);
            const dataWithoutZeroValues = data.filter(obj => {

                const isValid = !isNaN(parseFloat(obj.priceUsd)) && parseFloat(obj.priceUsd) !== 0 &&
                    !isNaN(parseFloat(obj.marketCapUsd)) && parseFloat(obj.marketCapUsd) !== 0 &&
                    !isNaN(parseFloat(obj.supply)) && parseFloat(obj.supply) !== 0 &&
                    !isNaN(parseFloat(obj.volumeUsd24Hr)) && parseFloat(obj.volumeUsd24Hr) !== 0 &&
                    !isNaN(parseFloat(obj.changePercent24Hr)) && parseFloat(obj.changePercent24Hr) !== 0 &&
                    !isNaN(parseFloat(obj.maxSupply)) && parseFloat(obj.maxSupply) !== 0

                return isValid;
            });
            const totalCount = offset + data.length;
            setTotalPagesCount(totalCount);
            setCryptoAssets(dataWithoutZeroValues);
            setIsLoading(false)
        } catch (error) {
            console.error('Api Error:', error);
        }
    }

    useEffect(() => {
        fetchData();
    }, [currentPageNumber, searchInput]);

    return { totalPagesCount, isLoading, cryptoAssets }
}

export function useGetHistory(id: string, selectedInterval: Interval) {
    const [isLoading, setIsLoading] = useState(true);
    const [historyData, setHistoryData] = useState<IHistory[]>([]);
    const [apiError, setApiError] = useState(false);

    const getCoinHistory = async () => {
        try {
            const history = await fetchHistoryData(id, selectedInterval);
            setHistoryData(history);
            setIsLoading(false);
        } catch (error) {
            setApiError(true);
            console.error("Fetch Data Error:", error);
            setIsLoading(false);
        }
    };
    useEffect(() => {
        getCoinHistory();
    }, [id, selectedInterval]);

    return { isLoading, historyData, apiError }
}

export function useGetEntityInfo() {
    const { id } = useParams();
    const [entityDetails, setEntityDetails] = useState<ICurrency>();
    const [isLoading, setIsLoading] = useState(true);
    const [apiError, setApiError] = useState(false);

    const getCoinInfo = async () => {
        try {

            if (id) {
                const coin = await getCoinById(id);
                if (coin) {
                    const details = await getEntityDetails(id);
                    setEntityDetails(details);
                    setIsLoading(false)
                }

            }
            else return
        } catch (error) {
            setApiError(true);
            console.error("Fetch Data Error:", error);
            setIsLoading(false);
        }
    };
    useEffect(() => {
        getCoinInfo();
    }, [id]);

    return { entityDetails, isLoading, apiError }
}

export function useGetCoinById() {
    const navigate = useNavigate();
    const [coinId, setCoinId] = useState<string>();
    const { id } = useParams();

    const getCoin = async (id: string) => {
        try {
            const coin = await getCoinById(id);
            return coin;
        } catch (error) {
            navigate(`${RoutesPath.ENTITY_DETAILS}/${id}/error`);
        }
    }

    useEffect(() => {
        if (!id) {
            navigate(`${RoutesPath.ENTITY_DETAILS}/${id}/error`);
        } else {
            getCoin(id);
            setCoinId(id);
        }
    }, [id]); // Добавляем id в зависимости useEffect

    return coinId;
}