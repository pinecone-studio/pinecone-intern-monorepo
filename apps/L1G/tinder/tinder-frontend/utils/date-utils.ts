export const isDateDisabled = (date: Date, currentDate: Date, minYear: number): boolean => {
  return date > currentDate || date < new Date(minYear, 0, 1);
};
