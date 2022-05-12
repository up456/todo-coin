import React from 'react';
import { IDummy } from '../../App';
import { getMaxExp } from '../../util/calc';
import styles from './header.module.css';

const Header = ({ dummy }: { dummy: IDummy }) => {
  const today = new Date().toISOString().slice(0, 10);

  return (
    <div className={styles.headerContainer}>
      <header className={styles.header}>
        <div className={styles.itemBox}>
          <p className={styles.itemIcon}>{`Lv${dummy[1].myInfo.lv}`}</p>
          <p className={styles.itemInfo}>{`${dummy[1].myInfo.exp} / ${getMaxExp(
            dummy[1].myInfo.lv
          )}`}</p>
        </div>
        <div className={styles.itemBox}>
          <p className={styles.itemIcon}>to-do</p>
          <p className={styles.itemInfo}>{`${
            dummy[1].record[today].toDoList.filter(
              (todo) => todo.isCompletion === true
            ).length
          } / ${dummy[1].record[today].toDoList.length}`}</p>
        </div>
        <div className={styles.itemBox}>
          <p className={styles.itemIcon}>coin</p>
          <p className={styles.itemInfo}> {`${dummy[1].myInfo.coin}`}</p>
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
