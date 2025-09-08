import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { OrderHistory } from '@/components/OrderHistory';
import { useGetFoodOrdersByUserQuery } from '@/generated';
import jwt from 'jsonwebtoken';

// Mock Apollo hook
jest.mock('@/generated', () => ({
  useGetFoodOrdersByUserQuery: jest.fn(),
}));

// Mock jwt.decode
jest.mock('jsonwebtoken', () => ({
  decode: jest.fn(),
}));

// Mock Navbar
jest.mock('@/components/Navbar', () => ({
  Navbar: () => <div>Mocked Navbar</div>,
}));

describe('OrderHistory component', () => {
  const mockUser = { user: { _id: 'user123' } };

  beforeEach(() => {
    jest.clearAllMocks();
    Storage.prototype.getItem = jest.fn(() => 'mockToken'); // Mock localStorage
    (jwt.decode as jest.Mock).mockReturnValue(mockUser);
  });

  it('renders error state', () => {
    (useGetFoodOrdersByUserQuery as jest.Mock).mockReturnValue({
      data: undefined,
      error: { message: 'Something went wrong' },
    });

    render(<OrderHistory />);
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('renders empty state when no orders', () => {
    (useGetFoodOrdersByUserQuery as jest.Mock).mockReturnValue({
      data: { getFoodOrdersByUser: [] },
      error: undefined,
    });

    render(<OrderHistory />);
    expect(screen.getByText('Захиалга олдсонгүй')).toBeInTheDocument();
  });

  it('renders orders list when data exists', () => {
    const fakeOrders = [
      {
        orderId: '1',
        orderNumber: '31321',
        status: 'Бэлтгэгдэж буй',
        createdAt: new Date('2024-10-19T12:37:00Z').getTime(),
        totalPrice: 15600,
      },
    ];

    (useGetFoodOrdersByUserQuery as jest.Mock).mockReturnValue({
      data: { getFoodOrdersByUser: fakeOrders },
      error: undefined,
    });

    render(<OrderHistory />);

    // Check order number
    expect(screen.getByText('#31321')).toBeInTheDocument();

    // Check status
    expect(screen.getByText('Бэлтгэгдэж буй')).toBeInTheDocument();

    // Check total price
    expect(screen.getByText(/15600₮/)).toBeInTheDocument();

    // Check formatted date
    expect(screen.getByText(/19\/10\/24/)).toBeInTheDocument();

    // Check Navbar
    expect(screen.getByText('Mocked Navbar')).toBeInTheDocument();
  });
});
