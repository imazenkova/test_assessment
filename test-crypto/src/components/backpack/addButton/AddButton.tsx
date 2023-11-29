import React, { useState } from 'react';
import style from "./AddButton.module.scss";
import AddToBackpack from '../addCoinModal/AddToBackpackModal';

interface AddButtonProps {
    coinId: string;
    cost: number;
}

const AddButton: React.FC<AddButtonProps> = ({ coinId, cost }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        window.location.reload();
    };

    return (
        <div className={style.container}>
            <button className={style.plus_button} onClick={openModal}>+</button>
            <AddToBackpack coinId={coinId} cost={cost} isOpen={isOpen} closeModal={closeModal} />
        </div>
    );
};

export default AddButton;