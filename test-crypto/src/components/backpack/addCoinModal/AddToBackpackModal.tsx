import React, { useState, useContext } from 'react';
import styles from './AddToBackpackModal.module.scss';
import BackpackCoinsContext from '../../../context/backpackCoinContext';
import { roundingNumericValues } from '../../../utils/formatNumericValue';
import Modal from '../../sharedComponents/modal/Modal';

interface AddToBackpackProps {
    coinId: string;
    cost: number;
    isOpen: boolean;
    closeModal: () => void;
}

const AddToBackpack: React.FC<AddToBackpackProps> = ({
    coinId,
    cost,
    isOpen,
    closeModal,
}) => {
    const context = useContext(BackpackCoinsContext);
    const { setBackpack } = context!;

    const [quantity, setQuantity] = useState<number | undefined>();
    const [showEmptyInput, setShowEmptyInput] = useState(false);
    const [showSuccNotification, setShowSuccNotification] = useState(false);

    const handleAdd = () => {
        try {
            if (!quantity || quantity < 0 || quantity > 1000001) {
                return setShowEmptyInput(true);
            }
            setBackpack(coinId, quantity, cost);
            setShowSuccNotification(true);
        } catch (error) {
            console.log("UpdateCoinQuantity Error: ", error);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={closeModal}>
            {showSuccNotification ? (
                <div className={styles.notification}>
                    <p>✓ Coins added to backpack!</p>
                </div>
            ) : (
                <div>
                    <h2>Add to Backpack</h2>
                    <p>Coin: {coinId}</p>
                    <p>Cost: {roundingNumericValues(cost)}</p>
                    <div className={styles.quantity_container}>
                        <input
                            type="number"
                            min={0}
                            max="1000000"
                            value={quantity}
                            onChange={(e) => {
                                setQuantity(parseInt(e.target.value));
                            }}
                        />
                    </div>
                    {showEmptyInput && (
                        <p className={styles.empty_input}>
                            Enter the correct quantity (between 0 and 1000000)!
                        </p>
                    )}
                    <div className={styles.button_add_container}>
                        <button onClick={handleAdd}>Add</button>
                    </div>
                </div>
            )}
        </Modal>
    );
};

export default AddToBackpack;