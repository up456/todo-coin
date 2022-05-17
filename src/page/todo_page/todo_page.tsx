import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { TypeData } from '../../App';
import Button from '../../components/button/button';
import Header from '../../components/header/header';
import Line from '../../components/line/line';
import SelectBox from '../../components/select_box/select_box';
import Todo from '../../components/todo/todo';
import styles from './todo_page.module.css';

// constants
const DEFAULT_CATEGORY = ['운동', '취미', '공부'];

const SORT_OPTION_LIST = [
  { text: '등록 순', value: 'default' },
  { text: '데드라인 순', value: 'time' },
];

// 타입
interface TypeHompPage {
  data: TypeData;
  setCompleteTime: (
    userId: string,
    date: string,
    targetTodoId: number,
    reset?: boolean
  ) => void;
}

// 컴포넌트
const TodoPage = ({ data, setCompleteTime }: TypeHompPage) => {
  const navigate = useNavigate();
  const [sort, setSort] = useState('dafault');
  const { date } = useParams();
  const dateData = date || '';

  const userId = sessionStorage.getItem('userId') || '';
  const userCategory = data[userId]?.myInfo.category || [];
  const categoryList = [...DEFAULT_CATEGORY, ...userCategory];

  const todoListData = data[userId].record[dateData];

  return (
    <>
      <section className={styles.todoPage}>
        <Header data={data} />
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
                <Todo
                  key={idx}
                  todo={todo}
                  setCompleteTime={setCompleteTime}
                  date={dateData}
                />
              ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default TodoPage;
