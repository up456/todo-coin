import React from 'react';
import styles from './home_page.module.css';

import Header from '../../components/header/header';

const HomePage = () => (
  <section className={styles.homePage}>
    <Header />
  </section>
);

export default HomePage;
