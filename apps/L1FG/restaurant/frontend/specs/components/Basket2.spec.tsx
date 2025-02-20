import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useRouter } from 'next/navigation';
import { useCart } from '@/components/providers/LocalProvider';
import BasketFood from '@/components/BasketFood';
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
  const mockRouterPush = jest.fn();
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });
    jest.clearAllMocks();
  });
  it('renders correctly when cart is empty', async () => {
    (useCart as jest.Mock).mockReturnValue({
      orders: [],
      addToCart: jest.fn(),
      minusFromCart: jest.fn(),
      removeFromCart: jest.fn(),
    });
    render(<BasketFood orderLength={0} />);
    const orderButton = screen.getByTestId('order-button');
    fireEvent.click(orderButton);
    expect(await screen.getByText('Хоосон байна.')).toBeInTheDocument();
  });
  it('renders items in the cart correctly', () => {
    (useCart as jest.Mock).mockReturnValue({
      orders: [
        { _id: 'food1', foodName: 'Burger', imageUrl: '/burger.jpg', price: 5000, quantity: 2 },
        { _id: 'food2', foodName: 'Pizza', imageUrl: '/pizza.jpg', price: 8000, quantity: 1 },
      ],
      addToCart: jest.fn(),
      minusFromCart: jest.fn(),
      removeFromCart: jest.fn(),
    });
    render(<BasketFood orderLength={0} />);
  });
  it('calls addToCart when the "+" button is clicked', async () => {
    const mockAddToCart = jest.fn();
    (useCart as jest.Mock).mockReturnValue({
      orders: [{ _id: 'food1', foodName: 'Burger', imageUrl: '/burger.jpg', price: 5000, quantity: 2 }],
      addToCart: mockAddToCart,
      minusFromCart: jest.fn(),
      removeFromCart: jest.fn(),
    });
    render(<BasketFood orderLength={0} />);
    const orderButton = screen.getByTestId('order-button');
    fireEvent.click(orderButton);
    const plusButton = screen.getByTestId('plus0');
    fireEvent.click(plusButton);
    expect(mockAddToCart).toHaveBeenCalledWith(expect.objectContaining({ _id: 'food1' }));
  });
  it('calls minusFromCart when the "-" button is clicked', async () => {
    const mockMinusFromCart = jest.fn();
    (useCart as jest.Mock).mockReturnValue({
      orders: [{ _id: 'food1', foodName: 'Burger', imageUrl: '/burger.jpg', price: 5000, quantity: 2 }],
      addToCart: jest.fn(),
      minusFromCart: mockMinusFromCart,
      removeFromCart: jest.fn(),
    });
    render(<BasketFood orderLength={0} />);
    const orderButton = screen.getByTestId('order-button');
    fireEvent.click(orderButton);
    const minusButton = screen.getByTestId('minus0');
    fireEvent.click(minusButton);

    expect(mockMinusFromCart).toHaveBeenCalledWith(expect.objectContaining({ _id: 'food1' }));
  });
  it('calls removeFromCart when the trash button is clicked', async () => {
    const mockRemoveFromCart = jest.fn();
    (useCart as jest.Mock).mockReturnValue({
      orders: [{ _id: 'food1', foodName: 'Burger', imageUrl: '/burger.jpg', price: 5000, quantity: 2 }],
      addToCart: jest.fn(),
      minusFromCart: jest.fn(),
      removeFromCart: mockRemoveFromCart,
    });
    render(<BasketFood orderLength={0} />);
    const orderButton = screen.getByTestId('order-button');
    fireEvent.click(orderButton);
    const deleteButton = screen.getByTestId('delete0');
    fireEvent.click(deleteButton);
    expect(mockRemoveFromCart).toHaveBeenCalledWith('food1');
  });
  it('if click makeOrderButton ', async () => {
    (useCart as jest.Mock).mockReturnValue({
      orders: [{ _id: 'food1', foodName: 'Burger', imageUrl: '/burger.jpg', price: 5000, quantity: 2 }],
      addToCart: jest.fn(),
      minusFromCart: jest.fn(),
      removeFromCart: jest.fn(),
    });
    render(<BasketFood orderLength={0} />);
    const orderButton = screen.getByTestId('order-button');
    fireEvent.click(orderButton);
    const makeOrderButton = screen.getByTestId('order');
    fireEvent.click(makeOrderButton);
    expect(mockRouterPush).toHaveBeenCalledWith('/qpay');
  });
  it('if item quantity will 1 minus button will remove item', () => {
    (useCart as jest.Mock).mockReturnValue({
      orders: [{ _id: 'food1', foodName: 'Burger', imageUrl: '/burger.jpg', price: 5000, quantity: 1 }],
      addToCart: jest.fn(),
      minusFromCart: jest.fn(),
      removeFromCart: jest.fn(),
    });
    render(<BasketFood orderLength={0} />);
    const orderButton = screen.getByTestId('order-button');
    fireEvent.click(orderButton);
    const minusButton = screen.getByTestId('minus0');
    fireEvent.click(minusButton);
  });
});
