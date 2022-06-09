import { TypeTodoList } from './../App';
// header.tsx
export function getMaxExp(lv: number): number {
  return Math.floor((lv * lv) / 3) + 4;
}

// calendar.tsx, todo_page.tsx, header.tsx
export function callToday() {
  return new Date().toISOString().slice(0, 10);
}
// calendar.tsx
export function changeDateToString(date: Date) {
  const newDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() + 1
  );
  return newDate.toISOString().slice(0, 10);
}

// day_record.tsx
export function isDayAfterTodayOrToday(selectedDate: string) {
  const rawToday = callToday();
  const today = new Date(rawToday);
  const selectedDay = new Date(selectedDate);
  return today <= selectedDay;
}

// todo.tsx
export function transClockTo12(time: string) {
  if (time === '23:59:59') return;
  let hour = parseInt(time.slice(0, 2));
  const minute = time.slice(3);
  let amPm = '오전';
  if (hour >= 12) {
    hour -= 12;
    amPm = '오후';
    if (hour === 0) hour = 12;
  }

  return `${amPm} ${hour}:${minute}`;
}

// App.tsx
export const handleReward = (originalState: string, selectedState: string) => {
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
// App.tsx
export const calcPercent = (
  todoListLength: number,
  record: {
    todoList: {
      [todoId: string]: TypeTodoList;
    };
    categoryList: string[];
    percent: number;
    acquiredCoin: number;
    satisfaction: number;
  }
) => {
  if (todoListLength === 0) return;
  const completeTodoCount = Object.keys(record.todoList).filter(
    (key) => record.todoList[key].todoState === 'complete'
  ).length;
  record.percent = Math.floor((completeTodoCount / todoListLength) * 100);
  return;
};
