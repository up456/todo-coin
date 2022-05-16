import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { IDummy } from '../../App';
import Button from '../../components/button/button';
import Header from '../../components/header/header';
import Line from '../../components/line/line';
import SelectBox from '../../components/select_box/select_box';
import Todo from '../../components/todo/todo';
import AuthService from '../../service/authService';
import styles from './todo_page.module.css';

// constants
const DEFAULT_CATEGORY = ['운동', '취미', '공부'];

const SORT_OPTION_LIST = [
  { text: '등록 순', value: 'default' },
  { text: '데드라인 순', value: 'time' },
];

// 타입
interface IHompPage {
  dummy: IDummy;
  authService: AuthService;
}

// 컴포넌트
const TodoPage = ({ dummy, authService }: IHompPage) => {
  const navigate = useNavigate();
  const [sort, setSort] = useState('dafault');
  const { date } = useParams();
  const dateData = date || '';

  const userId = sessionStorage.getItem('userId') || '';
  const userCategory = dummy[userId]?.myInfo.category || [];
  const categoryList = [...DEFAULT_CATEGORY, ...userCategory];

  const todoListData = dummy[userId].record[dateData];

  return (
    <>
      <section className={styles.todoPage}>
        <Header dummy={dummy} />
        <div className={styles.todoContent}>
          <section className={styles.contentHeader}>
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
          </section>
          <Line />
          <ul className={styles.todoList}>
            {todoListData &&
              todoListData.todoList.map((todo, idx) => (
                <Todo key={idx} todo={todo} />
              ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default TodoPage;
