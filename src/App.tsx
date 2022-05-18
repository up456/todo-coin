import React, { useState } from 'react';
import styles from './app.module.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TodoPage from './page/todo_page/todo_page';
import CalendarPage from './page/calendar_page/calendar_page';
import MyPage from './page/my_page/my_page';
import LoginPage from './page/login_page/login_page';
import AuthService from './service/authService';
import AddTodoPage from './page/add_todo_page/add_todo_page';

export interface TypeTodoList {
  todo: string;
  rewardExp: number;
  rewardCoin: number;
  completeTime: string;
  deadline: string;
  category: string;
  todoState: string;
}
export interface TypeRecord {
  [date: string]: {
    todoList: { [todoId: string]: TypeTodoList };
    categoryList: Set<string>;
    percent: number;
    acquiredCoin: number;
    satisfaction: number;
  };
}
export interface TypeData {
  [id: string]: {
    myInfo: {
      lv: number;
      exp: number;
      coin: number;
      items: {}[];
      categoryRecord: Set<string>;
    };
    record: TypeRecord;
    shop: {};
  };
}
const dummy: TypeData = {
  UJfZT67ctBTaTp5y3otcU94xEYH2: {
    myInfo: {
      lv: 1,
      exp: 2,
      coin: 20,
      items: [],
      categoryRecord: new Set(['펫', '공부', '취미', '운동']),
    },
    record: {
      '2022-05-11': {
        categoryList: new Set(['펫', '운동']),
        todoList: {
          1652765828908: {
            todo: '개 밥주기',
            rewardExp: 3,
            rewardCoin: 2,
            completeTime: '오후 1:45:28',
            deadline: '07:30',
            category: '펫',
            todoState: 'complete',
          },
          1652765828910: {
            todo: '운동하기',
            rewardExp: 2,
            rewardCoin: 1,
            completeTime: '',
            deadline: '06:30',
            category: '운동',
            todoState: 'fail',
          },
          1652765828913: {
            todo: '개 산책',
            rewardExp: 1,
            rewardCoin: 3,
            completeTime: '',
            deadline: '14:30',
            category: '펫',
            todoState: 'ing',
          },
        },
        percent: 30,
        acquiredCoin: 2,
        satisfaction: 2,
      },
      '2022-05-12': {
        categoryList: new Set(['공부', '취미']),
        todoList: {
          1652765828923: {
            todo: '계획짜기',
            rewardExp: 3,
            rewardCoin: 2,
            completeTime: '',
            deadline: '',
            category: '공부',
            todoState: 'complete',
          },
          1652765828933: {
            todo: '산책가기',
            rewardExp: 3,
            rewardCoin: 2,
            completeTime: '',
            deadline: '23:30',
            category: '취미',
            todoState: 'ing',
          },
        },
        percent: 90,
        acquiredCoin: 12,
        satisfaction: 3,
      },
    },
    shop: {},
  },
};

const authService = new AuthService();

export type TypeChangeTodoState = (
  date: string,
  targetTodoId: string,
  todoState: string
) => void;

function App() {
  const [data, setData] = useState(dummy);
  const [userId, setUserId] = useState('');

  const changeTodoState: TypeChangeTodoState = (
    date,
    targetTodoId,
    todoState
  ) => {
    setData((prevData) => {
      const newData = {
        ...prevData,
      };
      const targetTodo = newData[userId]?.record[date]?.todoList[targetTodoId];

      if (targetTodo) {
        switch (todoState) {
          case 'complete':
            targetTodo.completeTime = new Date().toLocaleTimeString();
            targetTodo.todoState = 'complete';
            break;
          case 'fail':
            targetTodo.completeTime = '';
            targetTodo.todoState = 'fail';
            break;
          case 'ing':
            targetTodo.completeTime = '';
            targetTodo.todoState = 'ing';
            break;
          default:
            throw new Error(`없는 상태입니다 ${todoState} `);
        }
      }
      return newData;
    });
  };

  const addTodo = (date: string, inputValue: TypeTodoList) => {
    setData((prevData) => {
      let newData = {
        ...prevData,
      };
      // 해당 날짜의 기록을 넣는 칸이 없으면 해당 날짜로 빈공간 생성
      let recordDate = newData[userId]?.record[date];
      if (!recordDate) {
        newData[userId].record[date] = {
          todoList: {},
          categoryList: new Set([]),
          percent: 0,
          acquiredCoin: 0,
          satisfaction: 0,
        };
      }
      // todo 추가
      const todoList = recordDate.todoList;
      const todoId = Date.now();
      todoList[todoId] = inputValue;
      // 당일 카테고리 추가
      const categoryList = recordDate.categoryList;
      categoryList.add(inputValue.category);
      // 나의 카테고리 목록 추가
      const categoryRecord = newData[userId].myInfo.categoryRecord;
      categoryRecord.add(inputValue.category);

      return newData;
    });
  };

  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <LoginPage authService={authService} setUserId={setUserId} />
            }
          />
          <Route
            path="/todo/:date"
            element={<TodoPage data={data} changeTodoState={changeTodoState} />}
          />
          <Route
            path="/:date/addTodo"
            element={<AddTodoPage addTodo={addTodo} />}
          />
          <Route path="/calendar" element={<CalendarPage data={data} />} />
          <Route
            path="/mypage"
            element={<MyPage data={data} authService={authService} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
