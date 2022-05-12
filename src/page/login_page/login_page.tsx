import styles from './login_page.module.css';
import React from 'react';
import Button from '../../components/button/button';

const LoginPage = () => {
  return (
    <section className={styles.loginPage}>
      <div className={styles.logoContainer}>
        <img className={styles.logoIcon} src="/asset/jewelry.svg" alt="보석" />
        <p className={styles.logoTitle}>To-do Coin</p>
      </div>
      <div className={styles.loginTextContainer}>
        <p className={styles.mainText}>Login</p>
        <p className={styles.subText}>Welcome to To-do Coin</p>
      </div>

      <Button text="Google Login" onClick={() => {}} />
    </section>
  );
};

export default LoginPage;
