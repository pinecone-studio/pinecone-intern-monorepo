export interface FormData {
  concertName: string;
  concertPhoto: string;
  artistName: string[];
  vipTicket: {
    quantity: number;
    price: number;
  };
  regularTicket: {
    quantity: number;
    price: number;
  };
  standingAreaTicket: {
    quantity: number;
    price: number;
  };
  concertDay: Date;
  concertPlan: string;
  concertTime: string;
}

export interface TicketSectionProps {
  label: string;
  quantityName: string;
  priceName: string;
  quantityValue: number;
  priceValue: number;
  quantityError?: string;
  priceError?: string;
  onChange: (_e: React.ChangeEvent<HTMLInputElement>) => void;
  testId: string;
}
export interface BasicInputFieldProps {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (_e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export interface DateFormatOptions {
  month: '2-digit';
  day: '2-digit';
}

export interface ConcertTicket {
  quantity?: number | null;
  price?: number | null;
}

export interface Concert {
  _id: string;
  featured?: boolean;
  concertName: string;
  artistName: string[];
  concertDay?: string | null;
  concertPlan: string;
  concertTime: string;
  concertPhoto: string;
  vipTicket?: ConcertTicket | null;
  regularTicket?: ConcertTicket | null;
  standingAreaTicket?: ConcertTicket | null;
}

export interface EditFormTicket {
  quantity: number;
  price: number;
}

export interface EditFormData {
  concertName: string;
  concertPlan: string;
  artistName: string[];
  concertDay: Date;
  concertTime: string;
  vipTicket: EditFormTicket;
  regularTicket: EditFormTicket;
  standingAreaTicket: EditFormTicket;
}

const convertTicket = (ticket?: ConcertTicket | null): EditFormTicket => ({
  quantity: ticket?.quantity ?? 0,
  price: ticket?.price ?? 0,
});

export const convertToEditFormData = (concert: Concert): EditFormData => ({
  concertName: concert.concertName,
  concertPlan: concert.concertPlan,
  artistName: concert.artistName,
  concertDay: concert.concertDay ? new Date(concert.concertDay) : new Date(),
  concertTime: concert.concertTime,
  vipTicket: convertTicket(concert.vipTicket),
  regularTicket: convertTicket(concert.regularTicket),
  standingAreaTicket: convertTicket(concert.standingAreaTicket),
});

export interface EditFormErrors {
  concertName?: string;
  concertPlan?: string;
  artistName?: string;
  'vipTicket.quantity'?: string;
  'vipTicket.price'?: string;
  'regularTicket.quantity'?: string;
  'regularTicket.price'?: string;
  'standingAreaTicket.quantity'?: string;
  'standingAreaTicket.price'?: string;
}
