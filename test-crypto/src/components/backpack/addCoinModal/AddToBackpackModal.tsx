import React, { useState, useContext } from 'react';
import styles from './AddToBackpackModal.module.scss';
import BackpackCoinsContext from '../../../context/backpackCoinContext';
import { roundingNumericValues } from '../../../utils/formatNumericValue';
import Modal from '../../sharedComponents/modal/Modal';

interface AddToBackpackProps {
    name: string;
    coinId: string;
    cost: number;
    isOpen: boolean;
    closeModal: () => void;
}

const AddToBackpack: React.FC<AddToBackpackProps> = ({
    name,
    coinId,
    cost,
    isOpen,
    closeModal,
}) => {
    const context = useContext(BackpackCoinsContext);
    const { setOneCoinToBackpack } = context!;

    const [quantity, setQuantity] = useState<number>(1);
    const [showEmptyInput, setShowEmptyInput] = useState(false);
    const [showSuccNotification, setShowSuccNotification] = useState(false);

    const handleAdd = () => {
        try {
            if (!quantity || quantity < 0 || quantity > 10001) {
                return setShowEmptyInput(true);
            }
            setOneCoinToBackpack(coinId, quantity, cost);
            setShowSuccNotification(true);
        } catch (error) {
            console.log("UpdateCoinQuantity Error: ", error);
        }
    };

    const handleClose = () => {
        closeModal();
        setShowSuccNotification(false);
        setQuantity(1)
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose}>
            {showSuccNotification ? (
                <div className={styles.notification}>
                    <p>✓ Coins added to backpack!</p>
                </div>
            ) : (
                <div className={styles.info_container}>
                    <h2>Add to Backpack</h2>
                    <p>Coin: {name}</p>
                    <p>Cost: {roundingNumericValues(cost)}</p>
                    <div className={styles.quantity_container}>
                        <input
                            type="number"
                            min="1"
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