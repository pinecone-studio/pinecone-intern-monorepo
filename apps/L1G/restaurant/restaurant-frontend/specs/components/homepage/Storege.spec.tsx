import '@testing-library/jest-dom';
import { loadCart, saveCart, saveOrderData, loadOrderData } from '@/utils/storage';

describe('utils/storage', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.useRealTimers();
  });

  describe('Cart storage', () => {
    test('loadCart → хоосон үед [] буцаана', () => {
      expect(loadCart()).toEqual([]);
    });

    test('saveCart → localStorage-д хадгалж, loadCart буцааж чадна', () => {
      const items = [
        { id: '1', image: '/a.png', foodName: 'A', price: '1000', selectCount: 2 },
        { id: '2', image: '/b.png', foodName: 'B', price: '2000', selectCount: 1 },
      ];
      saveCart(items);

      const raw = localStorage.getItem('foodData');
      expect(raw).not.toBeNull();

      expect(loadCart()).toEqual(items);
    });

    test('loadCart → буруу JSON үед [] буцаана', () => {
      localStorage.setItem('foodData', '{invalid json');
      expect(loadCart()).toEqual([]);
    });

    test('loadCart → JSON exists but not an array ⇒ [] (line 11)', () => {
      localStorage.setItem('foodData', JSON.stringify({ not: 'array' }));
      expect(loadCart()).toEqual([]);
    });
  });

  describe('Order storage', () => {
    test('saveOrderData → items + orderType хадгалагдаж, updatedAt ISO байна', () => {
      const cart = [{ id: '1', image: '/a.png', foodName: 'A', price: '1000', selectCount: 2 }];
      saveOrderData(cart, 'dine_in');

      const raw = localStorage.getItem('orderData');
      expect(raw).not.toBeNull();

      const parsed = JSON.parse(String(raw));
      expect(parsed.items).toEqual(cart);
      expect(parsed.orderType).toBe('dine_in');

      // updatedAt нь хүчинтэй ISO огноо
      expect(typeof parsed.updatedAt).toBe('string');
      expect(new Date(parsed.updatedAt).toString()).not.toBe('Invalid Date');
    });

    test('loadOrderData → хадгалсан payload-ыг буцаана', () => {
      const cart = [{ id: '2', image: '/b.png', foodName: 'B', price: '2000', selectCount: 3 }];
      saveOrderData(cart, 'takeaway');

      const data = loadOrderData();
      expect(data).not.toBeNull();
      expect(data?.items).toEqual(cart);
      expect(data?.orderType).toBe('takeaway');
      expect(new Date(String(data?.updatedAt)).toString()).not.toBe('Invalid Date');
    });

    test('loadOrderData → байхгүй үед null буцаана', () => {
      localStorage.removeItem('orderData');
      expect(loadOrderData()).toBeNull();
    });

    test('loadOrderData → буруу JSON үед null буцаана', () => {
      localStorage.setItem('orderData', '{bad json');
      expect(loadOrderData()).toBeNull();
    });
  });
});
