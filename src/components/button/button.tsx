import styles from './button.module.css';
import React, { useCallback, useState } from 'react';

type TypeButton = {
  text: string;
  onClick: () => void;
  isToggle?: boolean;
  typeReverse?: boolean;
  img?: string;
};
const Button = ({
  text,
  onClick,
  isToggle = false,
  typeReverse = false,
  img,
}: TypeButton) => {
  const [isReverse, setIsReverse] = useState(typeReverse);

  const onSubmit = useCallback(() => {
    onClick();
  }, [onClick]);
  const onSubmitAndToggle = useCallback(() => {
    setIsReverse((prevIsReverse) => !prevIsReverse);
    onClick();
  }, [onClick]);
  return (
    <button
      className={isReverse ? `${styles.btn} ${styles.reverse}` : styles.btn}
      onClick={isToggle ? onSubmitAndToggle : onSubmit}
    >
      {img && <img src={img} alt="버튼" />}
      {text}
    </button>
  );
};

export default React.memo(Button);
