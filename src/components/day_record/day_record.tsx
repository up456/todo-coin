import styles from './day_record.module.css';
import React from 'react';
import Button from '../button/button';
import { TypeData } from '../../App';
import StarsBox from '../stars_box/stars_box';
import { useNavigate } from 'react-router-dom';
import { isDayAfterTodayOrToday } from '../../util/calc';

interface IDayRecord {
  data: TypeData;
  date: string;
}
const DayRecord = ({ data, date }: IDayRecord) => {
  const navigate = useNavigate();
  const goToTodoList = () => {
    navigate(`/todo/${date}`, { state: { date: date } });
  };
  const dateObj = new Date(date);
  const recordData = data?.record?.date;

  return (
    <section className={styles.dayRecord}>
      <h5 className={styles.date}>{`▪${dateObj.getFullYear()}년 ${
        dateObj.getMonth() + 1
      }월 ${dateObj.getDate()}일`}</h5>

      {recordData ? (
        <>
          <div className={styles.dayInfoContainer}>
            <div className={styles.dayInfoBox}>
              <p className={styles.infoTitle}>성공률</p>
              <div className={styles.infoValue}>
                {`${recordData.percent}`}{' '}
                <span className={styles.percent}>%</span>
              </div>
            </div>
            <div className={styles.dayInfoBox}>
              <p className={styles.infoTitle}>만족도</p>
              <div className={styles.infoValue}>
                <StarsBox satisfaction={recordData.satisfaction} />
              </div>
            </div>
            <div className={styles.dayInfoBox}>
              <p className={styles.infoTitle}>획득한 코인</p>
              <div className={styles.infoValue}>{recordData.acquiredCoin}</div>
            </div>
          </div>
          <Button text={'to-do 리스트 자세히 보기'} onClick={goToTodoList} />
        </>
      ) : isDayAfterTodayOrToday(date) ? (
        <div className={styles.createTodoBox}>
          <Button text={'to-do 리스트 작성하기'} onClick={goToTodoList} />
        </div>
      ) : (
        <p className={styles.noData}>저장된 기록이 없습니다.</p>
      )}
    </section>
  );
};

export default DayRecord;
