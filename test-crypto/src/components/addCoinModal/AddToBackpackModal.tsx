import React, { useState, useContext } from 'react';
import styles from './AddToBackpackModal.module.scss';
import BackpackCoinsContext from '../../context/backpackCoinContext';
import { roundingNumericValues } from '../../utils/formatNumericValue';
import { customColumnNames } from '../../pages/MainTablePage/ColumnNames';

interface AddToBackpackProps {
    coinId: string;
    cost: number;
    isOpen: boolean;
    onClose: () => void;
}

const AddToBackpack: React.FC<AddToBackpackProps> = ({
    coinId,
    cost,
    isOpen,
    onClose,
}) => {
    const coinsContext = useContext(BackpackCoinsContext);
    const { updateCoinQuantity } = coinsContext!;

    const [quantity, setQuantity] = useState<number>();
    const [showEmptyInput, setShowEmptyInput] = useState(false);
    const [showSuccNotification, setShowSuccNotification] = useState(false);

    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    const handleAdd = () => {
        try {
            if (!quantity || quantity < 0 || quantity > 1000001) return setShowEmptyInput(true);
            updateCoinQuantity(coinId, quantity, cost);
            setShowSuccNotification(true)
        } catch (error) {
            console.log("UpdateCoinQuantity Error: ", error)
        }
    };

    return (
        <div className={`${styles.modal} ${isOpen ? styles.open : ''}`} onClick={handleOverlayClick}>
            {showSuccNotification ? (
                <div className={styles.notification}>
                    <p> ✓ Coins added to backpack!</p>
                </div>
            ) : (<div className={styles.content}>
                <div className={styles.button_close_container}>
                    <button className={styles.round_button} onClick={onClose}>
                        <span className={styles.cross_icon} >x</span>
                    </button>
                </div>
                <h2>Add to Backpack</h2>
                <p>Coi: {coinId}</p>
                <p>Cost: {roundingNumericValues(cost)}</p>
                <div className={styles.quintity_container}>
                    <input type='number' min={0} max="1000000" value={quantity} onChange={(e) => {
                        setQuantity(parseInt(e.target.value))
                    }} />
                </div>

                {showEmptyInput && (<p className={styles.emptyInput}>Enter the correct quantity!</p>)}
                <div className={styles.button_add_container}>
                    <button onClick={handleAdd}>Add</button>

                </div>

            </div>)}

        </div>
    );
};

export default AddToBackpack;