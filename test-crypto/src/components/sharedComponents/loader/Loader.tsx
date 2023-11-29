import React from 'react';
import style from'./Loader.module.scss';

interface LoaderProps {
  message: string;
}

const Loader: React.FC<LoaderProps> = ({ message }) => (
  <div className={style.loader}>
    <div className={style.loader__spinner}></div>
    <div className={style.loader__message}>{message}</div>
  </div>
);

export default Loader;