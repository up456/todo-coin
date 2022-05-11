import styles from './button.module.css';
import React from 'react';

type TypeButton = { text: string; onClick: () => void };
const Button = ({ text, onClick }: TypeButton) => {
  const onSubmit = (event: React.MouseEvent<HTMLElement>) => {
    onClick();
  };
  return (
    <button className={styles.btn} onClick={onSubmit}>
      {text}
    </button>
  );
};

export default Button;
