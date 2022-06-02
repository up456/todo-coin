import styles from './item_card.module.css';
import React, { useEffect, useRef, useState } from 'react';
import Button from '../button/button';

interface TypeItemCard {
  isPlus?: boolean;
}

const ItemCard = ({ isPlus = false }: TypeItemCard) => {
  const otherBtnToggleRef = useRef<HTMLDivElement>(null);
  const btnsContainerRef = useRef<HTMLDivElement>(null);
  const [onFocus, setOnfocus] = useState(false);

  const onClickOtherBtn = () => {
    setOnfocus(!onFocus);
  };
  const outsideClick = (event: MouseEvent) => {
    if (
      !(
        event.target === otherBtnToggleRef.current ||
        event.target === otherBtnToggleRef.current?.firstElementChild ||
        event.target === btnsContainerRef.current?.children[0] ||
        event.target ===
          btnsContainerRef.current?.children[0].firstElementChild ||
        event.target ===
          btnsContainerRef.current?.children[0].lastElementChild ||
        event.target === btnsContainerRef.current?.children[1] ||
        event.target ===
          btnsContainerRef.current?.children[1].firstElementChild ||
        event.target === btnsContainerRef.current?.children[1].lastElementChild
      )
    ) {
      setOnfocus(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', outsideClick);
    return () => {
      window.removeEventListener('click', outsideClick);
    };
  }, []);

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
                <div
                  className={styles.otherBtnToggle}
                  ref={otherBtnToggleRef}
                  onClick={onClickOtherBtn}
                >
                  <img
                    className={
                      onFocus
                        ? `${styles.otherBtnToggleImg} ${styles.onFocus}`
                        : styles.otherBtnToggleImg
                    }
                    src={`/asset/${onFocus ? 'x' : 'other_btn'}.png`}
                    alt="기타 버튼"
                  />
                </div>

                <div
                  className={
                    onFocus
                      ? styles.btnsContainer
                      : `${styles.btnsContainer} ${styles.hidden}`
                  }
                  ref={btnsContainerRef}
                >
                  <div className={styles.btnBox}>
                    <img src="/asset/update.png" alt="update" />
                    <span>수정</span>
                  </div>
                  <div className={styles.btnBox}>
                    <img src="/asset/delete.png" alt="delete" />
                    <span>삭제</span>
                  </div>
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
