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
  imgName: '',
};

interface TypeItemCard {
  deleteItem?: (targetNumber: string) => void;
  buyItem?: (value: TypeItem) => void;
  deleteMyItem?: (targetNumber: string) => void;
  editMyInfo?: (coin: number, itemCount: number) => void;
  item?: TypeItem;
  isPlus?: boolean;
  itemNumber?: string;
  isMyItem?: boolean;
  myInfo?: { myLv: number; myCoin: number; myTotalItem: number };
}
export interface TypeEditItemState {
  state: {
    item: TypeItem;
    itemNumber: string;
  };
}

const ItemCard = ({
  deleteItem,
  buyItem,
  deleteMyItem,
  editMyInfo,
  item = NON_EXIST_ITEM,
  isPlus = false,
  itemNumber = '',
  isMyItem = false,
  myInfo = { myLv: 0, myCoin: 0, myTotalItem: 0 },
}: TypeItemCard) => {
  const titleRef = useRef<HTMLParagraphElement>(null);
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
    if (deleteItem) {
      deleteItem(itemNumber);
    }
  };
  const onClickEditBtn = () => {
    navigate(`/${itemNumber}/editItem`, { state: { itemNumber, item } });
  };
  const onClickBuyBtn = () => {
    const newCoin = myInfo.myCoin - item.itemPrice;

    if (item.itemLv <= myInfo.myLv && item.itemPrice <= myInfo.myCoin) {
      if (buyItem && editMyInfo && window.confirm('정말 구매하시겠습까?')) {
        editMyInfo(newCoin, ++myInfo.myTotalItem);
        buyItem(item);
      }
    } else if (item.itemLv <= myInfo.myLv) {
      alert(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  소지금이 ${-newCoin}coin 부족합니다~!
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    } else if (item.itemPrice <= myInfo.myCoin) {
      alert(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  레벨이 ${item.itemLv - myInfo.myLv}Lv 부족합니다~!
  아이템Lv: ${item.itemLv} > 현재Lv: ${myInfo.myLv}
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);
    } else {
      alert(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  소지금이 ${-newCoin}coin 부족합니다~!
  레벨이 ${item.itemLv - myInfo.myLv}Lv 부족합니다~!
  아이템Lv: ${item.itemLv} > 현재Lv: ${myInfo.myLv}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);
    }
  };
  const onClickUseBtn = () => {
    if (deleteMyItem && window.confirm('정말 사용하시겠습까?')) {
      deleteMyItem(itemNumber);
    }
  };
  const onClickTitle = () => {
    const current = titleRef.current;
    if (current && current.getBoundingClientRect().width >= 120) {
      current.classList.toggle(styles.ellipsis);
    }
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

  const getImgStyle = () => {
    if (item.imgUrl.includes('icon_list')) {
      return `${styles.itemImg} ${styles.iconCase}`;
    }
    return styles.itemImg;
  };
  const getTitleStyle = () => {
    if (item.itemTitle.length >= 10) {
      return `${styles.itemTitle} ${styles.ellipsis}`;
    } else {
      return `${styles.itemTitle} ${styles.default}`;
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
              <div className={styles.imgBox}>
                <div
                  className={getImgStyle()}
                  style={{ backgroundImage: `url(${item.imgUrl})` }}
                ></div>
              </div>
              <p
                ref={titleRef}
                className={getTitleStyle()}
                onClick={onClickTitle}
              >
                {item.itemTitle}
              </p>
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
                {isMyItem ? (
                  <Button
                    img="/asset/use.png"
                    text="사용하기"
                    onClick={onClickUseBtn}
                  />
                ) : (
                  <Button
                    img="/asset/cart.png"
                    text="구입하기"
                    onClick={onClickBuyBtn}
                  />
                )}
                {!isMyItem && (
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
                )}

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
