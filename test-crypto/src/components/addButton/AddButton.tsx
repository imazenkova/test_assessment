import React from 'react';
import { useState } from 'react';
import style from "./AddButton.module.scss";
import AddToBackpack from '../addCoinModal/AddToBackpackModal';

interface AddButtonProps {
    coinId: string;
    cost: number;
}


const AddButton: React.FC<AddButtonProps> = ({ coinId, cost }) => {
    const [showModal, setShowModal] = useState<boolean>(false)
    
    const handleCloseModal = () => {
        setShowModal(false);
    };
    return (
        <div className={style.container}>
            <button className={style.plus_button} onClick={() => setShowModal(true)}>+</button>
            {
                showModal && <AddToBackpack coinId={coinId} cost={cost} isOpen={showModal} onClose={handleCloseModal} />
            }
        </div>
    );
};

export default AddButton;