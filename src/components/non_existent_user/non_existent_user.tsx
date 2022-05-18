import styles from './non_existent_user.module.css';
import React from 'react';
import Button from '../button/button';
import { useNavigate } from 'react-router-dom';

const NonExistentUser = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.offUser}>
      <p>{'로그인 정보 없음'}</p>
      <Button text="로그인 페이지로 이동" onClick={() => navigate('/')} />
    </div>
  );
};

export default NonExistentUser;
