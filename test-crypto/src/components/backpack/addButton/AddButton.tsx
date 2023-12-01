import React, { useState } from 'react';
import style from "./AddButton.module.scss";
import AddToBackpack from '../addCoinModal/AddToBackpackModal';

interface AddButtonProps {
    coinId: string;
    cost: number;
    name:string;
}

const AddButton: React.FC<AddButtonProps> = ({ coinId, cost, name }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <div className={style.container}>
            <button className={style.plus_button} onClick={openModal}>+</button>
            <AddToBackpack name={name} coinId={coinId} cost={cost} isOpen={isOpen} closeModal={closeModal} />
        </div>
    );
};

export default AddButton;