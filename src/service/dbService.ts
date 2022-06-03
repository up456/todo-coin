import { TypeData, TypeTodoList, TypeItem } from './../App';
import { get, off, onValue, ref, remove, set } from 'firebase/database';
import { myDb } from './my_firebase';

export const DEFAULT_DATA: TypeData = {
  myInfo: {
    lv: 1,
    exp: 0,
    coin: 0,
    items: [''],
    categoryRecord: [''],
  },
  record: {},
  shop: {},
};

class DbService {
  db;
  constructor() {
    this.db = myDb;
  }
  // 맨처음 기본 db 설정 값
  createUser(userId: string | undefined) {
    set(ref(this.db, `userList/${userId}`), true);
    set(ref(this.db, `dataList/${userId}`), DEFAULT_DATA);
  }

  // 전체 db
  async readData(path: string) {
    const dbRef = ref(this.db, path);
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      const value = snapshot.val();
      return await value;
    } else {
      console.log('No data available');
      return false;
    }
  }

  saveRecord(
    userId: string,
    date: string,
    value: {
      todoList: {
        [todoId: string]: TypeTodoList;
      };
      categoryList: string[];
      percent: number;
      acquiredCoin: number;
      satisfaction: number;
    }
  ) {
    set(ref(this.db, `dataList/${userId}/record/${date}`), value);
  }

  saveData(userId: string, value: TypeData) {
    set(ref(this.db, `dataList/${userId}`), value);
  }

  removeTodo(userId: string, date: string, todoId: string) {
    const dbRef = ref(
      this.db,
      `dataList/${userId}/record/${date}/todoList/${todoId}`
    );
    remove(dbRef);
  }

  removeRecord(userId: string, date: string) {
    const dbRef = ref(this.db, `dataList/${userId}/record/${date}`);
    remove(dbRef);
  }

  syncData(
    userId: string,
    onUpdate: React.Dispatch<React.SetStateAction<TypeData>>
  ) {
    const dbRef = ref(this.db, `dataList/${userId}`);
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      data && onUpdate(data);
    });
    return () => off(dbRef);
  }

  // shop 관련 db
  saveItem(userId: string, value: TypeItem) {
    const itemNumber = Date.now();
    set(ref(this.db, `dataList/${userId}/shop/${itemNumber}`), value);
  }
  removeItem(userId: string, targetNumber: string) {
    const dbRef = ref(this.db, `dataList/${userId}/shop/${targetNumber}`);
    remove(dbRef);
  }
  updateItem(userId: string, targetNumber: string, value: TypeItem) {
    set(ref(this.db, `dataList/${userId}/shop/${targetNumber}`), value);
  }
}

export default DbService;
