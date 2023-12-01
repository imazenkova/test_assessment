import { useState } from "react";
import { useBackpackCost } from "../../../hooks/backpackHooks";
import { formatPriceWithSuffix } from "../../../utils/formatNumericValue";
import Button from "../../sharedComponents/button/Button";
import RemoveCoinModal from "../removeCoinModal/RemoveCoinModal";

const Backpack = () => {
    const [showModal, setShowModal] = useState(false);
    const backpackCost = useBackpackCost();

    const handleCloseModal = () =>
        setShowModal(false);

    const handleClick = () =>
        setShowModal(true);

    return (
        <>
            <Button onClick={handleClick}>
                {backpackCost && `$ ${formatPriceWithSuffix(backpackCost)}`}
            </Button>
            {showModal && (
                <RemoveCoinModal isOpen={showModal} onClose={handleCloseModal} />
            )}
        </>
    );
};

export default Backpack;