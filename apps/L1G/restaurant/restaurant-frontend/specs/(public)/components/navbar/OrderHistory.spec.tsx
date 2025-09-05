import { render, screen } from '@testing-library/react';

import jwt from 'jsonwebtoken';
import '@testing-library/jest-dom';
import { OrderHistory } from '@/components/OrderHistory';
import { useGetFoodOrdersByUserQuery } from '@/generated';

// Apollo hook-ийг mock хийж байна
jest.mock('@/generated', () => ({
  useGetFoodOrdersByUserQuery: jest.fn(),
}));

// jwt.decode-г mock хийж байна
jest.mock('jsonwebtoken', () => ({
  decode: jest.fn(),
}));

// Logedinnav-г жоохон dummy болгоё
jest.mock('@/components/Navbar', () => ({
  Navbar: () => <div>Mocked Navbar</div>,
}));

describe('OrdersHistory component', () => {
  const mockUser = { user: { _id: 'user123' } };
  useGetFoodOrdersByUserQuery as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('renders login prompt when token is null', () => {
    (useGetFoodOrdersByUserQuery as jest.Mock).mockReturnValue({
      data: undefined,
      error: undefined,
    });

    render(<OrderHistory />);

    // Гарчиг хэвээр үлдэнэ
    expect(screen.getByText('Захиалгын түүх')).toBeInTheDocument();
    // "Та нэвтрэнэ үү" текст гарч ирнэ
    expect(screen.getByText('Та нэвтрэнэ үү')).toBeInTheDocument();
  });

  it('renders error state', () => {
    Storage.prototype.getItem = jest.fn(() => 'mockToken');
    (jwt.decode as jest.Mock).mockReturnValue(mockUser);

    (useGetFoodOrdersByUserQuery as jest.Mock).mockReturnValue({
      data: undefined,
      error: { message: 'Something went wrong' },
    });

    render(<OrderHistory />);
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('renders empty state when no orders', () => {
    Storage.prototype.getItem = jest.fn(() => 'mockToken');
    (jwt.decode as jest.Mock).mockReturnValue(mockUser);

    (useGetFoodOrdersByUserQuery as jest.Mock).mockReturnValue({
      data: { getFoodOrdersByUser: [] },
      error: undefined,
    });

    render(<OrderHistory />);
    expect(screen.getByText('Захиалгаа олдсонгүй')).toBeInTheDocument();
  });

  it('renders orders list when data exists', () => {
    Storage.prototype.getItem = jest.fn(() => 'mockToken');
    (jwt.decode as jest.Mock).mockReturnValue(mockUser);

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

    expect(screen.getByText('#31321')).toBeInTheDocument();
    expect(screen.getByText('Бэлтгэгдэж буй')).toBeInTheDocument();
    expect(screen.getByText(/15600₮/)).toBeInTheDocument();
    expect(screen.getByText(/19\/10\/24/)).toBeInTheDocument(); // formatted date
  });
});
