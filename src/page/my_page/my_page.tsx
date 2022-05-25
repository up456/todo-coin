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
  setUserId: React.Dispatch<React.SetStateAction<string>>;
}
const MyPage = ({ data, authService, setUserId }: TypeMyPage) => {
  const navigate = useNavigate();
  const onLogout = () => {
    authService.logout(setUserId);
    navigate('/');
    window.location.reload();
  };

  const cate = data?.myInfo?.categoryRecord || [];
  const categoryRecord = Array.from(cate);
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
