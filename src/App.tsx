import React, { useEffect, useState } from 'react';
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
import EditTodoPage from './page/edit_todo_page/edit_todo_page';
import ShopPage from './page/shop_page/shop_page';
import AddItemPage from './page/add_item_page/add_item_page';
import EditItemPage from './page/edit_item_page/edit_item_page';
import ImageUploader from './service/ImageUploader';

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
export interface TypeItem {
  itemTitle: string;
  itemLv: number;
  itemPrice: number;
  imgUrl: string;
  imgName: string;
}
export interface TypeData {
  total: {
    totalTodo: number;
    totalCoin: number;
    totalItem: number;
  };
  myInfo: {
    nickname: string;
    profileImgUrl: string;
    lv: number;
    exp: number;
    coin: number;
    items: { [itemNumber: string]: TypeItem };
    categoryRecord: string[];
  };
  record: TypeRecord;
  shop: { [itemNumber: string]: TypeItem };
}

export const UserIdContext = React.createContext('');

export type TypeChangeTodoState = (
  date: string,
  targetTodoId: string,
  todoState: string
) => void;

function App({
  authService,
  dbService,
  imageUploader,
}: {
  authService: AuthService;
  dbService: DbService;
  imageUploader: ImageUploader;
}) {
  const [userId, setUserId] = useState(sessionStorage.getItem('userId') || '');
  const [data, setData] = useState(DEFAULT_DATA);

  useEffect(() => {
    if (!userId) return;
    const stopSync = dbService.syncData(userId, (data) => setData(data));
    return () => stopSync();
  }, [userId, dbService]);

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
      const total = newData?.total;
      const record = newData?.record[date];
      const todoList = record?.todoList;
      const targetTodo = todoList[targetTodoId];

      if (!(userInfo && todoList)) return newData;

      // ?????? ?????? ??????
      switch (handleReward(targetTodo.todoState, todoState)) {
        case 'plus':
          // ?????? ?????? ??????
          userInfo.coin += targetTodo.rewardCoin;
          record.acquiredCoin += targetTodo.rewardCoin;
          //????????? ?????? ??????
          userInfo.exp += targetTodo.rewardExp;
          if (userInfo.exp >= getMaxExp(userInfo.lv)) {
            const gap = userInfo.exp - getMaxExp(userInfo.lv);
            userInfo.exp = 0 + gap;
            userInfo.lv++;
          }
          // total ????????????
          total.totalCoin += targetTodo.rewardCoin;
          total.totalTodo += 1;
          break;
        case 'minus':
          // ?????? ?????? ??????
          userInfo.coin -= targetTodo.rewardCoin;
          record.acquiredCoin -= targetTodo.rewardCoin;
          //????????? ?????? ??????
          userInfo.exp -= targetTodo.rewardExp;
          if (userInfo.exp < 0) {
            userInfo.lv--;
            userInfo.exp += getMaxExp(userInfo.lv);
          }
          // total ????????????
          total.totalCoin -= targetTodo.rewardCoin;
          total.totalTodo -= 1;
          break;
        default:
          break;
      }
      // ?????? ?????? ??? ?????? ??? ???????????? ?????? ??????
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
          throw new Error(`?????? ??????????????? ${todoState} `);
      }
      // ?????? ?????? ????????? ????????? todo????????? ????????????
      calcPercent(Object.keys(todoList).length, record);
      // db ??????
      dbService.saveData(userId, newData);

      return newData;
    });
  };

  const addTodo = (date: string, inputValue: TypeTodoList) => {
    setData((prevData) => {
      let newData = {
        ...prevData,
      };
      // ?????? ????????? ????????? ?????? ?????? ????????? ?????? ????????? ????????? ??????
      let record = newData?.record;
      if (!record) {
        newData['record'] = {
          [date]: {
            todoList: {},
            categoryList: [],
            percent: 0,
            acquiredCoin: 0,
            satisfaction: 0,
          },
        };
      }
      let recordDate = newData.record?.[date];
      if (!recordDate) {
        newData.record = {
          ...newData.record,
          [date]: {
            todoList: {},
            categoryList: [],
            percent: 0,
            acquiredCoin: 0,
            satisfaction: 0,
          },
        };
      }
      const todoId = Date.now();
      newData.record[date].todoList[todoId] = inputValue;
      // ?????? ???????????? ??????
      const SetCategoryList = new Set(newData.record[date].categoryList);
      SetCategoryList.add(inputValue.category);
      newData.record[date].categoryList = Array.from(SetCategoryList);
      // ?????? ???????????? ?????? ??????
      const SetCategoryRecord = new Set(newData.myInfo.categoryRecord);
      SetCategoryRecord.add(inputValue.category);
      newData.myInfo.categoryRecord = Array.from(SetCategoryRecord);
      // todo?????? ????????? ????????? todo????????? ????????????
      calcPercent(
        Object.keys(newData.record[date].todoList).length,
        newData.record[date]
      );
      // db ??????
      dbService.saveData(userId, newData);
      return newData;
    });
  };

  const deleteTodo = (date: string, todoId: string) => {
    if (window.confirm('?????? ?????????????????????????')) {
      setData((prevData) => {
        let newData = {
          ...prevData,
        };
        let record = newData?.record[date];
        let todoList = record.todoList;
        const targetTodoCategory = todoList[todoId].category;
        // ?????? ???????????? ?????? (??????????????? ??????????????? ??????????????? ??????)
        if (todoList) {
          if (
            Object.keys(todoList).filter(
              (key) => todoList[key].category === targetTodoCategory
            ).length === 1
          ) {
            record.categoryList = record.categoryList.filter(
              (category) => category !== targetTodoCategory
            );
          }
        }
        // todo?????? ????????? ????????? todo????????? ????????????
        calcPercent(Object.keys(todoList).length - 1, newData.record[date]);
        // db ??????
        dbService.saveData(userId, newData);
        //targeTodo ??????
        if (Object.keys(todoList).length === 1) {
          dbService.removeRecord(userId, date);
          return newData;
        } else {
          dbService.removeTodo(userId, date, todoId);
        }
        return newData;
      });
    }
  };

  const editTodo = (
    date: string,
    todoId: string,
    prevCategory: string,
    inputValue: TypeTodoList
  ) => {
    setData((prevData) => {
      let newData = {
        ...prevData,
      };
      let record = newData.record[date];

      // todo ??????
      const todoList = record.todoList;
      todoList[todoId] = inputValue;
      // ?????? ?????? ??? ???????????? ?????? (?????? ??? ?????? ??????????????? ?????? ?????? ????????? ??????)
      if (todoList) {
        if (
          Object.keys(todoList).filter(
            (key) => todoList[key].category === prevCategory
          ).length === 0
        ) {
          record.categoryList = record.categoryList.filter(
            (category) => category !== prevCategory
          );
        }
      }
      // ?????? ????????? ???????????? ??????
      const SetCategoryList = new Set(record.categoryList);
      SetCategoryList.add(inputValue.category);
      record.categoryList = Array.from(SetCategoryList);

      // db ??????
      dbService.saveData(userId, newData);
      return newData;
    });
  };

  // shop ??????
  const addItem = (value: TypeItem) => {
    dbService.saveItem(userId, value);
  };
  const deleteItem = (targetNumber: string) => {
    dbService.removeItem(userId, targetNumber);
  };
  const editItem = (targetNumber: string, value: TypeItem) => {
    dbService.updateItem(userId, targetNumber, value);
  };
  const buyItem = (value: TypeItem) => {
    dbService.saveMyItem(userId, value);
  };
  const editMyInfo = (coin: number, itemCount: number) => {
    dbService.saveMyCoin(userId, coin);
    dbService.saveTotalItem(userId, itemCount);
  };

  // item??????
  const deleteMyItem = (targetNumber: string) => {
    dbService.removeMyItem(userId, targetNumber);
  };

  // ?????? ???????????? ??????
  const deleteMyCategory = (targetCategory: string) => {
    const newCategoryRecord = data.myInfo.categoryRecord.filter(
      (category) => category !== targetCategory
    );
    dbService.saveMyCategory(userId, newCategoryRecord);
  };
  const addMyCategory = (newCategory: string) => {
    const SetCategoryRecord = new Set(data.myInfo.categoryRecord);
    SetCategoryRecord.add(newCategory);
    const newCategoryRecord = Array.from(SetCategoryRecord);
    dbService.saveMyCategory(userId, newCategoryRecord);
  };

  // ??????????????? ??????
  const editMyNickname = (newNickname: string) => {
    dbService.saveMyNickname(userId, newNickname);
  };
  const editMyProfileImg = async (file: File) => {
    const result = await imageUploader.upload(file);
    const newProfileImgUrl = result.url;
    dbService.saveMyProfileImg(userId, newProfileImgUrl);
  };

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
              element={
                <AddTodoPage
                  addTodo={addTodo}
                  myCategory={data.myInfo.categoryRecord}
                  addMyCategory={addMyCategory}
                />
              }
            />
            <Route
              path="/:date/editTodo"
              element={
                <EditTodoPage
                  editTodo={editTodo}
                  addMyCategory={addMyCategory}
                  myCategory={data.myInfo.categoryRecord}
                />
              }
            />
            <Route path="/calendar" element={<CalendarPage data={data} />} />
            <Route
              path="/mypage"
              element={
                <MyPage
                  data={data}
                  authService={authService}
                  setUserId={setUserId}
                  deleteMyItem={deleteMyItem}
                  editMyInfo={editMyInfo}
                  deleteMyCategory={deleteMyCategory}
                  editMyNickname={editMyNickname}
                  editMyProfileImg={editMyProfileImg}
                  addMyCategory={addMyCategory}
                />
              }
            />
            <Route
              path="/shop"
              element={
                <ShopPage
                  data={data}
                  deleteItem={deleteItem}
                  editMyInfo={editMyInfo}
                  buyItem={buyItem}
                />
              }
            ></Route>
            <Route
              path="/addItem"
              element={
                <AddItemPage addItem={addItem} imageUploader={imageUploader} />
              }
            />
            <Route
              path="/:itemNumber/editItem"
              element={
                <EditItemPage
                  editItem={editItem}
                  imageUploader={imageUploader}
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
