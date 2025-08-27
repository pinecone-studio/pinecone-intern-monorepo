import { addToCartReducer, removeOneReducer, type CartItem } from '@/components/home/HomePageContainer';

describe('addToCartReducer', () => {
  const base = { id: 'f1', image: '/img.jpg', foodName: 'Бууз', price: '4500' };

  it('adds new item with selectCount=1', () => {
    const next = addToCartReducer([], base);
    expect(next).toHaveLength(1);
    expect(next[0]).toMatchObject({ ...base, selectCount: 1 });
  });

  it('increments existing item', () => {
    const next = addToCartReducer([{ ...base, selectCount: 2 }], base);
    expect(next[0].selectCount).toBe(3);
  });

  it('keeps others intact', () => {
    const other: CartItem = { id: 'f2', image: '/x.jpg', foodName: 'Хуушуур', price: '3800', selectCount: 5 };
    const next = addToCartReducer([{ ...base, selectCount: 1 }, other], base);
    expect(next).toHaveLength(2);
    expect(next.find((i) => i.id === 'f1')!.selectCount).toBe(2);
    expect(next.find((i) => i.id === 'f2')).toEqual(other);
  });

  it('immutability', () => {
    const prev = Object.freeze([{ ...base, selectCount: 1 }]) as unknown as CartItem[];
    const next = addToCartReducer(prev, base);
    expect(next).not.toBe(prev);
    expect(next[0].selectCount).toBe(2);
  });
});

describe('removeOneReducer', () => {
  const base: CartItem = { id: 'x', image: '/a.jpg', foodName: 'Sample', price: '1000', selectCount: 2 };

  it('decrements quantity', () => {
    const next = removeOneReducer([base], 'x');
    expect(next[0].selectCount).toBe(1);
  });

  it('removes when qty hits 0', () => {
    const next = removeOneReducer([{ ...base, selectCount: 1 }], 'x');
    expect(next).toHaveLength(0);
  });

  it('no-op for unknown id', () => {
    const prev = [base];
    const next = removeOneReducer(prev, 'nope');
    expect(next).toEqual(prev);
  });

  it('immutability', () => {
    const prev = Object.freeze([base]) as unknown as CartItem[];
<<<<<<< HEAD
    const next = removeItemReducer(prev, 'x');
=======
    const next = removeOneReducer(prev, 'x');
>>>>>>> bc023f11e (ol)
    expect(next).not.toBe(prev);
  });
});
