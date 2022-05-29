import styles from './non_existent_user.module.css';
import React, { useEffect, useState } from 'react';
import Button from '../button/button';
import { useNavigate } from 'react-router-dom';

const NonExistentUser = () => {
  const navigate = useNavigate();
  const [time, setTime] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);
    if (time <= 0) {
      clearInterval(timer);
      navigate('/');
    }
    return () => clearInterval(timer);
  });

  return (
    <div className={styles.offUser}>
      <p className={styles.title}>{`로그인 정보 없음`}</p>
      <p className={styles.description}>
        ( <span className={styles.timer}>{`${time}초`}</span> 뒤 자동으로
        로그인페이지로 이동됩니다. )
      </p>
      <Button text="로그인 페이지로 이동" onClick={() => navigate('/')} />
    </div>
  );
};

export default NonExistentUser;
