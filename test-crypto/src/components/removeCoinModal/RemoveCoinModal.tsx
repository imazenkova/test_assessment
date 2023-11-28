import React, { useContext, useEffect, useState } from 'react';
import BackpackCoinsContext, { ICoin } from '../../context/backpackCoinContext';
import styles from './RemoveCoinModal.module.scss';

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
    const [backpack, setBackpack] = useState<ICoin[]>();

    useEffect(() => {
        const data = getBackpack()
        setBackpack(data)
    }, [])


    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    const handleRemove = (coinId: string) => {
        try {

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
                        {backpack && backpack.map((coin) => (
                            <li key={coin.coinId} className={styles.coin_item}>
                                <div>{`Coin ID: ${coin.coinId}`}</div>
                                <div>{`Quantity: ${coin.quantity}`}</div>
                                <div>{`Cost: ${coin.cost}`}</div>
                                <div>{`Total: ${coin.quantity * coin.cost}`}</div>
                                <button onClick={() => handleRemove(coin.coinId)}>Удалить</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

        </div>
    );
};

export default RemoveCoinModal;