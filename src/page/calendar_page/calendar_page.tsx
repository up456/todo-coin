import styles from './calendar_page.module.css';
import { useContext, useEffect, useState } from 'react';

import Header from '../../components/header/header';
import DayRecord from '../../components/day_record/day_record';
import { IDummy } from '../../App';
import Calendar from '../../components/calendar/calendar';
import AuthService from '../../service/authService';
import { useNavigate } from 'react-router-dom';
import { callToday } from '../../util/calc';

interface ICalendarPage {
  dummy: IDummy;
}
const CalendarPage = ({ dummy }: ICalendarPage) => {
  const navigate = useNavigate();
  const [date, setDate] = useState(callToday());

  const userId = sessionStorage.getItem('userId');

  if (!userId) {
    navigate('/', { replace: false });
  }

  return (
    <section className={styles.calendarPage}>
      <Header dummy={dummy} />
      <Calendar setDate={setDate} />
      <DayRecord data={dummy} date={date} />
    </section>
  );
};

export default CalendarPage;
