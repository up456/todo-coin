import styles from './todo.module.css';
import React, { useState } from 'react';
import { TypeTodoList } from '../../App';
import { transClockTo12 } from '../../util/calc';
import SelectBox from '../select_box/select_box';
import Line from '../line/line';

// constants
const TODO_STATE_OPTION_LIST = [
  { text: '진행중', value: 'ing' },
  { text: '완료', value: 'complete' },
  { text: '실패', value: 'fail' },
];
const TODO_STATE_LIST = ['ing', 'complete', 'fail'];

console.log();

// 타입
interface TypeTodo {
  todo: TypeTodoList;
}

// 컴포넌트
const Todo = ({ todo }: TypeTodo) => {
  const [todoState, setTodoState] = useState('ing');
  const [onFocus, setOnFocus] = useState(false);
  const deadLine = transClockTo12(todo.deadline);
  return (
    <li className={styles.todo}>
      <div className={styles.todoHeader}>
        <p className={styles.deadLine}>{`데드라인: ${deadLine || '없음'}`}</p>
        <p className={styles.category}>{todo.category}</p>
      </div>
      <Line mT="0" />
      <div className={styles.todoBody}>
        <div
          className={
            onFocus ? `${styles.todoState} ${styles.onFocus}` : styles.todoState
          }
        >
          <SelectBox
            value={todoState}
            onChange={setTodoState}
            optionList={TODO_STATE_OPTION_LIST}
          />
          <div
            className={
              onFocus
                ? `${styles.todoStateIcon} ${styles.onFocus}`
                : styles.todoStateIcon
            }
            onClick={() => setOnFocus(!onFocus)}
          >
            <img src={`/asset/${todoState}.png`} alt={todoState} />
            {TODO_STATE_LIST.filter((state) => state !== todoState).map(
              (imageName, idx) => (
                <img
                  key={idx}
                  src={`/asset/${imageName}.png`}
                  alt={imageName}
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
            {todo.completeTime ? transClockTo12(todo.completeTime) : '미완료'}
          </p>
        </div>
      </div>
    </li>
  );
};

export default Todo;
