import React from 'react';
import styles from './app.module.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './page/home_page/home_page';
import CalendarPage from './page/calendar_page/calendar_page';
import MyPage from './page/my_page/my_page';

const dummy = {
  1: {
    myPage: {
      lv: 1,
      exp: 3,
      coin: 30,
      items: [],
    },
    record: {
      '2022-05-11': {
        toDoList: [],
        percent: 30,
        acquiredCoin: 2,
        satisfaction: 1,
      },
      '2022-05-12': {
        toDoList: [],
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
          <Route path="/" element={<HomePage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/my" element={<MyPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
