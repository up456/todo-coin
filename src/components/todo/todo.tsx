import styles from './todo.module.css';
import React, { useCallback, useContext, useState } from 'react';
import { TypeChangeTodoState, TypeTodoList, UserIdContext } from '../../App';
import { transClockTo12 } from '../../util/calc';
import Line from '../line/line';
import { useNavigate } from 'react-router-dom';

// constants
const TODO_STATE_LIST = ['ing', 'complete', 'fail'];

// 타입
interface TypeTodo {
  todo: TypeTodoList;
  date: string;
  changeTodoState: TypeChangeTodoState;
  todoId: string;
  isBtnPossible: boolean;
  deleteTodo: (date: string, todoId: string) => void;
}

export interface TypeEditTodoState {
  state: {
    todoId: string;
    prevTodo: TypeTodoList;
  };
}

// 컴포넌트
const Todo = ({
  todo,
  date,
  changeTodoState,
  todoId,
  isBtnPossible,
  deleteTodo,
}: TypeTodo) => {
  const [todoState, setTodoState] = useState(todo.todoState);
  const [onFocus, setOnFocus] = useState(false);
  const deadLine = transClockTo12(todo.deadline);
  const userId = useContext(UserIdContext);
  const navigate = useNavigate();

  const transTodoState = useCallback(
    (selectedState: string) => {
      setTodoState(selectedState);
      if (!userId) return;
      changeTodoState(date, todoId, selectedState);
    },
    [changeTodoState, date, todoId, userId]
  );

  const onDelete = useCallback(() => {
    deleteTodo(date, todoId);
  }, [date, deleteTodo, todoId]);

  const onEdit = useCallback(() => {
    navigate(`/${date}/editTodo`, {
      state: { todoId, prevTodo: todo },
    });
  }, [date, navigate, todo, todoId]);
  return (
    <li className={getTodoStyle(todoState)}>
      <div className={styles.todoHeader}>
        <p className={styles.deadLine}>{`데드라인: ${deadLine || '없음'}`}</p>
        {isBtnPossible && todoState !== 'complete' && (
          <>
            <div className={styles.iconBox} onClick={onEdit}>
              <img
                className={styles.iconImg}
                src="/asset/update.png"
                alt="update"
              />
            </div>
            <div className={styles.iconBox} onClick={onDelete}>
              <img
                className={styles.iconImg}
                src="/asset/delete.png"
                alt="delete"
              />
            </div>
          </>
        )}
        <p className={styles.category}>{todo.category || '미지정'}</p>
      </div>
      <Line mT="0" />
      <div className={styles.todoBody}>
        <div
          className={
            onFocus ? `${styles.todoState} ${styles.onFocus}` : styles.todoState
          }
        >
          <div
            className={
              isBtnPossible
                ? onFocus
                  ? `${styles.todoStateIcon} ${styles.onFocus}`
                  : styles.todoStateIcon
                : `${styles.todoStateIcon} ${styles.notClick}`
            }
            onClick={() => setOnFocus(!onFocus)}
          >
            <img
              src={`/asset/${todoState}.png`}
              alt={todoState}
              className={styles.notClick}
            />
            {TODO_STATE_LIST.filter((state) => state !== todoState).map(
              (imageName, idx) => (
                <img
                  key={idx}
                  src={`/asset/${imageName}.png`}
                  alt={imageName}
                  onClick={() => transTodoState(imageName)}
                />
              )
            )}
          </div>
        </div>
        <div className={styles.todoDescription}>
          <p className={styles.title}>{todo.todo}</p>
          <div className={styles.rewardContainer}>
            <div className={styles.rewardBox}>
              <img
                className={styles.rewardIcon}
                src="/asset/coin.svg"
                alt="코인"
              />
              <div className={styles.rewardValue}>{todo.rewardCoin}</div>
            </div>
            <div className={styles.rewardBox}>
              <img
                className={`${styles.rewardIcon} ${styles.expIcon}`}
                src="/asset/jewelry.svg"
                alt="경험치"
              />
              <div className={styles.rewardValue}>{todo.rewardExp}</div>
            </div>
          </div>
        </div>
        <div className={styles.completeBox}>
          <p className={styles.completeText}>완료시간</p>
          <p className={styles.completeTime}>
            {todo.completeTime ? todo.completeTime : '미완료'}
          </p>
        </div>
      </div>
      <div
        className={
          todoState === 'fail'
            ? styles.resultFail
            : `${styles.resultFail} ${styles.hidden}`
        }
      ></div>
      <div
        className={
          todoState === 'complete'
            ? styles.resultComplete
            : `${styles.resultComplete} ${styles.hidden}`
        }
      ></div>
    </li>
  );
};

export default React.memo(Todo);

function getTodoStyle(todoState: string) {
  let todoStyle: string;
  switch (todoState) {
    case 'complete':
      todoStyle = `${styles.todo} ${styles.complete}`;
      break;
    case 'fail':
      todoStyle = `${styles.todo} ${styles.fail}`;
      break;
    default:
      todoStyle = `${styles.todo}`;
  }
  return todoStyle;
}
