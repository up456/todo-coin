import styles from './button.module.css';
import React, { useState } from 'react';

type TypeButton = {
  text: string;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
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
  const onSubmit = (event: React.MouseEvent<HTMLElement>) => {
    onClick(event);
  };
  const onSubmitAndToggle = (event: React.MouseEvent<HTMLElement>) => {
    setIsReverse((prevIsReverse) => !prevIsReverse);
    console.log(isReverse);
    onClick(event);
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
