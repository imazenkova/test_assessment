import { useEffect, useState } from "react";
import { getPaginationCryptoAssets } from "../api/Api";
import { ICurrency } from "../types/ApiTypes";

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