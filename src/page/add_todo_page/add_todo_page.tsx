import styles from './add_todo_page.module.css';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

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
    </section>
  );
};

export default AddTodoPage;
