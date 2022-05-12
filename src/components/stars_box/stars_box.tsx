import styles from './stars_box.module.css';
import React from 'react';

const StarsBox = ({ satisfaction }: { satisfaction: number }) => {
  return (
    <div className={styles.starsBox}>
      {[...Array(satisfaction)].map((_, idx) => (
        <img
          key={idx}
          className={styles.onStar}
          src="asset/star.png"
          alt="별"
        ></img>
      ))}
      {[...Array(3 - satisfaction)].map((_, idx) => (
        <span key={idx} className={styles.offStar}>
          ★
        </span>
      ))}
    </div>
  );
};

export default StarsBox;
