import { useContext, useEffect, useState } from "react";
import { getCoinsByIds } from "../api/Api";
import { IChanges } from "../components/header/differences/Differences";
import BackpackCoinsContext from "../context/backpackCoinContext";
import { ICurrency } from "../types/ApiTypes";
import { countCoins, getTopCoins } from "../utils/coinsUtils";


export function useGetChanges() {
    const context = useContext(BackpackCoinsContext);
    const { totalCost, getBackpack } = context || {};

    const initialCost: IChanges = {
        percent: "+0.00$",
        difference: "+0.00%"
    }

    const [costChange, setCostChange] = useState<IChanges>(initialCost);

    async function setDiffrence() {
        const oldTotalCost = localStorage.getItem("totalCost");
        if (!getBackpack) return;
        const currentBackpack = getBackpack()
        const ids = currentBackpack.map((item) => item.coinId)
        const idsString = ids.join(",");

        if (idsString) {
            const freshCoins = await getCoinsByIds(idsString);
            const newBackpack = currentBackpack.map((currentCoin) => {
                const freshCoin = freshCoins.find((newCoin) => newCoin.id === currentCoin.coinId);
                const cost = freshCoin ? parseFloat(freshCoin.priceUsd) : 0;
                return { ...currentCoin, cost };
            });

            const newTotalCost = await countCoins(newBackpack)
            if (oldTotalCost !== null && parseFloat(oldTotalCost)) {
                const percentChange = ((newTotalCost - parseFloat(oldTotalCost)) / parseFloat(oldTotalCost)) * 100;
                const difference = newTotalCost - parseFloat(oldTotalCost);

                const percentString = `${(percentChange >= 0 ? '+' : '')}${percentChange.toFixed(2)}%`;
                const differenceString = `${(difference >= 0 ? '+' : '')}${difference.toFixed(2)}$`;

                setCostChange({
                    percent: percentString,
                    difference: differenceString
                });
            }
        } else {
            setCostChange(initialCost)
        }
    }

    useEffect(() => {
        setDiffrence()
    }, [totalCost]);


    useEffect(() => {
        setDiffrence()
    }, []);

    return costChange;
}

export function useTopCoins(topLimit: number) {
    const [topCurrencyData, setTopCurrencyData] = useState<ICurrency[]>([]);
    const getTop = async () => {
        const topCoins = await getTopCoins(topLimit);
        setTopCurrencyData(topCoins);
    };

    useEffect(() => {
        getTop();
    }, [topLimit]);

    return topCurrencyData;
};