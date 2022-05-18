import React, { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TypeData, TypeChangeTodoState, UserIdContext } from '../../App';
import Button from '../../components/button/button';
import Header from '../../components/header/header';
import Line from '../../components/line/line';
import SelectBox from '../../components/select_box/select_box';
import Todo from '../../components/todo/todo';
import styles from './todo_page.module.css';

// constants
const SORT_OPTION_LIST = [
  { text: '등록 순', value: 'default' },
  { text: '데드라인 순', value: 'time' },
];

// 타입
interface TypeHompPage {
  data: TypeData;
  changeTodoState: TypeChangeTodoState;
}

// 컴포넌트
const TodoPage = ({ data, changeTodoState }: TypeHompPage) => {
  const navigate = useNavigate();
  const [sort, setSort] = useState('dafault');
  const { date } = useParams();
  const dateData = date || '';

  const userId = useContext(UserIdContext);
  const categoryList = data[userId]?.record[dateData]?.categoryList || [];
  const todoListData = data[userId]?.record[dateData]?.todoList;

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
                onClick={() => navigate(`/${date}/addTodo`)}
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
              {Array.from(categoryList).map((category, idx) => (
                <Button
                  typeReverse={true}
                  isToggle={true}
                  key={idx}
                  text={category || '미지정'}
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
              Object.keys(todoListData).map((key) => (
                <Todo
                  key={key}
                  todo={todoListData[key]}
                  changeTodoState={changeTodoState}
                  date={dateData}
                  todoId={key}
                />
              ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default TodoPage;
