import { useState } from "react";
import { formatPriceWithSuffix } from "../../../utils/formatNumericValue";
import Button from "../../sharedComponents/button/Button";
import RemoveCoinModal from "../removeCoinModal/RemoveCoinModal";

 interface BackpackProps{
    backpackCost:number;
 }
const Backpack: React.FC<BackpackProps>= ({backpackCost}) => {
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
                <RemoveCoinModal isOpen={showModal} onClose={handleCloseModal} />
            )}
        </>
    );
};

export default Backpack;