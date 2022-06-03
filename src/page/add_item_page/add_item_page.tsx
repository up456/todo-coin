import styles from './add_item_page.module.css';
import React, { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/button/button';
import { TypeItem, UserIdContext } from '../../App';
import NonExistentUser from '../../components/non_existent_user/non_existent_user';

const DEFAULT_INPUT_VALUE = {
  itemTitle: '',
  itemLv: 0,
  itemPrice: 0,
  imgUrl: '',
};

interface TypeAddItemPage {
  addItem: (value: TypeItem) => void;
}

const AddItemPage = ({ addItem }: TypeAddItemPage) => {
  const navigate = useNavigate();
  const itemRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState(DEFAULT_INPUT_VALUE);

  const userId = useContext(UserIdContext);
  if (!userId) return <NonExistentUser />;

  const onChangeValue = (
    event: React.ChangeEvent<HTMLInputElement>,
    inputKey: string
  ) => {
    setInputValue((prevInputValue) => {
      let value: string | number = event.target.value;
      if (inputKey === 'itemLv' || inputKey === 'itemPrice') {
        value = parseInt(value);
      }
      return { ...prevInputValue, [inputKey]: value };
    });
  };

  const onSubmit = () => {
    if (inputValue.itemTitle.length < 1) {
      return itemRef.current?.focus();
    }
    addItem(inputValue);
    navigate(-1);
  };

  return (
    <section className={styles.addItemPage}>
      <section className={styles.addItemHeader}>
        <div className={styles.backArrow} onClick={() => navigate(-1)}>
          <img src="/asset/arrow_left.png" alt="arrow_left" />
        </div>
        <h2 className={styles.headerTitle}>{`아이템 제작`}</h2>
      </section>
      <form className={styles.addItemBody}>
        <div className={styles.inputBox}>
          <label className={styles.inputLable}>아이템 이름</label>
          <input
            ref={itemRef}
            type="text"
            className={styles.input}
            placeholder={'to-do'}
            value={inputValue.itemTitle}
            onChange={(event) => onChangeValue(event, 'itemTitle')}
          />
        </div>
        <div className={styles.inputBox}>
          <label className={styles.inputLable}>레벨 제한</label>
          <input
            type="number"
            className={styles.input}
            value={inputValue.itemLv}
            min={0}
            onChange={(event) => onChangeValue(event, 'itemLv')}
          />
        </div>
        <div className={styles.inputBox}>
          <label className={styles.inputLable}>아이템 비용</label>
          <input
            type="number"
            className={styles.input}
            value={inputValue.itemPrice}
            min={0}
            onChange={(event) => onChangeValue(event, 'itemPrice')}
          />
        </div>
        <div className={styles.inputBox}>
          <label className={styles.inputLable}>이미지</label>
          <input
            type="text"
            className={styles.input}
            placeholder={'imgUrl'}
            value={inputValue.imgUrl}
            onChange={(event) => onChangeValue(event, 'imgUrl')}
          />
        </div>
      </form>
      <section className={styles.addItemFooter}>
        <Button text="제작하기" onClick={onSubmit} />
      </section>
    </section>
  );
};

export default AddItemPage;
