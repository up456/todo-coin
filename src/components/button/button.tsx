import styles from './button.module.css';
import React, { useState } from 'react';

type TypeButton = {
  text: string;
  onClick: () => void;
  isToggle?: boolean;
  typeReverse?: boolean;
};
const Button = ({
  text,
  onClick,
  isToggle = false,
  typeReverse = false,
}: TypeButton) => {
  const [isReverse, setIsReverse] = useState(typeReverse);
  const onSubmit = () => {
    onClick();
  };
  const onSubmitAndToggle = () => {
    setIsReverse((prevIsReverse) => !prevIsReverse);
    onClick();
  };
  return (
    <button
      className={isReverse ? `${styles.btn} ${styles.reverse}` : styles.btn}
      onClick={isToggle ? onSubmitAndToggle : onSubmit}
    >
      {text}
    </button>
  );
};

export default Button;
