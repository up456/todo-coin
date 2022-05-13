import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IDummy } from '../../App';
import { getMaxExp } from '../../util/calc';
import Button from '../button/button';
import styles from './header.module.css';

interface IHeader {
  dummy: IDummy;
}
const Header = ({ dummy }: IHeader) => {
  const navigate = useNavigate();
  const today = new Date().toISOString().slice(0, 10);
  const userId: string = sessionStorage.getItem('userId') || '';
  if (userId === '') {
    return (
      <div className={styles.offUser}>
        <p>{'로그인 정보 없음'}</p>
        <Button text="로그인 페이지로 이동" onClick={() => navigate('/')} />
      </div>
    );
  }

  const todayData = today in dummy[userId].record;

  const goToMyPage = () => {
    navigate('/mypage');
  };
  const goToTodayTodoPage = () => {
    navigate(`/todo/${today}`);
  };
  return (
    <div className={styles.headerContainer}>
      <header className={styles.header}>
        <div className={styles.itemBox}>
          <p className={styles.itemIcon}>{`Lv${dummy[userId].myInfo.lv}`}</p>
          <p className={styles.itemInfo}>{`${
            dummy[userId].myInfo.exp
          } / ${getMaxExp(dummy[userId].myInfo.lv)}`}</p>
        </div>
        <div className={styles.itemBox} onClick={goToTodayTodoPage}>
          <p className={styles.itemIcon}>to-do</p>
          <p className={styles.itemInfo}>
            {todayData
              ? `${
                  dummy[userId].record[today].toDoList.filter(
                    (todo) => todo.isCompletion === true
                  ).length
                }
            / ${dummy[userId].record[today].toDoList.length || ''}`
              : 'Let`s go todo'}
          </p>
        </div>
        <div className={styles.itemBox}>
          <p className={styles.itemIcon}>coin</p>
          <p className={styles.itemInfo}> {`${dummy[userId].myInfo.coin}`}</p>
        </div>
        <div className={styles.imageBox} onClick={goToMyPage}>
          <img src="/asset/default_profile.jpg" alt="profile" />
        </div>
      </header>
      <div className={styles.line}></div>
    </div>
  );
};

export default Header;
