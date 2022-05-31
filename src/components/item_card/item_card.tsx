import styles from './item_card.module.css';
import React from 'react';
import Button from '../button/button';

interface TypeItemCard {
  isPlus?: boolean;
}

const ItemCard = ({ isPlus = false }) => {
  return (
    <>
      {isPlus ? (
        <li className={styles.itemCard}>
          <div className={styles.itemBox}>
            <img
              className={styles.plusBtn}
              src="/asset/plus_btn.png"
              alt="plus_btn"
            />
          </div>
        </li>
      ) : (
        <>
          <li className={styles.itemCard}>
            <div className={styles.itemBox}>
              <div className={styles.imgBox}></div>
              <p className={styles.itemTitle}>드라마 1회 시청권</p>
              <p className={styles.itemLv}>Lv제한 - 없음</p>
              <div className={styles.itemPrice}>
                <p className={styles.itemPriceText}>비용 - 10코인</p>
                <img
                  className={styles.itemPriceImg}
                  src="/asset/coin.svg"
                  alt="coin"
                />
              </div>
              <div className={styles.itemBtns}>
                <Button
                  img="/asset/cart.png"
                  text="구입하기"
                  onClick={() => {}}
                />
                <div className={styles.otherBtn}>
                  <img src="/asset/other_btn.png" alt="기타 버튼" />
                </div>
              </div>
            </div>
          </li>
        </>
      )}
    </>
  );
};

export default ItemCard;
