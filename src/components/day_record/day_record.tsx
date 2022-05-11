import styles from './day_record.module.css';
import React from 'react';
import Button from '../button/button';

const DayRecord = () => {
  const goToTodoList = () => {
    console.log('todo-list페이지로 이동');
  };
  return (
    <section className={styles.dayRecord}>
      <h5 className={styles.date}>▪2018년 2월 3일</h5>
      <div className={styles.dayInfoContainer}>
        <div className={styles.dayInfoBox}>
          <p className={styles.infoTitle}>성공률</p>
          <div className={styles.infoValue}>
            98 <span className={styles.percent}>%</span>
          </div>
        </div>
        <div className={styles.dayInfoBox}>
          <p className={styles.infoTitle}>만족도</p>
          <div className={styles.infoValue}>
            <div className={styles.starsBox}>
              <span className={styles.onStar}>⭐</span>
              <span className={styles.onStar}>⭐</span>
              <span className={styles.offStar}>★</span>
            </div>
          </div>
        </div>
        <div className={styles.dayInfoBox}>
          <p className={styles.infoTitle}>획득한 코인</p>
          <div className={styles.infoValue}>12</div>
        </div>
      </div>
      <Button text={'to-do 리스트 자세히 보기'} onClick={goToTodoList} />
    </section>
  );
};

export default DayRecord;
