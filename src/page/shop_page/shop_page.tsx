import styles from './shop_page.module.css';
import React from 'react';
import Header from '../../components/header/header';
import { TypeData, TypeItem } from '../../App';
import ItemCard from '../../components/item_card/item_card';

interface TypeShopPage {
  data: TypeData;
  deleteItem: (targetNumber: string) => void;
  buyItem: (value: TypeItem) => void;
  editMyInfo: (coin: number, itemCount: number) => void;
}

const ShopPage = ({ data, deleteItem, buyItem, editMyInfo }: TypeShopPage) => {
  return (
    <div className={styles.storePage}>
      <Header data={data} />
      <section className={styles.store}>
        <h2 className={styles.storeTitle}>
          <img
            className={styles.storeTitleImg}
            src="/asset/diamond.svg"
            alt="diamond"
          />
          <span className={styles.storeTitleText}>상점</span>
          <img
            className={styles.storeTitleImg}
            src="/asset/diamond.svg"
            alt="diamond"
          />
        </h2>
        <ul className={styles.itemCardList}>
          {data.shop &&
            Object.keys(data.shop).map((key) => (
              <ItemCard
                key={key}
                deleteItem={deleteItem}
                editMyInfo={editMyInfo}
                buyItem={buyItem}
                item={data.shop[key]}
                itemNumber={key}
                myInfo={{
                  myLv: data.myInfo.lv,
                  myCoin: data.myInfo.coin,
                  myTotalItem: data.total.totalItem,
                }}
              />
            ))}
          <ItemCard isPlus={true} />
        </ul>
      </section>
    </div>
  );
};

export default ShopPage;
