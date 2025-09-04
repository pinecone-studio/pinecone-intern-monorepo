import { CartItem } from './cart';

export type OrderTypeValue = 'IN' | 'GO';

export type OrderData = {
  items: CartItem[];
  orderType: OrderTypeValue;
  updatedAt: string;
};
