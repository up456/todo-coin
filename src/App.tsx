import React, { useCallback, useEffect, useState } from 'react';
import styles from './app.module.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TodoPage from './page/todo_page/todo_page';
import CalendarPage from './page/calendar_page/calendar_page';
import MyPage from './page/my_page/my_page';
import LoginPage from './page/login_page/login_page';
import AuthService from './service/authService';
import AddTodoPage from './page/add_todo_page/add_todo_page';
import { calcPercent, getMaxExp, handleReward } from './util/calc';
import DbService, { DEFAULT_DATA } from './service/dbService';

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
    categoryList: string[];
    percent: number;
    acquiredCoin: number;
    satisfaction: number;
  };
}
export interface TypeData {
  myInfo: {
    lv: number;
    exp: number;
    coin: number;
    items: {}[];
    categoryRecord: string[];
  };
  record: TypeRecord;
  shop: {};
}
export interface TypeDummy {
  [id: string]: {
    myInfo: {
      lv: number;
      exp: number;
      coin: number;
      items: {}[];
      categoryRecord: string[];
    };
    record: TypeRecord;
    shop: {};
  };
}

const authService = new AuthService();
const dbService = new DbService();

export const UserIdContext = React.createContext('');

export type TypeChangeTodoState = (
  date: string,
  targetTodoId: string,
  todoState: string
) => void;

function App() {
  const [userId, setUserId] = useState(sessionStorage.getItem('userId') || '');
  const [data, setData] = useState(DEFAULT_DATA);

  useEffect(() => {
    if (!userId) return;
    const stopSync = dbService.syncData(userId, (data) => setData(data));
    return () => stopSync();
  }, [userId]);

  const changeTodoState: TypeChangeTodoState = (
    date,
    targetTodoId,
    todoState
  ) => {
    setData((prevData) => {
      const newData = {
        ...prevData,
      };
      const userInfo = newData?.myInfo;
      const record = newData?.record[date];
      const todoList = record?.todoList;
      const targetTodo = todoList[targetTodoId];

      if (!(userInfo && todoList)) return newData;

      // 보상 처리 부분
      switch (handleReward(targetTodo.todoState, todoState)) {
        case 'plus':
          // 코인 처리 부분
          userInfo.coin += targetTodo.rewardCoin;
          record.acquiredCoin += targetTodo.rewardCoin;
          //경험치 처리 부분
          userInfo.exp += targetTodo.rewardExp;
          if (userInfo.exp >= getMaxExp(userInfo.lv)) {
            const gap = userInfo.exp - getMaxExp(userInfo.lv);
            userInfo.exp = 0 + gap;
            userInfo.lv++;
          }
          break;
        case 'minus':
          // 코인 처리 부분
          userInfo.coin -= targetTodo.rewardCoin;
          record.acquiredCoin -= targetTodo.rewardCoin;
          //경험치 처리 부분
          userInfo.exp -= targetTodo.rewardExp;
          if (userInfo.exp < 0) {
            userInfo.lv--;
            userInfo.exp += getMaxExp(userInfo.lv);
          }
          break;
        default:
          break;
      }
      // 보상 처리 후 상태 및 완료시간 저장 부분
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
      // 상태 변화 후에는 반드시 todo달성률 업데이트
      calcPercent(todoList, record);
      // db 저장
      dbService.saveData(userId, newData);

      return newData;
    });
  };

  const addTodo = (date: string, inputValue: TypeTodoList) => {
    setData((prevData) => {
      let newData = {
        ...prevData,
      };
      // 해당 날짜의 기록을 넣는 칸이 없으면 해당 날짜로 빈공간 생성
      let record = newData?.record[date];
      if (!record) {
        newData.record[date] = {
          todoList: {},
          categoryList: [],
          percent: 0,
          acquiredCoin: 0,
          satisfaction: 0,
        };
      }
      // todo 추가
      const todoList = record.todoList;
      const todoId = Date.now();
      todoList[todoId] = inputValue;
      // 당일 카테고리 추가
      const SetCategoryList = new Set(record.categoryList);
      SetCategoryList.add(inputValue.category);
      record.categoryList = Array.from(SetCategoryList);
      // 나의 카테고리 목록 추가
      const SetCategoryRecord = new Set(newData.myInfo.categoryRecord);
      SetCategoryRecord.add(inputValue.category);
      newData.myInfo.categoryRecord = Array.from(SetCategoryRecord);
      // todo추가 후에는 반드시 todo달성률 업데이트
      calcPercent(todoList, record);
      // db 저장
      dbService.saveData(userId, newData);

      return newData;
    });
  };

  const deleteTodo = useCallback(
    (date: string, todoId: string) => {
      if (window.confirm('정말 삭제하시겠습니까?')) {
        setData((prevData) => {
          let newData = {
            ...prevData,
          };
          let record = newData?.record[date];
          let todoList = record.todoList;
          const targetTodoCategory = todoList[todoId].category;

          // 당일 카테고리 삭제
          if (record.categoryList.length === 1) {
            alert('마지막 할일은 삭제할 수 없습니다.');
          } else {
            record.categoryList = record.categoryList.filter(
              (category) => category !== targetTodoCategory
            );
            //targeTodo 삭제
            delete newData.record[date].todoList[todoId];
          }

          // todo추가 후에는 반드시 todo달성률 업데이트
          calcPercent(todoList, record);
          // db 저장
          dbService.saveData(userId, newData);
          return newData;
        });
      }
    },
    [userId]
  );

  return (
    <div className={styles.app}>
      <UserIdContext.Provider value={userId}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <LoginPage
                  authService={authService}
                  setUserId={setUserId}
                  dbService={dbService}
                  setData={setData}
                />
              }
            />
            <Route
              path="/todo/:date"
              element={
                <TodoPage
                  data={data}
                  changeTodoState={changeTodoState}
                  dbService={dbService}
                  deleteTodo={deleteTodo}
                />
              }
            />
            <Route
              path="/:date/addTodo"
              element={<AddTodoPage addTodo={addTodo} />}
            />
            <Route path="/calendar" element={<CalendarPage data={data} />} />
            <Route
              path="/mypage"
              element={
                <MyPage
                  data={data}
                  authService={authService}
                  setUserId={setUserId}
                />
              }
            />
          </Routes>
        </BrowserRouter>
      </UserIdContext.Provider>
    </div>
  );
}

export default React.memo(App);
