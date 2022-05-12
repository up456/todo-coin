import styles from './calendar_page.module.css';
import React from 'react';
import Header from '../../components/header/header';
import DayRecord from '../../components/day_record/day_record';

const dummy = {
  1: {
    '2022-05-11': {
      toDoList: [],
      percent: 30,
      acquiredCoin: 2,
      satisfaction: 1,
    },
    '2022-05-12': {
      toDoList: [],
      percent: 90,
      acquiredCoin: 12,
      satisfaction: 3,
    },
  },
};

const CalendarPage = () => (
  <section className={styles.calendar}>
    <Header />
    <div style={{ textAlign: 'center' }}>달력</div>
    <DayRecord />
  </section>
);

export default CalendarPage;
