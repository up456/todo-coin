import styles from './my_category.module.css';
import React from 'react';

interface TypeMyCategory {
  category: string;
  deleteMyCategory: (targetCategory: string) => void;
}

const MyCategory = ({ category, deleteMyCategory }: TypeMyCategory) => {
  const onClickXBtn = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    deleteMyCategory(category);
  };
  return (
    <>
      {category && (
        <div className={styles.categoryBox}>
          <div className={styles.categoryText}>{category}</div>
          <button className={styles.xBtn} onClick={onClickXBtn}>
            <img
              className={styles.xBtnImg}
              src="asset/x_white.png"
              alt="x-white"
            />
          </button>
        </div>
      )}
    </>
  );
};

export default MyCategory;
