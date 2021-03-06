import styles from './add_todo_page.module.css';
import React, { useContext, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../components/button/button';
import { TypeTodoList, UserIdContext } from '../../App';
import NonExistentUser from '../../components/non_existent_user/non_existent_user';
import UseTitle from '../../hook/useTitle';
import Datalist from '../../components/datalist/datalist';
import AddCategory from '../../components/add_category/add_category';

const DEFAULT_INPUT_VALUE = {
  todo: '',
  rewardExp: 0,
  rewardCoin: 0,
  completeTime: '',
  deadline: '',
  category: '',
  todoState: 'ing',
};
interface TypeAddTodoPage {
  addTodo: (date: string, inputValue: TypeTodoList) => void;
  addMyCategory: (newCategory: string) => void;
  myCategory: string[];
}

const AddTodoPage = ({
  addTodo,
  addMyCategory,
  myCategory,
}: TypeAddTodoPage) => {
  UseTitle('todo 작성');
  const navigate = useNavigate();
  const { date } = useParams();
  const todoRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState(DEFAULT_INPUT_VALUE);

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
      addTodo(date, inputValue);
      navigate(-1);
    }
  };

  return (
    <section className={styles.addTodoPage}>
      <section className={styles.addTodoHeader}>
        <div className={styles.backArrow} onClick={() => navigate(-1)}>
          <img src="/asset/arrow_left.png" alt="arrow_left" />
        </div>
        <h2 className={styles.headerTitle}>{`${date} To-do 작성`}</h2>
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
          </div>
          <Datalist inputId="category" opitons={myCategory} />
        </div>
        <div className={styles.inputBox}>
          <label className={styles.inputLable}>데드라인</label>
          <input
            type="time"
            className={styles.input}
            value={inputValue.deadline}
            onChange={(event) => onChangeValue(event, 'deadline')}
          />
        </div>
      </form>
      <section className={styles.addTodoFooter}>
        <Button text="작성하기" onClick={onSubmit} />
      </section>
    </section>
  );
};

export default AddTodoPage;
