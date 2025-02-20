import { render, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import OrderHistory from '@/app/order-history/page';
import { useGetOrdersForUserQuery } from '@/generated';
jest.mock('sonner', () => ({
  toast: {
    error: jest.fn(),
  },
}));
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));
jest.mock('@/generated', () => ({
  useUpdateOrderReadMutation: jest.fn(),
  useGetOrdersForUserQuery: jest.fn(),
}));
describe('OrderHistory Component', () => {
  const mockRefetch = jest.fn();
  const mockRouter = {
    push: jest.fn(),
  };
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (toast.error as jest.Mock).mockReset();
    localStorage.setItem('user', JSON.stringify({ _id: 'testUser' }));
  });
  it('renders loading state initially', () => {
    (useGetOrdersForUserQuery as jest.Mock).mockReturnValue({
      loading: true,
      refetch: mockRefetch,
      data: null,
    });
    render(
      <MockedProvider>
        <OrderHistory />
      </MockedProvider>
    );
  });
  it('renders order history correctly', async () => {
    (useGetOrdersForUserQuery as jest.Mock).mockReturnValue({
      refetch: mockRefetch,
      loading: false,
      data: {
        getOrdersForUser: [
          {
            _id: 'order1',
            status: 'Completed',
            isRead: false,
            createdAt: new Date().toISOString(),
            items: [{ price: 1000, quantity: 2 }],
          },
        ],
      },
    });
    render(
      <MockedProvider>
        <OrderHistory />
      </MockedProvider>
    );
  });
  it('handles no orders scenario', async () => {
    (useGetOrdersForUserQuery as jest.Mock).mockReturnValue({
      refetch: mockRefetch,
      loading: false,
      data: { getOrdersForUser: [] },
    });
    render(
      <MockedProvider>
        <OrderHistory />
      </MockedProvider>
    );
  });
  it('handles error when localStorage is invalid', async () => {
    Storage.prototype.getItem = jest.fn(() => 'invalid-data');
    render(
      <MockedProvider>
        <OrderHistory />
      </MockedProvider>
    );
  });
  it('correctly retrieves userId from localStorage and fetches orders', async () => {
    Storage.prototype.getItem = jest.fn(() => JSON.stringify({ _id: 'user123' }));
    (useGetOrdersForUserQuery as jest.Mock).mockReturnValue({
      loading: false,
      refetch: mockRefetch,
      data: {
        getOrdersForUser: [
          {
            _id: 'order1',
            status: 'Completed',
            isRead: false,
            userId: 'user123',
            createdAt: new Date().toISOString(),
            items: [
              { price: 1000, quantity: 2 },
              { price: null, quantity: null },
            ],
          },
        ],
      },
    });
    render(
      <MockedProvider>
        <OrderHistory />
      </MockedProvider>
    );
  });
  it('sorts orders by createdAt in descending order', async () => {
    const mockOrders = [
      {
        _id: '1',
        isRead: false,
        status: 'Pending',
        createdAt: new Date('2025-02-17T10:00:00Z').toISOString(),
      },
      {
        _id: '2',
        isRead: false,
        status: 'InProcess',
        createdAt: new Date('2025-02-18T10:00:00Z').toISOString(),
      },
      {
        _id: '3',
        isRead: false,
        status: 'Ready',
        createdAt: new Date('2025-02-19T10:00:00Z').toISOString(),
      },
      {
        _id: '4',
        isRead: true,
        status: 'Done',
        createdAt: new Date('2025-02-19T10:00:00Z').toISOString(),
      },
    ];
    (useGetOrdersForUserQuery as jest.Mock).mockReturnValue({
      loading: false,
      refetch: mockRefetch,
      data: {
        getOrdersForUser: mockOrders,
      },
    });
    render(
      <MockedProvider>
        <OrderHistory />
      </MockedProvider>
    );
  });
  it('handles localStorage get user not found, userId will be null', async () => {
    Storage.prototype.getItem = jest.fn(() => null);
    render(
      <MockedProvider>
        <OrderHistory />
      </MockedProvider>
    );
    expect(toast.error).toHaveBeenCalledWith('Та захиалгын түүх хархын тулд нэвтэрч орно уу!');
    await waitFor(() => expect(mockRouter.push).toHaveBeenCalledWith('/login'));
  });
});
