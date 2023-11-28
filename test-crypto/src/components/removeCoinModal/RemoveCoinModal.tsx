import React, { useContext, useEffect, useState } from 'react';
import BackpackCoinsContext, { ICoin } from '../../context/backpackCoinContext';
import styles from './RemoveCoinModal.module.scss';
import { roundingNumericValues } from '../../utils/formatNumericValue';
interface RemoveCoinModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const RemoveCoinModal: React.FC<RemoveCoinModalProps> = ({
    isOpen,
    onClose,
}) => {
    const context = useContext(BackpackCoinsContext)
    const { getBackpack } = context!;
    const [backpackCoins, setBackpackCoins] = useState<ICoin[]>();

    useEffect(() => {
        const data = getBackpack()
        setBackpackCoins(data)
    }, [])


    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    const handleRemove = (coinId: string) => {
        try {
            const newBackpack = backpackCoins?.filter(item => item.coinId !== coinId)
            setBackpackCoins(newBackpack)
            localStorage.setItem("backpack", JSON.stringify(newBackpack))
        } catch (error) {
            console.log("UpdateCoinQuantity Error: ", error)
        }
    };

    return (
        <div className={`${styles.modal} ${isOpen ? styles.open : ''}`} onClick={handleOverlayClick}>

            <div className={styles.content}>
                <div className={styles.button_close_container}>
                    <button className={styles.round_button} onClick={onClose}>
                        <span className={styles.cross_icon} >x</span>
                    </button>
                </div>
                <div className={styles.coin_list_container}>
                    <ul className={styles.coin_list}>
                        {backpackCoins && backpackCoins.map((coin) => (
                            <li key={coin.coinId} className={styles.coin_item}>
                                <div><div>{`Coin ID: ${coin.coinId}`}</div>
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

        </div>
    );
};

export default RemoveCoinModal;