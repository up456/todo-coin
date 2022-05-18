import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TypeData, UserIdContext } from '../../App';
import { getMaxExp } from '../../util/calc';
import Line from '../line/line';
import NonExistentUser from '../non_existent_user/non_existent_user';
import styles from './header.module.css';

interface TypeHeader {
  data: TypeData;
}
const Header = ({ data }: TypeHeader) => {
  const navigate = useNavigate();
  const today = new Date().toISOString().slice(0, 10);
  const userId: string = useContext(UserIdContext);

  if (!userId) return <NonExistentUser />;
  const todoListData = data[userId]?.record[today]?.todoList;

  const goToMyPage = () => {
    navigate('/mypage');
  };
  const goToTodayTodoPage = () => {
    navigate(`/todo/${today}`);
    window.location.reload();
  };
  return (
    <div className={styles.headerContainer}>
      <header className={styles.header}>
        <div className={styles.itemBox}>
          <p className={styles.itemIcon}>{`Lv${data[userId].myInfo.lv}`}</p>
          <p className={styles.itemInfo}>{`${
            data[userId].myInfo.exp
          } / ${getMaxExp(data[userId].myInfo.lv)}`}</p>
        </div>
        <div className={styles.itemBox} onClick={goToTodayTodoPage}>
          <p className={styles.itemIcon}>to-do</p>
          <p className={styles.itemInfo}>
            {todoListData
              ? `${
                  Object.keys(todoListData).filter(
                    (key) => todoListData[key].completeTime
                  ).length
                }
            / ${Object.keys(todoListData).length || ''}`
              : 'Let`s go todo'}
          </p>
        </div>
        <div className={styles.itemBox}>
          <p className={styles.itemIcon}>coin</p>
          <p className={styles.itemInfo}> {`${data[userId].myInfo.coin}`}</p>
        </div>
        <div className={styles.imageBox} onClick={goToMyPage}>
          <img src="/asset/default_profile.jpg" alt="profile" />
        </div>
      </header>
      <Line />
    </div>
  );
};

export default Header;
