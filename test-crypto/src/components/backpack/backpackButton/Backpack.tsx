import { useState } from "react";
import { formatPriceWithSuffix } from "../../../utils/formatNumericValue";
import Button from "../../sharedComponents/button/Button";
import RemoveCoinModal from "../removeCoinModal/RemoveCoinModal";
import { ICoin } from "../../../context/backpackCoinContext";

 interface BackpackProps{
    backpackCost:number,
    backpackCoins:ICoin[]
 }

const Backpack: React.FC<BackpackProps>= ({backpackCost,backpackCoins}) => {
    const [showModal, setShowModal] = useState(false);

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
                <RemoveCoinModal backpackCoins={backpackCoins} isOpen={showModal} onClose={handleCloseModal} />
            )}
        </>
    );
};

export default Backpack;