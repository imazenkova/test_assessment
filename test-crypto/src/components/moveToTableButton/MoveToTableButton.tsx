import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutesPath } from '../../types/RoutesTypes';
import styles from "./MoveToTableButton.module.scss";
import Button from '../sharedComponents/button/Button';

const MoveToTableButton: React.FC = () => {

  const navigate = useNavigate()
  const handleBackClick = () => {
    navigate(`${RoutesPath.CURRENCY_TABLE}`)
  };

  return (
    <Button onClick={handleBackClick}> Table</Button>

  );
};

export default MoveToTableButton;