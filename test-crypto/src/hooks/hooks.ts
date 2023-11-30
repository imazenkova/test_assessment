import { useEffect, useState, useContext } from "react";
import { getCoinsByIds } from "../api/Api";
import BackpackCoinsContext from "../context/backpackCoinContext";
import { ICurrency } from "../types/ApiTypes";
import { countCoins } from "../utils/coinsUtils";
import { getTopCoins } from "../utils/coinsUtils";

interface IChanges {
    percent: string;
    difference: string;
}

export function useGetChanges() {
    const context = useContext(BackpackCoinsContext);
    const { getBackpack } = context!;

    const [costChange, setCostChange] = useState<IChanges>({
        percent: "+0.00$",
        difference: "+0.00%"
    });

    async function setDiffrence() {
        try {
            debugger
            const oldTotalCost = localStorage.getItem("totalCost");
            const currentBackpack = getBackpack()
            const ids = currentBackpack.map((item) => item.coinId)
            var idsString = ids.join(",");
            const freshCoins = await getCoinsByIds(idsString);
            const newBackpack = currentBackpack.map((currentCoin) => {
                const freshCoin = freshCoins.find((newCoin) => newCoin.id === currentCoin.coinId)
                return { ...currentCoin, cost: parseFloat(freshCoin!.priceUsd) }
            })
            const newTotalCost = await countCoins(newBackpack)
            if (oldTotalCost) {
                const percentChange = ((newTotalCost - parseFloat(oldTotalCost)) / parseFloat(oldTotalCost)) * 100;
                const difference = newTotalCost - parseFloat(oldTotalCost);

                const percentString = `${(percentChange >= 0 ? '+' : '')}${percentChange.toFixed(2)}%`;
                const differenceString = `${(difference >= 0 ? '+' : '')}${difference.toFixed(2)}$`;

                setCostChange({
                    percent: percentString,
                    difference: differenceString
                });
            }
            return newTotalCost;
        } catch (error) {
            console.log("getFreshCoins", error)
            throw Error;
        }
    }

    useEffect(() => {
        setDiffrence()
    }, []);

    return costChange;
}

export function useTopCoins(topLimit: number) {
    const [topCurrencyData, setTopCurrencyData] = useState<ICurrency[]>([]);
    const getTop = async () => {
        try {
            const topCoins = await getTopCoins(topLimit);
            setTopCurrencyData(topCoins);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getTop();
    }, [topLimit]);

    return topCurrencyData;
};
