import React, { useEffect, useState } from "react";
import { ICoin } from "../../context/backpackCoinContext"
import { useContext } from "react";
import BackpackCoinsContext from "../../context/backpackCoinContext";
import styles from "./Backpack.module.scss"
import { roundingNumericValues } from "../../utils/formatNumericValue";
import RemoveCoinModal from "../removeCoinModal/RemoveCoinModal";

interface ICoinSumMap {
    [key: string]: number;
}


const Backpack = () => {    

    const [totalCost, setTotalCost] = useState<number>()
    const [showModal, setShowModal] = useState<boolean>(false)
    
    const context = useContext(BackpackCoinsContext)
    const { getBackpack } = context!;

    async function countCoins(backpack: ICoin[]) {
        try {
            const totalCost = backpack.reduce((acc, curr) => acc += curr.cost * curr.quantity, 0)
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

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (<>
        <button  className={styles.button} onClick={() => setShowModal(true)}>
            {totalCost && `$ ${roundingNumericValues(totalCost)}`}
        </button>
        {
                showModal && <RemoveCoinModal  isOpen={showModal} onClose={handleCloseModal} />
            }
    </>)
}
export default Backpack