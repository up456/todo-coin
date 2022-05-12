import React from 'react';
import styles from './app.module.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TodoPage from './page/todo_page/todo_page';
import CalendarPage from './page/calendar_page/calendar_page';
import MyPage from './page/my_page/my_page';
import LoginPage from './page/login_page/login_page';

export interface TypeTodoList {
  todo: string;
  rewardExp: number;
  rewardCoin: number;
  isCompletion: boolean;
}
export interface TypeRecord {
  [key: string]: {
    toDoList: TypeTodoList[];
    percent: number;
    acquiredCoin: number;
    satisfaction: number;
  };
}
export interface IDummy {
  [key: number]: {
    myInfo: {
      lv: number;
      exp: number;
      coin: number;
      items: never[];
    };
    record: TypeRecord;
    shop: {};
  };
}
const dummy: IDummy = {
  1: {
    myInfo: {
      lv: 1,
      exp: 2,
      coin: 20,
      items: [],
    },
    record: {
      '2022-05-11': {
        toDoList: [
          {
            todo: '개 밥주기',
            rewardExp: 3,
            rewardCoin: 2,
            isCompletion: true,
          },
          {
            todo: '운동하기',
            rewardExp: 2,
            rewardCoin: 1,
            isCompletion: true,
          },
          {
            todo: '개 산책',
            rewardExp: 1,
            rewardCoin: 3,
            isCompletion: false,
          },
        ],
        percent: 30,
        acquiredCoin: 2,
        satisfaction: 2,
      },
      '2022-05-12': {
        toDoList: [
          {
            todo: '계획짜기',
            rewardExp: 3,
            rewardCoin: 2,
            isCompletion: true,
          },
          {
            todo: '산책가기',
            rewardExp: 3,
            rewardCoin: 2,
            isCompletion: false,
          },
        ],
        percent: 90,
        acquiredCoin: 12,
        satisfaction: 3,
      },
    },
    shop: {},
  },
};

function App() {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/todo" element={<TodoPage />} />
          <Route path="/calendar" element={<CalendarPage dummy={dummy} />} />
          <Route path="/my" element={<MyPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
