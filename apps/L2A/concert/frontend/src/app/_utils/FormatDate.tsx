const FormatDate = (input?: string | number): string => {
  if (!input) return 'Тодорхойгүй';
  const parsed = Number(input);
  if (!isNaN(parsed)) {
    const date = new Date(parsed);
    if (!isNaN(date.getTime())) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
  }
  const date = new Date(String(input));
  if (!isNaN(date.getTime())) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  return 'Тодорхойгүй';
};

export default FormatDate;
