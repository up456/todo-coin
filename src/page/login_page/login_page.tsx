import styles from './login_page.module.css';
import React, { useEffect } from 'react';
import Button from '../../components/button/button';
import AuthService from '../../service/authService';
import { useNavigate } from 'react-router-dom';

interface ILoginPage {
  authService: AuthService;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
}
const LoginPage = ({ authService, setUserId }: ILoginPage) => {
  const navigate = useNavigate();

  const onClick = async () => {
    await authService.login(setUserId);
    navigate(`/calendar`);
  };

  useEffect(() => {
    const userId = sessionStorage.getItem('userId');
    if (userId) navigate(`/calendar`);
  }, []);

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

      <Button text="Google Login" onClick={onClick} />
    </section>
  );
};

export default LoginPage;
