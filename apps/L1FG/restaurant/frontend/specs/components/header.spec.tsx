import Header from '@/components/common/Header';
import { MockedProvider } from '@apollo/client/testing';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { useCart } from '@/components/providers';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/components/providers', () => ({
  useCart: jest.fn(),
  useOrder: jest.fn(() => ({
    markOrderAsRead: jest.fn(),
  })),
}));

describe('Header Component', () => {
  it('calculates and displays correct order length', () => {
    const mockOrders = [{ quantity: 2 }, { quantity: 3 }, { quantity: 5 }];
    const totalQuantity = mockOrders.reduce((total, order) => total + order.quantity, 0);

    (useCart as jest.Mock).mockReturnValue({ orders: mockOrders });

    render(
      <MockedProvider>
        <Header />
      </MockedProvider>
    );

    // Verify the total quantity is correctly displayed in BasketFood
    expect(screen.getByText(totalQuantity)).toBeInTheDocument();
  });
});
