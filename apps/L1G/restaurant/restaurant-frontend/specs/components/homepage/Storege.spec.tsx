/** @jest-environment jsdom */
/* eslint-disable */
import { __test__ } from '@/utils/storage';
import '@testing-library/jest-dom';

// ✅ jwt.decode-г storage импортоос ӨМНӨ mock-лоно (important!)
jest.mock('jsonwebtoken', () => ({
  __esModule: true,
  default: { decode: jest.fn() },
  decode: jest.fn(),
}));

import { loadCart, saveCart, saveOrderData, loadOrderData, setOrderData, getToken, getUserIdFromToken, getTableId, setTableId } from '@/utils/storage';
import jwt from 'jsonwebtoken';

describe('utils/storage', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  // ─────────────────────────────
  // Cart storage
  // ─────────────────────────────
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

    test('loadCart → JSON exists but not an array ⇒ []', () => {
      localStorage.setItem('foodData', JSON.stringify({ not: 'array' }));
      expect(loadCart()).toEqual([]);
    });
  });

  // ─────────────────────────────
  // Order storage
  // ─────────────────────────────
  describe('Order storage', () => {
    test('saveOrderData → items + orderType хадгалагдаж, updatedAt ISO байна', () => {
      const cart = [{ id: '1', image: '/a.png', foodName: 'A', price: '1000', selectCount: 2 }];

      // FoodServeType ⇒ 'IN' | 'GO'
      saveOrderData(cart, 'IN');

      const raw = localStorage.getItem('orderData');
      expect(raw).not.toBeNull();

      const parsed = JSON.parse(String(raw));
      expect(parsed.items).toEqual(cart);
      expect(parsed.orderType).toBe('IN');

      // updatedAt нь хүчинтэй ISO огноо
      expect(typeof parsed.updatedAt).toBe('string');
      expect(new Date(parsed.updatedAt).toString()).not.toBe('Invalid Date');
    });

    test('loadOrderData → хадгалсан payload-ыг буцаана', () => {
      const cart = [{ id: '2', image: '/b.png', foodName: 'B', price: '2000', selectCount: 3 }];

      saveOrderData(cart, 'GO');

      const data = loadOrderData();
      expect(data).not.toBeNull();
      expect(data?.items).toEqual(cart);
      expect(data?.orderType).toBe('GO');
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

    test('setOrderData → өгсөн payload-ыг шууд бичнэ (updatedAt-тай)', () => {
      const payload = {
        items: [{ id: '9', image: '/x.png', foodName: 'X', price: '1500', selectCount: 1 }],
        orderType: 'IN' as const,
        updatedAt: new Date('2024-01-01T00:00:00.000Z').toISOString(),
      };
      setOrderData(payload);

      const raw = localStorage.getItem('orderData');
      expect(raw).not.toBeNull();
      expect(JSON.parse(String(raw))).toEqual(payload);

      const read = loadOrderData();
      expect(read).toEqual(payload);
    });
  });

  // ─────────────────────────────
  // Token / User / Table
  // ─────────────────────────────
  describe('Token & User helpers', () => {
    test('getToken → байхгүй үед null', () => {
      expect(getToken()).toBeNull();
    });

    test('getToken → байгаа үед утгыг буцаана', () => {
      localStorage.setItem('token', 'abc.def.ghi');
      expect(getToken()).toBe('abc.def.ghi');
    });

    test('getUserIdFromToken → token байхгүй үед "" буцаана бөгөөд decode дуудагдахгүй', () => {
      const spy = jest.spyOn(jwt, 'decode');
      expect(getUserIdFromToken()).toBe('');
      expect(spy).not.toHaveBeenCalled();
    });

    test('getUserIdFromToken → jwt.decode буцаасан _id-г өгнө', () => {
      localStorage.setItem('token', 'mock.token.value');
      (jwt.decode as jest.Mock).mockReturnValue({ user: { _id: 'user-42' } });

      expect(getUserIdFromToken()).toBe('user-42');
      expect(jwt.decode).toHaveBeenCalledWith('mock.token.value');
    });

    test('getUserIdFromToken → буруу payload (user байхгүй) үед ""', () => {
      localStorage.setItem('token', 'mock.token.value');
      (jwt.decode as jest.Mock).mockReturnValue({ nope: true });

      expect(getUserIdFromToken()).toBe('');
    });
  });

  // ─────────────────────────────
  // SSR (window байхгүй) — hasWindow() = false
  // ─────────────────────────────
  describe('SSR / hasWindow() = false', () => {
    let originalWindow: any;
    let savedLocalStorage: Storage;

    beforeEach(() => {
      // 1) jsdom localStorage-ийн тогтвортой reference
      savedLocalStorage = (global as any).localStorage as Storage;

      // 2) Тест бүрийн өмнө seed-лэнэ (глобал beforeEach clear хийдэг тул)
      savedLocalStorage.setItem(
        'orderData',
        JSON.stringify({
          items: [],
          orderType: 'GO',
          updatedAt: '2024-01-01T00:00:00.000Z',
        })
      );
      savedLocalStorage.setItem('token', 'seed.token.value');
      savedLocalStorage.setItem('tableId', 'T-OLD');

      // 3) window-г устгаж hasWindow() → false болгоно
      originalWindow = (global as any).window;
      // @ts-expect-error — санаатайгаар window-г арилгаж байна
      delete (global as any).window;
    });

    afterEach(() => {
      // window-г буцааж сэргээнэ
      (global as any).window = originalWindow;
    });

    test('getToken → window undefined үед null', () => {
      expect(getToken()).toBeNull();
    });

    test('loadOrderData → window undefined үед null', () => {
      expect(loadOrderData()).toBeNull();
    });

    test('getTableId → window undefined үед ""', () => {
      expect(getTableId()).toBe('');
    });

    test('setTableId → window undefined үед no-op (хуучин утга хэвээр)', () => {
      setTableId('T-NEW'); // hasWindow=false тул бичих ёсгүй
      expect(savedLocalStorage.getItem('tableId')).toBe('T-OLD');
    });

    test('saveOrderData → window undefined үед no-op (хуучин orderData хэвээр)', () => {
      saveOrderData([{ id: '1', image: '/a.png', foodName: 'A', price: '1000', selectCount: 1 }], 'IN');
      const raw = savedLocalStorage.getItem('orderData');
      expect(raw).not.toBeNull();
      const parsed = JSON.parse(String(raw));
      expect(parsed.orderType).toBe('GO'); // хуучин хэвээр
    });
  });
  describe('utils/storage internals', () => {
    const { hasWindow, safeGetItem, safeSetItem } = __test__;

    beforeEach(() => {
      localStorage.clear();
      jest.restoreAllMocks();
    });

    it('hasWindow(): jsdom орчинд true', () => {
      expect(hasWindow()).toBe(true);
    });

    it('safeGetItem(): window байгаа үед утгыг буцаана', () => {
      localStorage.setItem('foo', 'bar');
      expect(safeGetItem('foo')).toBe('bar');
      expect(safeGetItem('nope')).toBeNull();
    });

    it('safeSetItem(): window байгаа үед бичнэ', () => {
      safeSetItem('k', 'v');
      expect(localStorage.getItem('k')).toBe('v');
    });

    it('SSR — window undefined үед safeGetItem → null, safeSetItem → noop', () => {
      const savedLocal = (global as any).localStorage;
      const originalWindow = (global as any).window;

      // Урьдчилаад хуучин утгыг seed-лэх
      savedLocal.setItem('keep', 'OLD');

      // window-г арилгаж SSR нөхцөл үүсгэнэ
      // @ts-expect-error – санаатайгаар window-г арилгаж байна
      delete (global as any).window;

      // SSR үед: унших→null, бичих→noop
      expect(safeGetItem('keep')).toBeNull();
      safeSetItem('keep', 'NEW');
      expect(savedLocal.getItem('keep')).toBe('OLD'); // өөрчлөгдөөгүй

      // window-г буцааж сэргээнэ
      (global as any).window = originalWindow;
    });

    it('localStorage.getItem алдаа шидвэл safeGetItem → null буцаана', () => {
      const spy = jest.spyOn(window.localStorage.__proto__, 'getItem').mockImplementation(() => {
        throw new Error('denied');
      });
      expect(safeGetItem('any')).toBeNull();
      spy.mockRestore();
    });

    it('localStorage.setItem алдаа шидвэл safeSetItem чимээгүй noop', () => {
      const spy = jest.spyOn(window.localStorage.__proto__, 'setItem').mockImplementation(() => {
        throw new Error('denied');
      });
      expect(() => safeSetItem('a', 'b'));
      spy.mockRestore();
    });
  });
  // ─────────────────────────────
  // Table helpers
  // ─────────────────────────────
  describe('Table helpers', () => {
    test('getTableId → байхгүй үед ""', () => {
      expect(getTableId()).toBe('');
    });

    test('setTableId → localStorage-д бичээд getTableId буцааж чадна', () => {
      setTableId('T-77');
      expect(localStorage.getItem('tableId')).toBe('T-77');
      expect(getTableId()).toBe('T-77');
    });

    test('setTableId → number өгсөн ч string хэлбэрээр хадгална', () => {
      // @ts-expect-error санаатайгаар number өгөв
      setTableId(12345);
      expect(localStorage.getItem('tableId')).toBe('12345');
      expect(getTableId()).toBe('12345');
    });
  });
});
