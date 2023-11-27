import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutesPath } from '../../types/RoutesTypes';
import errorImg from "./404-error.png"
import styles from "./Error.module.scss"
import MoveToTableButton from '../moveToTableButton/MoveToTableButton';
interface ErrorProps {
  message: string;
}

const Error: React.FC<ErrorProps> = ({ message }) => {
  
  return (

    <div className={styles.error__wrapper}>
      <div className={styles.error__container}>
        <div className={styles.error__message}>Oops...</div>  <br />
        <div className={styles.error__message}>{message}</div>
        <img
          src={errorImg}
          alt="error"
          className={styles.error__image}
        />
       <MoveToTableButton/>
      </div>
    </div>

  );
};

export default Error;