import React, { useContext, useEffect, useState } from 'react';
import BackpackCoinsContext, { ICoin } from '../../../context/backpackCoinContext';
import { roundingNumericValues } from '../../../utils/formatNumericValue';
import Modal from '../../sharedComponents/modal/Modal';
import styles from './RemoveCoinModal.module.scss';
import { removeCoin } from '../../../utils/coinsUtils';

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
    const { getBackpack, updateFullBackpack } = context!;

    useEffect(() => {
        const data = getBackpack();
        setBackpackCoins(data);
    }, [getBackpack]);

    const handleRemove = async (coinId: string) => {
        try {
            const newBackpack = await removeCoin(coinId, backpackCoins)
            updateFullBackpack(newBackpack)
        } catch (error) {
            console.log("handleRemove Error", error)
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