import React, { useContext, useState } from 'react';
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
}
export interface TypeRecord {
  [date: string]: {
    todoList: TypeTodoList[];
    percent: number;
    acquiredCoin: number;
    satisfaction: number;
  };
}
export interface IDummy {
  [id: string]: {
    myInfo: {
      lv: number;
      exp: number;
      coin: number;
      items: {}[];
      category: string[];
    };
    record: TypeRecord;
    shop: {};
  };
}
const dummy: IDummy = {
  UJfZT67ctBTaTp5y3otcU94xEYH2: {
    myInfo: {
      lv: 1,
      exp: 2,
      coin: 20,
      items: [],
      category: ['펫'],
    },
    record: {
      '2022-05-11': {
        todoList: [
          {
            todo: '개 밥주기',
            rewardExp: 3,
            rewardCoin: 2,
            completeTime: '14:20',
            deadline: '07:30',
            category: '펫',
          },
          {
            todo: '운동하기',
            rewardExp: 2,
            rewardCoin: 1,
            completeTime: '',
            deadline: '06:30',
            category: '운동',
          },
          {
            todo: '개 산책',
            rewardExp: 1,
            rewardCoin: 3,
            completeTime: '',
            deadline: '14:30',
            category: '펫',
          },
        ],
        percent: 30,
        acquiredCoin: 2,
        satisfaction: 2,
      },
      '2022-05-12': {
        todoList: [
          {
            todo: '계획짜기',
            rewardExp: 3,
            rewardCoin: 2,
            completeTime: '',
            deadline: '',
            category: '공부',
          },
          {
            todo: '산책가기',
            rewardExp: 3,
            rewardCoin: 2,
            completeTime: '',
            deadline: '23:30',
            category: '취미',
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

const authService = new AuthService();

function App() {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage authService={authService} />} />
          <Route
            path="/todo/:date"
            element={<TodoPage dummy={dummy} authService={authService} />}
          />
          <Route path="/calendar" element={<CalendarPage dummy={dummy} />} />
          <Route
            path="/mypage"
            element={<MyPage dummy={dummy} authService={authService} />}
          />
          <Route path="/addTodo" element={<AddTodoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
