import styles from './add_category.module.css';
import React, { useState } from 'react';

const AddCategory = () => {
  const [onFocus, setOnFocus] = useState(false);
  const [categoryValue, setCategoryValue] = useState({
    name: '',
    color: '#ffffe0',
  });

  const toggleFocus = () => {
    setOnFocus(!onFocus);
  };
  const onChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    setCategoryValue((prevCategoryValue) => ({
      ...prevCategoryValue,
      [key]: event.target.value,
    }));
  };
  const onCreate = (event: React.MouseEvent) => {
    event.preventDefault();
  };

  return (
    <>
      <div className={`${styles.addCategory} ${styles.onFocus}`}>
        <button
          className={onFocus ? ` ${styles.hidden}` : styles.addCategoryBtn}
          onClick={toggleFocus}
        >
          카테고리 추가하기
        </button>
        <button
          className={
            onFocus
              ? `${styles.addCategoryBtn} ${styles.onFocus}`
              : `${styles.hidden}`
          }
          onClick={toggleFocus}
        >
          닫기 X
        </button>
        <form
          className={
            onFocus
              ? styles.addCategoryForm
              : `${styles.addCategoryForm} ${styles.hidden}`
          }
        >
          <input
            className={styles.input}
            type="text"
            onChange={(event) => onChange(event, 'name')}
            placeholder="카테고리 이름"
          />
          <input type="color" onChange={(event) => onChange(event, 'color')} />
          <button
            className={`${styles.addCategoryBtn} ${styles.onCreate}`}
            onClick={onCreate}
          >
            생성하기
          </button>
        </form>
      </div>
    </>
  );
};

export default AddCategory;
