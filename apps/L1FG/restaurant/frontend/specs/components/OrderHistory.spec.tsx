import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useGetOrdersForUserQuery } from '@/generated';
import OrderHistory from '@/components/order-history/OrderHistory';

jest.mock('@/generated', () => ({
  useGetOrdersForUserQuery: jest.fn(),
}));
beforeEach(() => {
  Storage.prototype.getItem = jest.fn().mockReturnValue(JSON.stringify({ _id: '123' }));
});
beforeEach(() => {
  Storage.prototype.getItem = jest.fn();
});

describe('OrderHistory Component', () => {
  it('should render a loading state initially', () => {
    useGetOrdersForUserQuery.mockReturnValue({ data: undefined, loading: true });

    render(<OrderHistory />);
    expect(screen.getByText('Захиалгын түүх')).toBeInTheDocument();
  });

  it('should display orders when there are order data', async () => {
    const mockOrders = [
      {
        createdAt: '2025-02-16T12:34:56Z',
        status: 'Delivered',
        items: [{ price: null }, { price: 200 }],
      },
    ];

    useGetOrdersForUserQuery.mockReturnValue({
      data: { getOrdersForUser: mockOrders },
      loading: false,
    });

    render(<OrderHistory />);
  });

  it('should handle errors correctly', async () => {
    useGetOrdersForUserQuery.mockReturnValue({
      data: null,
      loading: false,
      error: new Error('Failed to fetch orders'),
    });

    render(<OrderHistory />);
    expect(screen.getByText('Захиалгын түүх')).toBeInTheDocument();
  });
  it('should set the userId from localStorage correctly', () => {
    // Mock a user in localStorage with _id
    const mockUser = { _id: '123' };
    Storage.prototype.getItem = jest.fn().mockReturnValue(JSON.stringify(mockUser));

    useGetOrdersForUserQuery.mockReturnValue({
      data: { getOrdersForUser: [] },
      loading: false,
    });

    render(<OrderHistory />);

    // Wait for the effect to run and userId to be set
    expect(screen.getByText('Захиалгын түүх')).toBeInTheDocument();

    // Verify that userId state is set correctly (this can be done indirectly by rendering or checking data fetching)
    expect(Storage.prototype.getItem).toHaveBeenCalledWith('user'); // Ensure that localStorage.getItem('user') was called
    expect(useGetOrdersForUserQuery).toHaveBeenCalledWith({ variables: { userId: '123' } });
  });
});
