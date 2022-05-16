import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IDummy } from '../../App';
import Button from '../../components/button/button';
import Header from '../../components/header/header';
import SelectBox from '../../components/select_box/select_box';
import AuthService from '../../service/authService';
import { DEFAULT_CATEGORY, SORT_OPTION_LIST } from '../../util/constants';
import styles from './todo_page.module.css';

interface IHompPage {
  dummy: IDummy;
  authService: AuthService;
}
const TodoPage = ({ dummy, authService }: IHompPage) => {
  const navigate = useNavigate();
  const { date } = useParams();
  const [sort, setSort] = useState('dafault');

  const userId = sessionStorage.getItem('userId') || '';
  const userCategory = dummy[userId]?.myInfo.category || [];
  const categoryList = [...DEFAULT_CATEGORY, ...userCategory];

  return (
    <>
      <section className={styles.todoPage}>
        <Header dummy={dummy} />
        <div className={styles.todoContents}>
          <div className={styles.pageBtnContainer}>
            <Button text="달력 보기" onClick={() => navigate('/calendar')} />
            <Button
              text="할일 추가하기"
              onClick={() => navigate('/addTodo', { state: { date } })}
            />
          </div>
          <div className={styles.controlMenu}>
            <SelectBox
              value={sort}
              optionList={SORT_OPTION_LIST}
              onChange={(item) => {
                setSort(item);
              }}
            />
            <Button
              isToggle={true}
              text="전체"
              onClick={() => {
                console.log(`전체 클릭!`);
              }}
            />
            {categoryList.map((category, idx) => (
              <Button
                typeReverse={true}
                isToggle={true}
                key={idx}
                text={category}
                onClick={(event) => {
                  console.log(event.target);
                }}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default TodoPage;
