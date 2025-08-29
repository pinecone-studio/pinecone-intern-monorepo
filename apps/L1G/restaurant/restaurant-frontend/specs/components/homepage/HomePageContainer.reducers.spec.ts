import { addToCartReducer, removeOneReducer, removeItemReducer } from '@/components/home/HomePageContainer';
import type { CartItem } from '@/types/cart';

describe('removeItemReducer', () => {
  const base: CartItem = {
    id: 'x',
    image: '/a.jpg',
    foodName: 'Sample',
    price: '1000',
    selectCount: 2,
  };

  it('removes item by id', () => {
    const prev = [base];
    const next = removeItemReducer(prev, 'x');
    expect(next).toHaveLength(0);
  });

  it('trims id before comparing', () => {
    const prev = [base];
    const next = removeItemReducer(prev, '  x ');
    expect(next).toHaveLength(0);
  });

  it('keeps list unchanged if id not found', () => {
    const prev = [base];
    const next = removeItemReducer(prev, 'nope');
    expect(next).toEqual(prev);
  });

  it('immutability', () => {
    const prev = Object.freeze([base]) as unknown as CartItem[];
    const next = removeItemReducer(prev, 'x');
    expect(next).not.toBe(prev);
  });
});

describe('addToCartReducer', () => {
  const base: CartItem = { id: 'a', image: '/a.jpg', foodName: 'Soup', price: '1000', selectCount: 1 };

  it('adds a new item if not existing', () => {
    const prev: CartItem[] = [];
    const next = addToCartReducer(prev, { id: 'a', image: '/a.jpg', foodName: 'Soup', price: '1000' });
    expect(next).toHaveLength(1);
    expect(next[0].selectCount).toBe(1);
  });

  it('increments selectCount if already exists', () => {
    const prev: CartItem[] = [base];
    const next = addToCartReducer(prev, { id: 'a', image: '/a.jpg', foodName: 'Soup', price: '1000' });
    expect(next[0].selectCount).toBe(2);
  });
});

describe('removeOneReducer', () => {
  const base: CartItem = { id: 'a', image: '/a.jpg', foodName: 'Soup', price: '1000', selectCount: 2 };

  it('decrements selectCount if > 1', () => {
    const prev: CartItem[] = [base];
    const next = removeOneReducer(prev, 'a');
    expect(next[0].selectCount).toBe(1);
  });

  it('removes item if selectCount reaches 0', () => {
    const prev: CartItem[] = [{ ...base, selectCount: 1 }];
    const next = removeOneReducer(prev, 'a');
    expect(next).toHaveLength(0);
  });

  it('does nothing if id not found', () => {
    const prev: CartItem[] = [base];
    const next = removeOneReducer(prev, 'nope');
    expect(next).toEqual(prev);
  });
});
