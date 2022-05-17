import styles from './add_todo_page.module.css';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../components/button/button';

const AddTodoPage = () => {
  const navigate = useNavigate();
  const { date } = useParams();
  return (
    <section className={styles.addTodoPage}>
      <section className={styles.addTodoHeader}>
        <div className={styles.backArrow} onClick={() => navigate(-1)}>
          <img src="/asset/arrow_left.png" alt="arrow_left" />
        </div>
        <h2 className={styles.headerTitle}>{`${date} To-do 작성`}</h2>
      </section>
      <form className={styles.addTodoBody}>
        <div className={styles.inputBox}>
          <label className={styles.inputLable}>할일</label>
          <input type="text" className={styles.input} placeholder={'to-do'} />
        </div>
        <div className={styles.inputBox}>
          <label className={styles.inputLable}>보상 코인</label>
          <input
            type="number"
            className={styles.input}
            placeholder={'reward-coin'}
          />
        </div>
        <div className={styles.inputBox}>
          <label className={styles.inputLable}>보상 경험치</label>
          <input
            type="number"
            className={styles.input}
            placeholder={'reward-exp'}
          />
        </div>
        <div className={styles.inputBox}>
          <label className={styles.inputLable}>카테고리</label>
          <input
            type="text"
            className={styles.input}
            placeholder={'category'}
          />
        </div>
        <div className={styles.inputBox}>
          <label className={styles.inputLable}>데드라인</label>
          <input type="time" className={styles.input} />
        </div>
      </form>
      <section className={styles.addTodoFooter}>
        <Button text="작성하기" onClick={() => {}} />
      </section>
    </section>
  );
};

export default AddTodoPage;
