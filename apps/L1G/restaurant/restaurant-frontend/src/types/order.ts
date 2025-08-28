import { CartItem } from './cart';

export type OrderTypeValue = 'dine_in' | 'takeaway';

export type OrderData = {
  items: CartItem[];
  orderType: OrderTypeValue;
  updatedAt: string;
};
