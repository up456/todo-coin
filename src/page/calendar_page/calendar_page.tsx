import styles from './calendar_page.module.css';
import { useContext, useState } from 'react';

import Header from '../../components/header/header';
import DayRecord from '../../components/day_record/day_record';
import { TypeData, UserIdContext } from '../../App';
import MyCalendar from '../../components/myCalendar/myCalendar';
import { useNavigate } from 'react-router-dom';
import { callToday } from '../../util/calc';

interface TypeCalendarPage {
  data: TypeData;
}
const CalendarPage = ({ data }: TypeCalendarPage) => {
  const navigate = useNavigate();
  const [date, setDate] = useState(callToday());

  const userId = useContext(UserIdContext);

  if (!userId) {
    navigate('/', { replace: false });
  }

  return (
    <section className={styles.calendarPage}>
      <Header data={data} />
      <MyCalendar setDate={setDate} />
      <DayRecord data={data} date={date} />
    </section>
  );
};

export default CalendarPage;
