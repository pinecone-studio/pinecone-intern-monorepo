import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import OrderHistory from '@/app/order-history/page';
import { useGetOrdersForUserQuery } from '@/generated';

// Mock the toast and router for testing
jest.mock('sonner', () => ({
  toast: {
    error: jest.fn(),
  },
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/generated', () => ({
  useGetOrdersForUserQuery: jest.fn(),
}));

describe('OrderHistory Component', () => {
  const mockRouter = {
    push: jest.fn(),
  };

  beforeEach(() => {
    // Reset mock function before each test
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (toast.error as jest.Mock).mockReset();
  });

  it('renders loading state initially', () => {
    (useGetOrdersForUserQuery as jest.Mock).mockReturnValue({
      loading: true,
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
      loading: false,
      data: {
        getOrdersForUser: [
          {
            _id: 'order1',
            status: 'Completed',
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
    // Mock localStorage to simulate invalid JSON
    Storage.prototype.getItem = jest.fn(() => 'invalid-data');

    render(
      <MockedProvider>
        <OrderHistory />
      </MockedProvider>
    );

    await waitFor(() => expect(mockRouter.push).toHaveBeenCalledWith('/login'));
    expect(toast.error).toHaveBeenCalledWith('Та захиалгын түүх хархын тулд нэвтэрч орно уу!');
  });

  it('correctly retrieves userId from localStorage and fetches orders', async () => {
    // Mock localStorage to simulate valid user data
    const mockUser = { _id: 'user123' };
    Storage.prototype.getItem = jest.fn(() => JSON.stringify(mockUser));

    // Mock GraphQL response
    (useGetOrdersForUserQuery as jest.Mock).mockReturnValue({
      loading: false,
      data: {
        getOrdersForUser: [
          {
            _id: 'order1',
            status: 'Completed',
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
});
