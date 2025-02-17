import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import '@testing-library/jest-dom';
import { useGetOrderQuery } from '@/generated';
import { OrderHistory } from '@/components/userProfile/OrderHisto';

// Mock the useAlert hook
jest.mock('@/components/providers/AlertProvider', () => ({
  useAlert: () => ({
    showAlert: jest.fn(),
  }),
}));

// Mock the useGetOrderQuery hook
jest.mock('@/generated', () => ({
  useGetOrderQuery: jest.fn(),
}));

// Mock the localStorage
const localStorageMock = (function () {
  let store: Record<string, string> = {};

  return {
    getItem(key: string) {
      return store[key] || null;
    },
    setItem(key: string, value: string) {
      store[key] = value;
    },
    clear() {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('OrderHistory', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  it('renders loading state', () => {
    (useGetOrderQuery as jest.Mock).mockReturnValue({
      data: undefined,
      loading: true,
      error: undefined,
    });

    render(
      <MockedProvider>
        <OrderHistory />
      </MockedProvider>
    );

    expect(screen.getByTestId('gatgat')).toBeInTheDocument();
  });

  it('renders error state', async () => {
    (useGetOrderQuery as jest.Mock).mockReturnValue({
      data: undefined,
      loading: false,
      error: new Error('An error occurred'),
    });

    render(
      <MockedProvider>
        <OrderHistory />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Алдаа гарлаа!')).toBeInTheDocument();
    });
  });

  it('renders no orders found', async () => {
    (useGetOrderQuery as jest.Mock).mockReturnValue({
      data: { getOrder: [] },
      loading: false,
      error: undefined,
    });

    render(
      <MockedProvider>
        <OrderHistory />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Захиалгын түүх олдсонгүй.')).toBeInTheDocument();
    });
  });

  it('renders orders correctly', async () => {
    const mockOrders = [
      {
        _id: '1',
        ticketNumber: '12345',
        createdAt: '2023-10-01T00:00:00Z',
        vipTicket: { quantity: 2, price: 100 },
        regularTicket: { quantity: 0, price: 50 },
        standingAreaTicket: { quantity: 1, price: 30 },
      },
    ];

    (useGetOrderQuery as jest.Mock).mockReturnValue({
      data: { getOrder: mockOrders },
      loading: false,
      error: undefined,
    });

    // Set a mock user in localStorage
    localStorage.setItem('user', JSON.stringify({ _id: 'user1' }));

    render(
      <MockedProvider>
        <OrderHistory />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(
        screen.getByText((content, element) => {
          return element?.textContent === 'Захиалгын дугаар: 12345';
        })
      ).toBeInTheDocument();
      expect(screen.getByText('VIP Ticket')).toBeInTheDocument();
      expect(screen.getByText('200₮')).toBeInTheDocument();
      expect(screen.getByText('Standing Area Ticket')).toBeInTheDocument();
      expect(screen.getByText('30₮')).toBeInTheDocument();
    });
  });
});
