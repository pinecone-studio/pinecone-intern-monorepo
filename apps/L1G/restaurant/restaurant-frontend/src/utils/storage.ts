// src/utils/storage.ts
import { FoodServeType } from '@/generated';
import type { CartItem } from '@/types/cart';
import type { OrderData } from '@/types/order';
import jwt from 'jsonwebtoken';

const CART_KEY = 'foodData';
const ORDER_KEY = 'orderData';
const TOKEN_KEY = 'token';
const TABLE_KEY = 'tableId';

// ─────────────────────────────
// Дотоод хамгаалалт (SSR-д noop)
// ─────────────────────────────

function hasWindow() {
  return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
}

function safeGetItem(key: string): string | null {
  if (!hasWindow()) return null;
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSetItem(key: string, value: string) {
  if (!hasWindow()) return;
  localStorage.setItem(key, value);
}

export const __test__ = { hasWindow, safeGetItem, safeSetItem };

// ─────────────────────────────
// Cart
// ─────────────────────────────
export function loadCart(): CartItem[] {
  try {
    const raw = safeGetItem(CART_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as CartItem[]) : [];
  } catch {
    return [];
  }
}

export function saveCart(items: CartItem[]) {
  safeSetItem(CART_KEY, JSON.stringify(items));
}

// ─────────────────────────────
// OrderData
// ─────────────────────────────
export function saveOrderData(items: CartItem[], orderType: FoodServeType) {
  const payload: OrderData = {
    items,
    orderType,
    updatedAt: new Date().toISOString(),
  };
  safeSetItem(ORDER_KEY, JSON.stringify(payload));
}

export function loadOrderData(): OrderData | null {
  try {
    const raw = safeGetItem(ORDER_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as OrderData;
  } catch {
    return null;
  }
}

export function setOrderData(payload: OrderData) {
  safeSetItem(ORDER_KEY, JSON.stringify(payload)); // SSR үед noop
}

// ─────────────────────────────
// Token / User
// ─────────────────────────────
export function getToken(): string | null {
  return safeGetItem(TOKEN_KEY); // SSR үед null
}

export type DecodedProps = { user?: { _id?: string } };

// JWT-ээс userId гаргаж авах (decode only)
export function getUserIdFromToken(): string {
  const token = getToken(); // SSR үед null
  const decoded = (token ? jwt.decode(token) : null) as DecodedProps | null;
  return decoded?.user?._id ?? '';
}

// ─────────────────────────────
// Table
// ─────────────────────────────
export function getTableId(): string {
  const raw = safeGetItem(TABLE_KEY); // SSR үед null
  return raw ? String(raw) : '';
}

export function setTableId(id: string) {
  safeSetItem(TABLE_KEY, String(id)); // SSR үед noop
}
