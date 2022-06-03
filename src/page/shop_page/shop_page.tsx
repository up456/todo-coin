import styles from './shop_page.module.css';
import React from 'react';
import Header from '../../components/header/header';
import { TypeData, TypeItem } from '../../App';
import ItemCard from '../../components/item_card/item_card';

interface TypeShopPage {
  data: TypeData;
  deleteItem: (targetNumber: string) => void;
  buyItem: (targetNumber: string, value: TypeItem) => void;
}

const ShopPage = ({ data, deleteItem, buyItem }: TypeShopPage) => {
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
                buyItem={buyItem}
                item={data.shop[key]}
                itemNumber={key}
              />
            ))}
          <ItemCard isPlus={true} />
        </ul>
      </section>
    </div>
  );
};

export default ShopPage;
