import styles from './my_page.module.css';
import React, { useRef, useState } from 'react';
import Header from '../../components/header/header';
import { TypeData } from '../../App';
import AuthService from '../../service/authService';
import ItemCard from '../../components/item_card/item_card';
import Tippy from '@tippyjs/react/headless';
import Line from '../../components/line/line';
import ToggleSection from '../../components/toggle_section/toggle_section';
import MyCategory from '../../components/my_category/my_category';

interface TypeMyPage {
  data: TypeData;
  authService: AuthService;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
  deleteMyItem: (targetNumber: string) => void;
  editMyInfo: (coin: number, itemCount: number) => void;
  deleteMyCategory: (targetCategory: string) => void;
  editMyNickname: (newNickname: string) => void;
  editMyProfileImg: (newProfileImgUrl: string) => void;
}
const MyPage = ({
  data,
  authService,
  setUserId,
  deleteMyItem,
  editMyInfo,
  deleteMyCategory,
  editMyNickname,
  editMyProfileImg,
}: TypeMyPage) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [onFocus, setOnFocus] = useState(false);
  const onLogout = () => {
    authService.logout(setUserId);
  };

  const onClickEditNicknameBtn = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (onFocus) {
      const current = inputRef.current;
      if (current && current.value) {
        editMyNickname(current.value);
        current.value = '';
      }
    }
    setOnFocus(!onFocus);
  };

  const onKeyDownNicknameInput = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === 'Enter') {
      if (onFocus) {
        const current = inputRef.current;
        if (current && current.value) {
          editMyNickname(current.value);
          current.value = '';
        }
      }
      setOnFocus(false);
    }
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
            src="/asset/my_page/logout.svg"
            alt="logout"
          />
        </div>
      </Tippy>
      <section className={styles.profileContainer}>
        <div className={styles.nicknameBox}>
          <h2 className={styles.nickname}>{data.myInfo.nickname}</h2>
          <button
            className={styles.nicknameEditBtn}
            onClick={onClickEditNicknameBtn}
          >
            {onFocus ? '작성 완료' : `닉네임 변경하기>`}
          </button>
          <input
            ref={inputRef}
            onKeyDown={onKeyDownNicknameInput}
            className={
              onFocus
                ? `${styles.nicknameEditInput} ${styles.visible}`
                : styles.nicknameEditInput
            }
            type="text"
          />
        </div>
        <div className={styles.imgBox}>
          <div
            className={styles.img}
            style={{ backgroundImage: `url('${data.myInfo.profileImgUrl}')` }}
          ></div>
          <button className={styles.imgEditBtn}>
            <img src="asset/my_page/profile_img_Edit_btn.svg" alt="" />
          </button>
        </div>
      </section>
      <section className={styles.nowInfoContainer}>
        <div className={styles.nowInfoBox}>
          <img src="asset/my_page/now_lv.svg" alt="현재Lv" />
          <div className={`${styles.nowInfoKey} ${styles.firstKey}`}>
            현재 Lv
          </div>
          <div className={styles.nowInfoValue}>
            {data.myInfo.lv} <b className={styles.keyText}>레벨</b>
          </div>
        </div>
        <Line heigt="0.1px" width="80%" mT="0.5em" mB="0.5em" />
        <div className={styles.nowInfoBox}>
          <img src="asset/my_page/now_coin.svg" alt="현재Coin" />
          <div className={styles.nowInfoKey}>현재 Coin</div>
          <div className={styles.nowInfoValue}>
            {data.myInfo.coin} <b className={styles.keyText}>코인</b>
          </div>
        </div>
      </section>
      <section className={styles.totalInfoContainer}>
        <div className={styles.totalInfoBox}>
          <p className={styles.totalInfokey}>누적 완료 todo</p>
          <div className={styles.totalInfoValue}>
            <img src="/asset/my_page/total_todo.svg" alt="total-todo" />
            <span>{data.total.totalTodo}</span>
          </div>
        </div>
        <div className={styles.totalInfoBox}>
          <p className={styles.totalInfokey}>누적 획득 coin</p>
          <div className={styles.totalInfoValue}>
            <img src="/asset/my_page/total_coin.svg" alt="total-coin" />
            <span>{data.total.totalCoin}</span>
          </div>
        </div>
        <div className={styles.totalInfoBox}>
          <p className={styles.totalInfokey}>누적 구매 item</p>
          <div className={styles.totalInfoValue}>
            <img src="/asset/my_page/total_item.svg" alt="total-item" />
            <span>{data.total.totalItem}</span>
          </div>
        </div>
      </section>

      <ToggleSection title={'나의 카테고리'} defaultType={true}>
        <ul className={styles.categoryList}>
          {categoryRecord.map((category, idx) => (
            <MyCategory
              key={idx}
              category={category}
              deleteMyCategory={deleteMyCategory}
            />
          ))}
        </ul>
      </ToggleSection>

      <ToggleSection title={'나의 아이템'}>
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
      </ToggleSection>
    </section>
  );
};

export default MyPage;
