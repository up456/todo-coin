import styles from './add_category.module.css';
import React, { useState } from 'react';

const AddCategory = () => {
  const [onFocus, setOnFocus] = useState(false);
  const [categoryValue, setCategoryValue] = useState('');

  const toggleFocus = (event: React.MouseEvent) => {
    event.preventDefault();
    setOnFocus(!onFocus);
  };
  const onChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    setCategoryValue(event.target.value);
  };
  const onCreate = (event: React.MouseEvent) => {
    event.preventDefault();
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

        <form
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
            type="text"
            onChange={(event) => onChange(event, 'name')}
            placeholder="카테고리 이름"
          />
          {/* <input type="color" onChange={(event) => onChange(event, 'color')} /> */}
          <button
            className={`${styles.addCategoryBtn} ${styles.onCreate}`}
            onClick={onCreate}
          >
            추가
          </button>
        </form>
      </div>
    </>
  );
};

export default AddCategory;
