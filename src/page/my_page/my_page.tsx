import styles from './my_page.module.css';
import React from 'react';
import Header from '../../components/header/header';
import { TypeData } from '../../App';
import AuthService from '../../service/authService';
import ItemCard from '../../components/item_card/item_card';
import Tippy from '@tippyjs/react/headless';
import Line from '../../components/line/line';

interface TypeMyPage {
  data: TypeData;
  authService: AuthService;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
  deleteMyItem: (targetNumber: string) => void;
  editMyInfo: (coin: number, itemCount: number) => void;
}
const MyPage = ({
  data,
  authService,
  setUserId,
  deleteMyItem,
  editMyInfo,
}: TypeMyPage) => {
  const onLogout = () => {
    authService.logout(setUserId);
  };

  const cate = data?.myInfo?.categoryRecord || [];
  const categoryRecord = Array.from(cate);

  return (
    <section className={styles.myPage}>
      <Header data={data} />
      <Tippy
        render={(attrs) => (
          <div className={styles.logoutTooltip} tabIndex={1} {...attrs}>
            logout!
          </div>
        )}
      >
        <div className={styles.logoutBtn} onClick={onLogout}>
          <img
            className={styles.logoutBtnImg}
            src="/asset/logout.svg"
            alt="logout"
          />
        </div>
      </Tippy>
      <section className={styles.profileContainer}>
        <div className={styles.nicknameBox}>
          <h2 className={styles.nickname}>피카츄</h2>
          <button
            className={styles.nicknameEditBtn}
          >{`닉네임 변경하기>`}</button>
        </div>
        <div className={styles.imgBox}>
          <div
            className={styles.img}
            style={{ backgroundImage: `url('asset/default_profile.jpg')` }}
          ></div>
          <button className={styles.imgEditBtn}>
            <img src="asset/profileImgEditBtn.svg" alt="" />
          </button>
        </div>
      </section>
      <section className={styles.nowInfoContainer}>
        <div className={styles.nowInfoBox}>
          <img src="asset/nowLv.svg" alt="현재Lv" />
          <div className={`${styles.nowInfoKey} ${styles.firstKey}`}>
            현재 Lv
          </div>
          <div className={styles.nowInfoValue}>
            12 <b className={styles.keyText}>레벨</b>
          </div>
        </div>
        <Line heigt="0.1px" width="80%" mT="0.5em" mB="0.5em" />
        <div className={styles.nowInfoBox}>
          <img src="asset/nowCoin.svg" alt="현재Coin" />
          <div className={styles.nowInfoKey}>현재 Coin</div>
          <div className={styles.nowInfoValue}>
            20 <b className={styles.keyText}>코인</b>
          </div>
        </div>
      </section>

      <h4>누적 todo:{data.total.totalTodo}</h4>
      <h4>누적 coin:{data.total.totalCoin}</h4>
      <h4>누적 item:{data.total.totalItem}</h4>
      <h3>나의 카테고리</h3>
      {categoryRecord.map((category, idx) => (
        <p key={idx}>{category}</p>
      ))}
      <h3>나의 아이템</h3>
      <ul className={styles.itemCardList}>
        {data.myInfo.items &&
          Object.keys(data.myInfo.items).map((key) => (
            <ItemCard
              key={key}
              deleteMyItem={deleteMyItem}
              item={data.myInfo.items[key]}
              itemNumber={key}
              isMyItem={true}
              editMyInfo={editMyInfo}
            />
          ))}
      </ul>
    </section>
  );
};

export default MyPage;
