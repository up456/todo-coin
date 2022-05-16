// header.tsx
export function getMaxExp(lv: number): number {
  return Math.floor((lv * lv) / 3) + 4;
}

// calendar.tsx
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
  if (!time) return;
  let hour = parseInt(time.slice(0, 2));
  const minute = parseInt(time.slice(3));
  let amPm = '오전';
  if (hour > 13) {
    hour -= 12;
    amPm = '오후';
  }
  return `${amPm} ${hour}:${minute}`;
}
