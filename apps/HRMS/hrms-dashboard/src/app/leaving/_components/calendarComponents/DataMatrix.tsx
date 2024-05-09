import dayjs, { Dayjs } from 'dayjs';

export type TDay = {
  __typename: string
  leaveType: string;
  name: string;
  startDate: string;
};

 type TWeek = {
  leaveRequestOfDay: TDay[];
  day: Dayjs;
};

export function calendarMatrix(monthDate: Dayjs | string, data: TDay[]) {
  if (!data) return;
  const year = dayjs(monthDate).year();
  const month = dayjs(monthDate).month();
  const firstDayOfTheMonth = dayjs(new Date(year, month, 1));
  const weekDayOfFirstDay = firstDayOfTheMonth.day();
  let currentDayOfMonth = 1 - weekDayOfFirstDay;
  const rows = [];

  for (let i = 0; i < 5; i++) {
    const row: TWeek[] = [];

    for (let j = 0; j < 7; j++) {
      const day = firstDayOfTheMonth.add(currentDayOfMonth, 'day');
      const leaveRequestOfDay = data.filter((item) => dayjs(item.startDate).isSame(day, 'day'));

      currentDayOfMonth++;

      row.push({ day, leaveRequestOfDay });
    }
    rows.push(row);
  }
  return rows;
}