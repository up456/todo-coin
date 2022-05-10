import React from 'react';
import styles from './header.module.css';

const Header = () => {
  return (
    <div className={styles.headerContainer}>
      <header className={styles.header}>
        <div className={styles.itemBox}>
          <p className={styles.itemIcon}>Lv12</p>
          <p className={styles.itemInfo}> 12 / 130</p>
        </div>
        <div className={styles.itemBox}>
          <p className={styles.itemIcon}>to-do</p>
          <p className={styles.itemInfo}> 1 / 3</p>
        </div>
        <div className={styles.itemBox}>
          <p className={styles.itemIcon}>coin</p>
          <p className={styles.itemInfo}> 20</p>
        </div>
        <div className={styles.imageBox}>
          <img src="/asset/default_profile.jpg" alt="profile" />
        </div>
      </header>
      <div className={styles.line}></div>
    </div>
  );
};

export default Header;
