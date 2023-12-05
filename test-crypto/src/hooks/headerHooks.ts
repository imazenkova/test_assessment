import { useContext, useEffect, useState } from "react";
import { getCoinsByIds } from "../api/Api";
import BackpackCoinsContext from "../context/backpackCoinContext";
import { ICurrency } from "../types/ApiTypes";
import { countCoins, getTopCoins } from "../utils/coinsUtils";
import { IChanges } from "../components/header/differences/Differences";


export function useGetChanges() {
    const context = useContext(BackpackCoinsContext);
    const { totalCost, getBackpack } = context!;

    const initialCost: IChanges = {
        percent: "+0.00$",
        difference: "+0.00%"
    }

    const [costChange, setCostChange] = useState<IChanges>(initialCost);

    async function setDiffrence() {
        try {
            debugger
            const oldTotalCost = localStorage.getItem("totalCost");
            const currentBackpack = getBackpack()
            const ids = currentBackpack.map((item) => item.coinId)
            var idsString = ids.join(",");

            if (idsString) {
                const freshCoins = await getCoinsByIds(idsString);
                const newBackpack = currentBackpack.map((currentCoin) => {
                    const freshCoin = freshCoins.find((newCoin) => newCoin.id === currentCoin.coinId)
                    return { ...currentCoin, cost: parseFloat(freshCoin!.priceUsd) }
                })

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
        } catch (error) {
            console.log("getFreshCoins", error)
            throw Error;
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