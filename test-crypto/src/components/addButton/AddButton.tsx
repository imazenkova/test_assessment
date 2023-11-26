import React, { useEffect, useState } from 'react';
import style from "./AddButton.module.scss"

interface AddButtonProps {
    id: string;
}

const AddButton: React.FC<AddButtonProps> = ({ id }) => {
    return (
        <div className={style.conteiner}>
            <button>+</button>
        </div>
    );
};

export default AddButton;