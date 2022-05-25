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

  if (!data.record) {
    data['record'] = {
      [`${today}`]: {
        todoList: {},
        categoryList: [],
        percent: 0,
        acquiredCoin: 0,
        satisfaction: 0,
      },
    };
  }
  const todoListData = data?.record[today]?.todoList;

  const goToMyPage = () => {
    navigate('/mypage');
  };

  const goToTodayTodoPage = () => {
    navigate(`/calendar`);
    window.location.reload();
  };

  if (!userId) return <NonExistentUser />;

  return (
    <div className={styles.headerContainer}>
      <header className={styles.header}>
        <div className={styles.itemBox}>
          <p className={styles.itemIcon}>{`Lv${data?.myInfo.lv}`}</p>
          <p className={styles.itemInfo}>{`${data?.myInfo.exp} / ${getMaxExp(
            data?.myInfo.lv
          )}`}</p>
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
            / ${Object.keys(todoListData).length || 0}`
              : 'Let`s go todo'}
          </p>
        </div>
        <div className={styles.itemBox}>
          <p className={styles.itemIcon}>coin</p>
          <p className={styles.itemInfo}> {`${data?.myInfo.coin}`}</p>
        </div>
        <div className={styles.imageBox} onClick={goToMyPage}>
          <img src="/asset/default_profile.jpg" alt="profile" />
        </div>
      </header>
      <Line />
    </div>
  );
};

export default React.memo(Header);
