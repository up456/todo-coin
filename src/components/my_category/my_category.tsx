import styles from './my_category.module.css';
import React from 'react';

const MyCategory = ({ category }: { category: string }) => {
  return (
    <>
      {category && (
        <div className={styles.categoryBox}>
          <div className={styles.categoryText}>{category}</div>
          <button className={styles.xBtn}>
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
