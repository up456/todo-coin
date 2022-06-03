import styles from './item_card.module.css';
import React, { useEffect, useRef, useState } from 'react';
import Button from '../button/button';
import { useNavigate } from 'react-router-dom';
import { TypeItem } from '../../App';

const NON_EXIST_ITEM = {
  itemTitle: '',
  itemLv: 0,
  itemPrice: 0,
  imgUrl: '',
};

interface TypeItemCard {
  deleteItem: (targetNumber: string) => void;
  item?: TypeItem;
  isPlus?: boolean;
  itemNumber?: string;
}
export interface TypeEditItemState {
  state: {
    item: TypeItem;
    itemNumber: string;
  };
}

const ItemCard = ({
  deleteItem,
  item = NON_EXIST_ITEM,
  isPlus = false,
  itemNumber = '',
}: TypeItemCard) => {
  const otherBtnToggleRef = useRef<HTMLDivElement>(null);
  const btnsContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const [onFocus, setOnfocus] = useState(false);

  const goToAddItemPage = () => {
    navigate('/addItem');
  };
  const onClickOtherBtn = () => {
    setOnfocus(!onFocus);
  };
  const onClickDeleteBtn = () => {
    deleteItem(itemNumber);
  };
  const onClickEditBtn = () => {
    navigate(`/${itemNumber}/editItem`, { state: { itemNumber, item } });
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
          <div className={styles.itemBox} onClick={goToAddItemPage}>
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
              <p className={styles.itemTitle}>{item.itemTitle}</p>
              <p className={styles.itemLv}>
                Lv제한 - {item.itemLv === 0 ? '없음' : item.itemLv}
              </p>
              <div className={styles.itemPrice}>
                <p className={styles.itemPriceText}>
                  비용 - {item.itemPrice}코인
                </p>
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
                  <div className={styles.btnBox} onClick={onClickEditBtn}>
                    <img src="/asset/update.png" alt="update" />
                    <span>수정</span>
                  </div>
                  <div className={styles.btnBox} onClick={onClickDeleteBtn}>
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
