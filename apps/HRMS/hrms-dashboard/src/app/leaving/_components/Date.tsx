export const formatDate = (dateString: string) => {
  const startDate = new Date(dateString);
  const today = new Date();
  const month = startDate.getMonth() + 1;
  const day = startDate.getDate();
  const dayOfWeek = ['Ням', 'Даваа', 'Мягмар', 'Лхагва', 'Пүрэв', 'Баасан', 'Бямба'][startDate.getDay()];

  if (startDate.getDate() === today.getDate() && startDate.getMonth() === today.getMonth() && startDate.getFullYear() === today.getFullYear()) {
    return `${'Өнөөдөр'} - ${month}/${day}`;
  }

  return `${month}/${day} - ${dayOfWeek}`;
};
