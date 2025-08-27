import { addToCartReducer, removeOneReducer, removeItemReducer, type CartItem } from '@/components/home/HomePageContainer';

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
