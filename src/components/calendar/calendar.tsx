import styles from './calendar.module.css';
import React from 'react';

const Calendar = ({
  setDate,
}: {
  setDate: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target) {
      setDate(event.target.value);
    }
  };

  return (
    <section className={styles.calendar}>
      <input type="date" onChange={onChange} />
    </section>
  );
};

export default Calendar;
