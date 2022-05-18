import styles from './my_page.module.css';
import React from 'react';
import Button from '../../components/button/button';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/header';
import { TypeData } from '../../App';
import AuthService from '../../service/authService';

interface TypeMyPage {
  data: TypeData;
  authService: AuthService;
}
const MyPage = ({ data, authService }: TypeMyPage) => {
  const navigate = useNavigate();
  const userId = sessionStorage.getItem('userId') || '';
  const onLogout = () => {
    authService.logout();
    navigate('/');
    window.location.reload();
  };

  const categoryRecord = Array.from(data[userId].myInfo.categoryRecord);

  return (
    <section className={styles.myPage}>
      <Header data={data} />
      <h1>마이 페이지입니다.</h1>
      <h2>나의 카테고리</h2>
      {categoryRecord.map((category, idx) => (
        <p key={idx}>{category}</p>
      ))}
      <Button text="로그아웃" onClick={onLogout} />
    </section>
  );
};

export default MyPage;
