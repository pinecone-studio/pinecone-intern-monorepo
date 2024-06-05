export const formatDateToMongolian = (date: Date) => {
  const days = ['Ням', 'Даваа', 'Мягмар', 'Лхагва', 'Пүрэв', 'Баасан', 'Бямба'];
  const formattedDate = `${date.getMonth() + 1}/${date.getDate()} - ${days[date.getDay()]}`;
  return formattedDate;
};
