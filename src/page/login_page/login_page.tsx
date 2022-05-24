import styles from './login_page.module.css';
import React, { useContext, useEffect } from 'react';
import Button from '../../components/button/button';
import AuthService from '../../service/authService';
import { useNavigate } from 'react-router-dom';
import { TypeRecord, UserIdContext } from '../../App';
import DbService from '../../service/dbService';

interface ILoginPage {
  authService: AuthService;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
  dbService: DbService;
  setData: React.Dispatch<
    React.SetStateAction<{
      myInfo: {
        lv: number;
        exp: number;
        coin: number;
        items: {}[];
        categoryRecord: string[];
      };
      record: TypeRecord;
      shop: {};
    }>
  >;
}
const LoginPage = ({
  authService,
  setUserId,
  dbService,
  setData,
}: ILoginPage) => {
  const navigate = useNavigate();

  const onClick = async () => {
    const userUid = await authService.login(setUserId);
    if (userUid) {
      const userList = await dbService.readData('userList');
      console.log(!userList);

      if (!userList) {
        dbService.createUser(userUid);
      }
      navigate(`/calendar`);
    }
  };
  const userId = useContext(UserIdContext);

  useEffect(() => {
    if (userId) navigate(`/calendar`);
  }, [userId, navigate]);

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
