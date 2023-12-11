import React, { useContext } from 'react';
import BackpackCoinsContext, { ICoin } from '../../../context/backpackCoinContext';
import { removeCoin } from '../../../utils/coinsUtils';
import { roundingNumericValues } from '../../../utils/formatNumericValue';
import Modal from '../../sharedComponents/modal/Modal';
import styles from './RemoveCoinModal.module.scss';

interface RemoveCoinModalProps {
    backpackCoins: ICoin[];
    isOpen: boolean;
    onClose: () => void;
}

const RemoveCoinModal: React.FC<RemoveCoinModalProps> = ({
    backpackCoins,
    isOpen,
    onClose,
}) => {
    const context = useContext(BackpackCoinsContext);
    const { updateFullBackpack } = context || {};


    const handleRemove = async (coinId: string) => {
        const newBackpack = await removeCoin(coinId, backpackCoins)
        if (!updateFullBackpack) return;
        updateFullBackpack(newBackpack)
        if (newBackpack.length === 0) {
            onClose()
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
                                <button className={styles.remove_button} onClick={() => handleRemove(coin.coinId)}>Remove</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </Modal>
    );
};

export default RemoveCoinModal;