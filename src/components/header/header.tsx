import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TypeData, UserIdContext } from '../../App';
import { callToday, getMaxExp } from '../../util/calc';
import Line from '../line/line';
import NonExistentUser from '../non_existent_user/non_existent_user';
import styles from './header.module.css';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

interface TypeHeader {
  data: TypeData;
}
const Header = ({ data }: TypeHeader) => {
  const navigate = useNavigate();
  const today = callToday();
  const userId: string = useContext(UserIdContext);

  const todoListData = data?.record?.[today]?.todoList;

  const goToMyPage = () => {
    navigate('/mypage');
  };

  const goToTodayTodoPage = () => {
    navigate(`/todo/${today}`);
  };

  const goToShopPage = () => {
    navigate('/shop');
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
        <Tippy content="오늘의 To-do로 이동">
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
        </Tippy>
        <Tippy content="상점으로 이동">
          <div className={styles.itemBox} onClick={goToShopPage}>
            <p className={styles.itemIcon}>coin</p>
            <p className={styles.itemInfo}> {`${data?.myInfo.coin}`}</p>
          </div>
        </Tippy>
        <Tippy content="마이페이지로 이동">
          <div className={styles.imageBox} onClick={goToMyPage}>
            <img src="/asset/default_profile.jpg" alt="profile" />
          </div>
        </Tippy>
      </header>
      <Line />
    </div>
  );
};

export default React.memo(Header);
