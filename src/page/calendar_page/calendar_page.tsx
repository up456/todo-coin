import styles from './calendar_page.module.css';
import { useContext, useState } from 'react';

import Calendar from 'react-calendar';
import './Calendar.css';

import Header from '../../components/header/header';
import DayRecord from '../../components/day_record/day_record';
import { TypeData, UserIdContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import { changeDateToString } from '../../util/calc';
import UseTitle from '../../hook/useTitle';

interface TypeCalendarPage {
  data: TypeData;
}
const CalendarPage = ({ data }: TypeCalendarPage) => {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const titleUpdator = UseTitle(`달력`);
  const userId = useContext(UserIdContext);

  if (!userId) {
    navigate('/', { replace: false });
  }

  return (
    <section className={styles.calendarPage}>
      <Header data={data} />
      <div className={styles.calendarBox}>
        <Calendar onChange={setDate} value={date} />
      </div>
      <DayRecord data={data} date={changeDateToString(date)} />
    </section>
  );
};

export default CalendarPage;
