import { TypeTodoList } from './../App';
// header.tsx
export function getMaxExp(lv: number): number {
  return Math.floor((lv * lv) / 3) + 4;
}

// calendar.tsx, todo_page.tsx
export function callToday() {
  return new Date().toISOString().slice(0, 10);
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
  if (time === '9') return;
  let hour = parseInt(time.slice(0, 2));
  const minute = parseInt(time.slice(3));
  let amPm = '오전';
  if (hour > 13) {
    hour -= 12;
    amPm = '오후';
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
