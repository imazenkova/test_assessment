import React, { useContext, useEffect, useState } from 'react';
import BackpackCoinsContext, { ICoin } from '../../../context/backpackCoinContext';
import { roundingNumericValues } from '../../../utils/formatNumericValue';
import Modal from '../../sharedComponents/modal/Modal';
import styles from './RemoveCoinModal.module.scss';

interface RemoveCoinModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const RemoveCoinModal: React.FC<RemoveCoinModalProps> = ({
    isOpen,
    onClose,
}) => {
    const [backpackCoins, setBackpackCoins] = useState<ICoin[]>([]);
    const context = useContext(BackpackCoinsContext);
    const { getBackpack } = context!;

    useEffect(() => {
        const data = getBackpack();
        setBackpackCoins(data);
    }, [getBackpack]);

    const handleRemove = (coinId: string) => {
        try {
            const newBackpack = backpackCoins.filter(item => item.coinId !== coinId);
            setBackpackCoins(newBackpack);
            localStorage.setItem("backpack", JSON.stringify(newBackpack));
        } catch (error) {
            console.log("UpdateCoinQuantity Error: ", error);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className={styles.content}>
                <div className={styles.coin_list_container}>
                    <ul className={styles.coin_list}>
                        {backpackCoins.map((coin) => (
                            <li key={coin.coinId} className={styles.coin_item}>
                                <div>
                                    <div>{`Coin ID: ${coin.coinId}`}</div>
                                    <div>{`Quantity: ${coin.quantity}`}</div>
                                    <div>{`Cost: ${roundingNumericValues(coin.cost)}`}</div>
                                    <div>{`Total: ${roundingNumericValues(coin.quantity * coin.cost)}`}</div>
                                </div>
                                <button onClick={() => handleRemove(coin.coinId)}>Remove</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </Modal>
    );
};

export default RemoveCoinModal;