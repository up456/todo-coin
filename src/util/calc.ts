export function getMaxExp(lv: number): number {
  return Math.floor((lv * lv) / 3) + 4;
}

export function callToday() {
  return new Date().toISOString().slice(0, 10);
}

export function isDayAfterTodayOrToday(selectedDate: string) {
  const rawToday = callToday();
  const today = new Date(rawToday);
  const selectedDay = new Date(selectedDate);
  return today <= selectedDay;
}
