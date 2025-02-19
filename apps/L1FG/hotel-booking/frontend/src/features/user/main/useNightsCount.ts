import { useQueryState } from 'nuqs';

const calculateNights = (fromDate: string, toDate: string): number => {
  const from = new Date(fromDate);
  const to = new Date(toDate);

  if (isNaN(from.getTime()) || isNaN(to.getTime())) {
    console.error('Invalid date format');
    return 0;
  }

  return (to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24);
};

export const useNightsCount = (): number => {
  const [dateFrom] = useQueryState('dateFrom');
  const [dateTo] = useQueryState('dateTo');

  if (!dateFrom || !dateTo) return 0;
  
  return calculateNights(dateFrom, dateTo);
};