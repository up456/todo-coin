import styles from './my_page.module.css';
import React from 'react';
import Button from '../../components/button/button';
import Header from '../../components/header/header';
import { TypeData, TypeItem } from '../../App';
import AuthService from '../../service/authService';
import ItemCard from '../../components/item_card/item_card';

interface TypeMyPage {
  data: TypeData;
  authService: AuthService;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
  deleteItem: (targetNumber: string) => void;
  buyItem: (targetNumber: string, value: TypeItem) => void;
  deleteMyItem: (targetNumber: string) => void;
}
const MyPage = ({
  data,
  authService,
  setUserId,
  deleteItem,
  buyItem,
  deleteMyItem,
}: TypeMyPage) => {
  const onLogout = () => {
    authService.logout(setUserId);
  };

  const cate = data?.myInfo?.categoryRecord || [];
  const categoryRecord = Array.from(cate);

  return (
    <section className={styles.myPage}>
      <Header data={data} />
      <h2>마이 페이지입니다.</h2>
      <Button text="로그아웃" onClick={onLogout} />
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
            />
          ))}
      </ul>
    </section>
  );
};

export default MyPage;
