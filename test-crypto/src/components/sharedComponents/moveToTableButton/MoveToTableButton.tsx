import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutesPath } from '../../../types/RoutesTypes';
import styles from "./MoveToTableButton.module.scss";

const MoveToTableButton: React.FC = ( ) => {

  const navigate = useNavigate()
  const handleBackClick = () => {
    navigate(`${RoutesPath.CURRENCY_TABLE}`)
  };

  return (
        <div className={styles.container}>
          <button onClick={handleBackClick}>Move to Table</button>
        </div>
  );
};

export default MoveToTableButton;