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
