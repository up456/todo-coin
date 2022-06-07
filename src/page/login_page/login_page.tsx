import styles from './login_page.module.css';
import React, { useContext, useEffect } from 'react';
import Button from '../../components/button/button';
import AuthService from '../../service/authService';
import { useNavigate } from 'react-router-dom';
import { UserIdContext } from '../../App';
import DbService from '../../service/dbService';
import UseTitle from '../../hook/useTitle';

interface ILoginPage {
  authService: AuthService;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
  dbService: DbService;
}
const LoginPage = ({ authService, setUserId, dbService }: ILoginPage) => {
  const titleUpdator = UseTitle('로그인 페이지');
  const navigate = useNavigate();
  const userId = useContext(UserIdContext);

  const onLogin = async (userUid: string) => {
    const userList = await dbService.readData('userList');
    // userList에 login한 유저의 uid가 없으면 새로운 유저 생성
    if (!Object.keys(userList).includes(userUid)) {
      dbService.createUser(userUid);
    }
    navigate(`/calendar`);
  };

  const onClickGoogleLoginBtn = async () => {
    const userUid = (await authService.googleLogin(setUserId)) || '';
    onLogin(userUid);
  };
  const onClickMasterLoginBtn = () => {
    const userUid = authService.masterLogin(setUserId);
    onLogin(userUid);
  };

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

      <Button text="Google Login" onClick={onClickGoogleLoginBtn} />
      <Button text="공용 계정으로 체험하기" onClick={onClickMasterLoginBtn} />
    </section>
  );
};

export default LoginPage;
