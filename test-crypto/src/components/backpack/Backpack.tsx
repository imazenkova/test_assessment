import React, { useEffect, useState } from "react";
import { ICoin } from "../../context/backpackCoinContext"
import { useContext } from "react";
import BackpackCoinsContext from "../../context/backpackCoinContext";
import styles from "./Backpack.module.scss"
import { roundingNumericValues } from "../../utils/formatNumericValue";

interface ICoinSumMap {
    [key: string]: number;
}


const Backpack = () => {    
    const [coinSumMap, setCoinsSumMap] = useState<ICoinSumMap>()
    const [totalCost, setTotalCost] = useState<number>()

    const context = useContext(BackpackCoinsContext)
    const { getBackpack } = context!;

    async function countCoins(backpack: ICoin[]) {
        try {
            const coinSumMap: ICoinSumMap = {};

            backpack.forEach((curr: ICoin) => {
                coinSumMap[curr.coinId] = curr.quantity * curr.cost;
            });
            const totalCost = backpack.reduce((acc, curr) => acc += curr.cost * curr.quantity, 0)

            setCoinsSumMap(coinSumMap);
            localStorage.setItem('totalCost', totalCost.toString());
        } catch (error) {
            console.log("countCoins error:", error)
        }
    }

    useEffect(() => {
        let backpack = getBackpack()
        countCoins(backpack)
        const totalCount = localStorage.getItem("totalCost")
        if (totalCount !== null) {
            setTotalCost(parseFloat(totalCount))
        } else (
            setTotalCost(0)
        )
    }, [localStorage.getItem("backpack"),])

    useEffect(() => {
        let backpack = getBackpack()
   
    
    }, [localStorage.getItem("backpack"),])


    return (<>
        <button className={styles.button}>
            {totalCost && `$ ${roundingNumericValues(totalCost)}`}
        </button>
    </>)
}
export default Backpack