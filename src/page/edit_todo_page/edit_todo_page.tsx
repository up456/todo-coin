import styles from './edit_todo_page.module.css';
import React, { useContext, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Button from '../../components/button/button';
import { TypeTodoList, UserIdContext } from '../../App';
import NonExistentUser from '../../components/non_existent_user/non_existent_user';
import { TypeEditTodoState } from '../../components/todo/todo';
import UseTitle from '../../hook/useTitle';
import AddCategory from '../../components/add_category/add_category';
import Datalist from '../../components/datalist/datalist';

interface TypeEditTodoPage {
  editTodo: (
    date: string,
    todoId: string,
    prevCategory: string,
    inputValue: TypeTodoList
  ) => void;
  addMyCategory: (newCategory: string) => void;
  myCategory: string[];
}

const EditTodoPage = ({
  editTodo,
  addMyCategory,
  myCategory,
}: TypeEditTodoPage) => {
  UseTitle('todo 수정');
  const navigate = useNavigate();
  const { date } = useParams();
  const todoRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLInputElement>(null);
  const { state } = useLocation() as TypeEditTodoState;
  const { todoId, prevTodo } = state;
  const PREVIOUS_INPUT_VALUE = {
    todo: prevTodo.todo,
    rewardExp: prevTodo.rewardExp,
    rewardCoin: prevTodo.rewardCoin,
    completeTime: prevTodo.completeTime,
    deadline: prevTodo.deadline,
    category: prevTodo.category,
    todoState: prevTodo.todoState,
  };
  const [inputValue, setInputValue] = useState(PREVIOUS_INPUT_VALUE);

  const userId = useContext(UserIdContext);
  if (!userId) return <NonExistentUser />;

  const onChangeValue = (
    event: React.ChangeEvent<HTMLInputElement>,
    inputKey: string
  ) => {
    setInputValue((prevInputValue) => {
      let value: string | number = event.target.value;
      if (inputKey === 'rewardCoin' || inputKey === 'rewardExp') {
        value = parseInt(value);
      }
      return { ...prevInputValue, [inputKey]: value };
    });
  };

  const onSubmit = () => {
    if (date) {
      if (inputValue.todo.length < 1) {
        todoRef.current?.focus();
        return;
      }
      if (!myCategory.includes(inputValue.category)) {
        alert(
          '없는 카테고리입니다. \n카테고리를 추가하거나 다른 카테고리를 선택하세요~!'
        );
        categoryRef.current?.focus();
        return;
      }
      if (inputValue.deadline === '') {
        inputValue.deadline = '23:59:59';
      }
      editTodo(date, todoId, prevTodo.category, inputValue);
      navigate(-1);
    }
  };

  return (
    <section className={styles.addTodoPage}>
      <section className={styles.addTodoHeader}>
        <div className={styles.backArrow} onClick={() => navigate(-1)}>
          <img src="/asset/arrow_left.png" alt="arrow_left" />
        </div>
        <h2 className={styles.headerTitle}>{`${date} To-do 수정`}</h2>
      </section>
      <form className={styles.addTodoBody}>
        <div className={styles.inputBox}>
          <label className={styles.inputLable}>할일</label>
          <input
            ref={todoRef}
            type="text"
            className={styles.input}
            placeholder={'to-do'}
            value={inputValue.todo}
            onChange={(event) => onChangeValue(event, 'todo')}
          />
        </div>
        <div className={styles.inputBox}>
          <label className={styles.inputLable}>보상 코인</label>
          <input
            type="number"
            className={styles.input}
            placeholder={'reward-coin'}
            value={inputValue.rewardCoin}
            min={0}
            onChange={(event) => onChangeValue(event, 'rewardCoin')}
          />
        </div>
        <div className={styles.inputBox}>
          <label className={styles.inputLable}>보상 경험치</label>
          <input
            type="number"
            className={styles.input}
            placeholder={'reward-exp'}
            value={inputValue.rewardExp}
            min={0}
            onChange={(event) => onChangeValue(event, 'rewardExp')}
          />
        </div>
        <div className={styles.inputBox}>
          <label className={styles.inputLable}>카테고리</label>
          <div className={styles.inputCategoryBox}>
            <input
              ref={categoryRef}
              list="category"
              type="text"
              className={`${styles.input} ${styles.categoryInput}`}
              placeholder={'category'}
              value={inputValue.category}
              onChange={(event) => onChangeValue(event, 'category')}
            />
            <div className={styles.addCategoryBox}>
              <AddCategory addMyCategory={addMyCategory} />
            </div>
            <Datalist inputId="category" opitons={myCategory} />
          </div>
        </div>
        <div className={styles.inputBox}>
          <label className={styles.inputLable}>데드라인</label>
          <input
            type="time"
            className={styles.input}
            value={
              inputValue.deadline === '23:59:59' ? '' : inputValue.deadline
            }
            onChange={(event) => onChangeValue(event, 'deadline')}
          />
        </div>
      </form>
      <section className={styles.addTodoFooter}>
        <Button text="수정하기" onClick={onSubmit} />
      </section>
    </section>
  );
};

export default EditTodoPage;
