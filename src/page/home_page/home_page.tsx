import React from 'react';
import styles from './home_page.module.css';

import Header from '../../components/header/header';
import DayRecord from '../../components/day_record/day_record';

const HomePage = () => (
  <section className={styles.homePage}>
    <Header />
    <div style={{ textAlign: 'center' }}>달력</div>
    <DayRecord />
  </section>
);

export default HomePage;
