import styles from './calendar_page.module.css';
import React from 'react';
import Header from '../../components/header/header';
import DayRecord from '../../components/day_record/day_record';

const CalendarPage = () => (
  <section className={styles.calendar}>
    <Header />
    <div style={{ textAlign: 'center' }}>달력</div>
    <DayRecord />
  </section>
);

export default CalendarPage;
