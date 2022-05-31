import styles from './store_page.module.css';
import React, { useContext } from 'react';
import Header from '../../components/header/header';
import { TypeData, UserIdContext } from '../../App';
import ItemCard from '../../components/item_card/item_card';

interface TypeStorePage {
  data: TypeData;
}

const StorePage = ({ data }: TypeStorePage) => {
  const userId = useContext(UserIdContext);

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
          {data.shop && 1}
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard isPlus={true} />
        </ul>
      </section>
    </div>
  );
};

export default StorePage;
