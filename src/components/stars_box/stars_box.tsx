import styles from './stars_box.module.css';
import React from 'react';

const StarsBox = ({ satisfaction }: { satisfaction: number }) => {
  return (
    <div className={styles.starsBox}>
      {[...Array(satisfaction)].map(() => (
        <img className={styles.onStar} src="asset/star.png" alt="별"></img>
      ))}
      {[...Array(3 - satisfaction)].map(() => (
        <span className={styles.offStar}>★</span>
      ))}
    </div>
  );
};

export default StarsBox;
