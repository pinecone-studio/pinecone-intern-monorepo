import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useRouter } from 'next/navigation';
import { useCart } from '@/components/providers/LocalProvider';
import OrderList from '@/components/order/OrderList';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

jest.mock('@/components/providers/LocalProvider', () => ({
  useCart: jest.fn(),
}));

describe('OrderList Component', () => {
  const mockPush = jest.fn();
  (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  it('navigates to "/qpay" when "Захиалах" is clicked', async () => {
    (useCart as jest.Mock).mockReturnValue({
      orders: [{ _id: 'food1', foodName: 'Burger', imageUrl: '/burger.jpg', price: 5000, quantity: 2 }],
      addToCart: jest.fn(),
      minusFromCart: jest.fn(),
      removeFromCart: jest.fn(),
    });

    render(<OrderList />);

    const drawerbutton = screen.getByTestId('order-button');
    fireEvent.click(drawerbutton);
    const orderButton = screen.getByTestId('order');
    fireEvent.click(orderButton);

    await waitFor(() => expect(mockPush).toHaveBeenCalledWith('/qpay'));
  });
  it('if item quantity equals 1, the minus button should trush button', () => {
    const mockRemoveFromCart = jest.fn();
    (useCart as jest.Mock).mockReturnValue({
      orders: [{ _id: 'food1', foodName: 'Burger', imageUrl: '/burger.jpg', price: 5000, quantity: 1 }],
      addToCart: jest.fn(),
      minusFromCart: jest.fn(),
      removeFromCart: mockRemoveFromCart,
    });

    render(<OrderList />);
    const drawerbutton = screen.getByTestId('order-button');
    fireEvent.click(drawerbutton);
    const minusButton = screen.getByTestId('minus0');
    fireEvent.click(minusButton);

    expect(mockRemoveFromCart).toHaveBeenCalledWith('food1');
  });
});
