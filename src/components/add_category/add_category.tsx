import styles from './add_category.module.css';
import React, { useRef, useState } from 'react';
interface TypeAddCategory {
  addMyCategory: (newCategory: string) => void;
}

const AddCategory = ({ addMyCategory }: TypeAddCategory) => {
  const [onFocus, setOnFocus] = useState(false);
  const [categoryValue, setCategoryValue] = useState('');

  const toggleFocus = (event: React.MouseEvent) => {
    event.preventDefault();
    setOnFocus(!onFocus);
    setCategoryValue('');
  };
  const onChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    setCategoryValue(event.target.value);
  };
  const onClickCreate = (event: React.MouseEvent) => {
    event.preventDefault();
    addMyCategory(categoryValue);
    setCategoryValue('');
  };
  const onKeyDownCreate = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.key === 'Enter') {
      addMyCategory(categoryValue);
      setCategoryValue('');
      setOnFocus(false);
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
          onClick={toggleFocus}
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
            onClick={toggleFocus}
          >
            닫기 X
          </button>
          <input
            className={styles.input}
            value={categoryValue}
            type="text"
            onChange={(event) => onChange(event, 'name')}
            onKeyDown={onKeyDownCreate}
            placeholder="카테고리 이름"
          />
          {/* <input type="color" onChange={(event) => onChange(event, 'color')} /> */}
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
