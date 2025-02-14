import Header from '@/components/common/Header';
import { CartProvider, useCart } from '@/components/providers';
import { render, screen, act, renderHook } from '@testing-library/react';

const Wrapper = ({ children }: { children: React.ReactNode }) => <CartProvider>{children}</CartProvider>;

describe('Header Component', () => {
  it('should update the order length when items are added to the cart', () => {
    render(<Header />, { wrapper: Wrapper });

    // Simulate adding an item to the cart
    const { result } = renderHook(() => useCart(), { wrapper: Wrapper });
    act(() => {
      result.current.addToCart({
        _id: '1',
        foodName: 'Pizza',
        quantity: 2,
        price: 1000,
        imageUrl: 'pizza.jpg',
      });
    });
  });

  it('should update the order length when items are removed from the cart', () => {
    render(<Header />, { wrapper: Wrapper });

    // Simulate adding an item to the cart
    const { result } = renderHook(() => useCart(), { wrapper: Wrapper });
    act(() => {
      result.current.addToCart({
        _id: '1',
        foodName: 'Pizza',
        quantity: 2,
        price: 1000,
        imageUrl: 'pizza.jpg',
      });
    });

    // Simulate removing the item from the cart
    act(() => {
      result.current.removeFromCart('1');
    });
  });

  it('should update the order length when quantity is decreased', () => {
    render(<Header />, { wrapper: Wrapper });

    // Simulate adding an item to the cart
    const { result } = renderHook(() => useCart(), { wrapper: Wrapper });
    act(() => {
      result.current.addToCart({
        _id: '1',
        foodName: 'Pizza',
        quantity: 2,
        price: 1000,
        imageUrl: 'pizza.jpg',
      });
    });

    // Simulate decreasing the item quantity in the cart
    act(() => {
      result.current.minusFromCart({
        _id: '1',
        foodName: 'Pizza',
        quantity: 2,
        price: 1000,
        imageUrl: 'pizza.jpg',
      });
    });
  });
});
