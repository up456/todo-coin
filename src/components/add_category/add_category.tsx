import styles from './add_category.module.css';
import React, { useState } from 'react';
interface TypeAddCategory {
  addMyCategory: (newCategory: string) => void;
}

const AddCategory = ({ addMyCategory }: TypeAddCategory) => {
  const [onFocus, setOnFocus] = useState(false);
  const [categoryValue, setCategoryValue] = useState('');

  const toggleOnFocus = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setOnFocus(!onFocus);
    setCategoryValue('');
  };

  const onChangeCategoryValue = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCategoryValue((preValue) => event.target.value);
  };

  const plyaCreate = () => {
    addMyCategory(categoryValue);
    setCategoryValue('');
    setOnFocus(false);
  };
  const onClickCreate = (event: React.MouseEvent) => {
    event.preventDefault();
    plyaCreate();
  };
  const onKeyDownCreate = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      plyaCreate();
    }
  };
  return (
    <>
      <div className={`${styles.addCategory} ${styles.onFocus}`}>
        <button
          className={
            onFocus
              ? `${styles.addCategoryBtn} ${styles.hidden} ${styles.transLeft}`
              : styles.addCategoryBtn
          }
          onClick={toggleOnFocus}
        >
          카테고리 추가하기
        </button>

        <div
          className={
            onFocus
              ? `${styles.addCategoryForm} `
              : `${styles.addCategoryForm} ${styles.hidden} ${styles.transRight}`
          }
        >
          <button
            className={`${styles.addCategoryBtn} ${styles.onFocus}`}
            onClick={toggleOnFocus}
          >
            닫기 X
          </button>
          <input
            className={styles.input}
            value={categoryValue}
            type="text"
            onChange={onChangeCategoryValue}
            onKeyDown={onKeyDownCreate}
            placeholder="카테고리 이름"
          />
          <button
            className={`${styles.addCategoryBtn} ${styles.onCreate}`}
            onClick={onClickCreate}
          >
            추가
          </button>
        </div>
      </div>
    </>
  );
};

export default AddCategory;
