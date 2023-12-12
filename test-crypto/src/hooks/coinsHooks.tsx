import { useCallback, useEffect, useState,useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCoinById, getEntityDetails, getPaginationCryptoAssets } from "../api/Api";
import { fetchHistoryData } from "../pages/EntityDetailsPage/api";
import { ICurrency, IHistory, Interval } from "../types/ApiTypes";
import { RoutesPath } from "../types/RoutesTypes";

export function useGetPaginationAssets(currentPageNumber: number, pageSize: number, searchInput: string) {
    const [isLoading, setIsLoading] = useState(true);
    const [cryptoAssets, setCryptoAssets] = useState<ICurrency[]>([]);

    const fetchData = useCallback(async () => {
        const offset = (currentPageNumber - 1) * pageSize;
        const data = await getPaginationCryptoAssets(pageSize, offset, searchInput);
        const dataWithoutZeroValues = data.filter(obj => {
            const isValid = !isNaN(parseFloat(obj.priceUsd)) && parseFloat(obj.priceUsd) !== 0 &&
                !isNaN(parseFloat(obj.marketCapUsd)) && parseFloat(obj.marketCapUsd) !== 0 &&
                !isNaN(parseFloat(obj.supply)) && parseFloat(obj.supply) !== 0 &&
                !isNaN(parseFloat(obj.volumeUsd24Hr)) && parseFloat(obj.volumeUsd24Hr) !== 0 &&
                !isNaN(parseFloat(obj.changePercent24Hr)) && parseFloat(obj.changePercent24Hr) !== 0 &&
                !isNaN(parseFloat(obj.maxSupply)) && parseFloat(obj.maxSupply) !== 0;

            return isValid;
        });
        setCryptoAssets(dataWithoutZeroValues);
        setIsLoading(false);
    }, [currentPageNumber, pageSize, searchInput]);

    useEffect(() => {
        fetchData();
    }, [currentPageNumber, searchInput,fetchData]);

    const totalPagesCount = useMemo(() => {
        const offset = (currentPageNumber - 1) * pageSize;
        const totalCount = offset + cryptoAssets.length;
        return totalCount;
    }, [currentPageNumber, cryptoAssets.length,pageSize]);

    return useMemo(() => {
        return { totalPagesCount, isLoading, cryptoAssets };
    }, [totalPagesCount, isLoading, cryptoAssets]);
}

export function useGetHistory(id: string, selectedInterval: Interval) {
    const [isLoadingHistory, setIsLoading] = useState(true);
    const [historyData, setHistoryData] = useState<IHistory[]>([]);
    const [apiError, setApiError] = useState(false);

    const getCoinHistory = useCallback(async () => {
        try {
            const history = await fetchHistoryData(id, selectedInterval);
            setHistoryData(history);
            setIsLoading(false);
        } catch (error) {
            setApiError(true);
            setIsLoading(false);
        }
    }, [id, selectedInterval]);

    useEffect(() => {
        getCoinHistory();
    }, [id, selectedInterval, getCoinHistory]);

    return { isLoadingHistory, historyData, apiError }
}

export function useGetEntityInfo() {
    const { id } = useParams();
    const [entityDetails, setEntityDetails] = useState<ICurrency>();
    const [isLoading, setIsLoading] = useState(true);
    const [apiError, setApiError] = useState(false);

    const getCoinInfo = useCallback(async () => {
        try {
            if (id) {
                const coin = await getCoinById(id);
                if (coin) {
                    const details = await getEntityDetails(id);
                    setEntityDetails(details);
                    setIsLoading(false);
                }
            } else {
                return;
            }
        } catch (error) {
            setApiError(true);
            setIsLoading(false);
        }
    }, [id]);

    useEffect(() => {
        getCoinInfo();
    }, [id, getCoinInfo]);

    return { entityDetails, isLoading, apiError }
}

export function useGetCoinById() {
    const navigate = useNavigate();
    const [coinId, setCoinId] = useState<string>();
    const { id } = useParams();

    const getCoin = useCallback(async (id: string) => {
        try {
            const coin = await getCoinById(id);
            return coin;
        } catch (error) {
            navigate(`${RoutesPath.ENTITY_DETAILS}/${id}/error`);
        }
    }, [navigate]);

    useEffect(() => {
        if (!id) {
            navigate(`${RoutesPath.ENTITY_DETAILS}/${id}/error`);
        } else {
            getCoin(id);
            setCoinId(id);
        }
    }, [id, getCoin, navigate]); 

    return coinId;
}