import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutesPath } from '../../types/RoutesTypes';
import errorImg from "./404-error.png"
import styles from "./Error.module.scss"

interface ErrorProps {
  message: string;
}

const Error: React.FC<ErrorProps> = ({ message }) => {

  const navigate = useNavigate()
  const handleBackClick = () => {
    navigate(`${RoutesPath.CURRENCY_TABLE}`)
  };

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
        <div>
          <button className={styles.error__button} onClick={handleBackClick}>Move to Table</button>
        </div>
      </div>
    </div>

  );
};

export default Error;