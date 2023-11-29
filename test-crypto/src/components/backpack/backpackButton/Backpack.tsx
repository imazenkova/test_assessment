import React, { useContext, useEffect, useState } from "react";
import BackpackCoinsContext, { ICoin } from "../../../context/backpackCoinContext";
import { roundingNumericValues } from "../../../utils/formatNumericValue";
import RemoveCoinModal from "../removeCoinModal/RemoveCoinModal";
import Button from "../../sharedComponents/button/Button";

const Backpack = () => {
    const [totalCost, setTotalCost] = useState<number | undefined>();
    const [showModal, setShowModal] = useState<boolean>(false);

    const context = useContext(BackpackCoinsContext);
    const { getBackpack } = context!;

    async function countCoins(backpack: ICoin[]) {
        try {
            const totalCost = backpack.reduce(
                (acc, curr) => acc + curr.cost * curr.quantity,
                0
            );
            localStorage.setItem("totalCost", totalCost.toString());
        } catch (error) {
            console.log("countCoins error:", error);
        }
    }

    useEffect(() => {
        const backpack = getBackpack();
        countCoins(backpack);
        const totalCount = localStorage.getItem("totalCost");
        if (totalCount !== null) {
            setTotalCost(parseFloat(totalCount));
        } else {
            setTotalCost(0);
        }
    }, [getBackpack]);

    const handleCloseModal = () => {
        setShowModal(false);
        window.location.reload();
    };

    return (
        <>
            <Button onClick={() => setShowModal(true)}>
                {totalCost && `$ ${roundingNumericValues(totalCost)}`}
            </Button>
            {showModal && (
                <RemoveCoinModal isOpen={showModal} onClose={handleCloseModal} />
            )}
        </>
    );
};

export default Backpack;