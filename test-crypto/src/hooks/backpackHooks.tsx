import { useEffect, useState, useContext } from "react"
import BackpackCoinsContext, { ICoin } from "../context/backpackCoinContext";

export function useBackpackCost() {
    const [backpackCost, setBackpacklCost] = useState<number>(0);
    const context = useContext(BackpackCoinsContext);
    const { totalCost } = context!;

    useEffect(() => {
        const backpackCost = localStorage.getItem("totalCost")
        if (backpackCost) {
            setBackpacklCost(parseFloat(backpackCost))
        } else {
            setBackpacklCost(0)
        }
    }, [totalCost])

    return backpackCost
}

export function useRemoveCoinInBackpack() {
    const [backpackCoins, setBackpackCoins] = useState<ICoin[]>([]);
    const context = useContext(BackpackCoinsContext);
    const { totalCost, getBackpack } = context!;

    useEffect(() => {
        const backpackCoins = getBackpack();
        setBackpackCoins(backpackCoins);
    }, [totalCost]);
    
    return backpackCoins
}