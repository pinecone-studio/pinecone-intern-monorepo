const FormatDate = (input?: string): string => {
  if (!input) return 'Тодорхойгүй';

  const date = new Date(input);
  console.log(typeof input);
  if (!isNaN(date.getTime())) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  return 'Тодорхойгүй';
};

export default FormatDate;
