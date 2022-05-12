import styles from './calendar_page.module.css';
import React, { useState } from 'react';

import Header from '../../components/header/header';
import DayRecord from '../../components/day_record/day_record';
import { IDummy } from '../../App';
import Calendar from '../../components/calendar/calendar';

const CalendarPage = ({ dummy }: { dummy: IDummy }) => {
  const [date, setDate] = useState('2022-05-13');

  return (
    <section className={styles.calendarPage}>
      <Header dummy={dummy} />
      <Calendar setDate={setDate} />
      <DayRecord data={dummy} date={date} />
    </section>
  );
};

export default CalendarPage;
