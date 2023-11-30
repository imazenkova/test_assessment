import React, { useContext, useEffect, useState } from "react";
import BackpackCoinsContext, { ICoin } from "../../../context/backpackCoinContext";
import { formatPriceWithSuffix } from "../../../utils/formatNumericValue";
import RemoveCoinModal from "../removeCoinModal/RemoveCoinModal";
import Button from "../../sharedComponents/button/Button";

const Backpack = () => {
    const [backpackCost, setBackpacklCost] = useState<number>(0);
    const [showModal, setShowModal] = useState<boolean>(false);

    const context = useContext(BackpackCoinsContext);
    const { totalCost } = context!;

    const handleCloseModal = () => {
        setShowModal(false);
    };

    useEffect(() => {
        const backpackCost = localStorage.getItem("totalCost")
        if (backpackCost) {
            setBackpacklCost(parseFloat(backpackCost))
        } else {
            setBackpacklCost(0)
        }
    }, [totalCost])

    return (
        <>
            <Button onClick={() => setShowModal(true)}>
                {backpackCost && `$ ${formatPriceWithSuffix(backpackCost)}`}
            </Button>
            {showModal && (
                <RemoveCoinModal isOpen={showModal} onClose={handleCloseModal} />
            )}
        </>
    );
};

export default Backpack;