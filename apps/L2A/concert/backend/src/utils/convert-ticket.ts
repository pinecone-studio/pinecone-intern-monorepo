import { TicketInput } from '../generated';

type SeatKey = 'Standard' | 'VIP' | 'Backseat';

type ConvertedTickets = Record<SeatKey, { count: number; price: number }>;

const typeMap: Record<string, SeatKey> = {
  'Энгийн тасалбар': 'Standard',
  'VIP тасалбар': 'VIP',
  'Арын тасалбар': 'Backseat',
};

export const convertTickets = (tickets: TicketInput[]): ConvertedTickets => {
  const defaultSeatState: ConvertedTickets = {
    Standard: { count: 0, price: 0 },
    VIP: { count: 0, price: 0 },
    Backseat: { count: 0, price: 0 },
  };

  return tickets.reduce(
    (acc, curr) => {
      const backendKey = typeMap[curr.type];
      if (!backendKey) return acc;

      acc[backendKey] = {
        count: curr.count,
        price: curr.price,
      };

      return acc;
    },
    { ...defaultSeatState }
  );
};
