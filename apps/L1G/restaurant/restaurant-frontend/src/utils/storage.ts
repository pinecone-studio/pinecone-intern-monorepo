import type { CartItem } from '@/types/cart';
import type { OrderData, OrderTypeValue } from '@/types/order';

const CART_KEY = 'foodData';

export function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as CartItem[]) : [];
  } catch {
    return [];
  }
}

export function saveCart(items: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}

const ORDER_KEY = 'orderData';

export function saveOrderData(items: CartItem[], orderType: OrderTypeValue) {
  const payload: OrderData = {
    items,
    orderType,
    updatedAt: new Date().toISOString(),
  };
  localStorage.setItem(ORDER_KEY, JSON.stringify(payload));
}

export function loadOrderData(): OrderData | null {
  try {
    const raw = localStorage.getItem(ORDER_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as OrderData;
  } catch {
    return null;
  }
}
