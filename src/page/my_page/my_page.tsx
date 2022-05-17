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
  const onLogout = () => {
    authService.logout();
    navigate('/');
  };
  return (
    <section>
      <Header data={data} />
      <h1>마이 페이지입니다.</h1>
      <Button text="로그아웃" onClick={onLogout} />
    </section>
  );
};

export default MyPage;
