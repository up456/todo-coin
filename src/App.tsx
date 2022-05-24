import React, { useState } from 'react';
import styles from './app.module.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TodoPage from './page/todo_page/todo_page';
import CalendarPage from './page/calendar_page/calendar_page';
import MyPage from './page/my_page/my_page';
import LoginPage from './page/login_page/login_page';
import AuthService from './service/authService';
import AddTodoPage from './page/add_todo_page/add_todo_page';
import { getMaxExp } from './util/calc';

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
  myInfo: {
    lv: number;
    exp: number;
    coin: number;
    items: {}[];
    categoryRecord: Set<string>;
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
      categoryRecord: Set<string>;
    };
    record: TypeRecord;
    shop: {};
  };
}

const dummy: TypeDummy = {
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
            completeTime: '9',
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
            deadline: '9',
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

export const UserIdContext = React.createContext('');

export type TypeChangeTodoState = (
  date: string,
  targetTodoId: string,
  todoState: string
) => void;

function App() {
  const [userId, setUserId] = useState(sessionStorage.getItem('userId') || '');
  const [data, setData] = useState(dummy[userId]);

  const handleReward = (originalState: string, selectedState: string) => {
    // 보상이 유지되는 경우
    if (
      originalState === selectedState ||
      (originalState !== 'complete' && selectedState !== 'complete')
    ) {
      return 'stay';
    }
    // 보상이 회수되는 경우
    else if (originalState === 'complete') {
      return 'minus';
    }
    // 보상이 추가되는 경우
    else {
      return 'plus';
    }
  };

  const calcPercent = (
    todoList: { [todoId: string]: TypeTodoList },
    record: {
      todoList: {
        [todoId: string]: TypeTodoList;
      };
      categoryList: Set<string>;
      percent: number;
      acquiredCoin: number;
      satisfaction: number;
    }
  ) => {
    const todoListCount = Object.keys(todoList).length;
    const completeTodoCount = Object.keys(todoList).filter(
      (key) => todoList[key].todoState === 'complete'
    ).length;
    record.percent = Math.floor((completeTodoCount / todoListCount) * 100);
  };

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
          categoryList: new Set([]),
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
      const categoryList = record.categoryList;
      categoryList.add(inputValue.category);
      // 나의 카테고리 목록 추가
      const categoryRecord = newData.myInfo.categoryRecord;
      categoryRecord.add(inputValue.category);

      // todo추가 후에는 반드시 todo달성률 업데이트
      calcPercent(todoList, record);

      return newData;
    });
  };

  return (
    <div className={styles.app}>
      <UserIdContext.Provider value={userId}>
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
              element={
                <TodoPage data={data} changeTodoState={changeTodoState} />
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

export default App;
