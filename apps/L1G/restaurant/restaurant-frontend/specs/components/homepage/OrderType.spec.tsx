import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import type { CartItem } from '@/types/cart';
import OrderType from '@/components/home/OrderType';

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: (): any => ({ push: mockPush }),
}));

const mockSaveOrderData = jest.fn();
jest.mock('@/utils/storage', () => ({
  saveOrderData: (...args: unknown[]) => mockSaveOrderData(...args),
}));

describe('OrderType handlePick (lines 20-23)', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    mockPush.mockClear();
    mockSaveOrderData.mockClear();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  const cart: CartItem[] = [{ id: '1', image: '/i.png', foodName: 'Taco', price: '12000', selectCount: 2 }];

  it('saves orderData and navigates to /orderPayment when selecting dine_in', async () => {
    render(<OrderType currentCart={cart} />);

    fireEvent.click(screen.getByText('Захиалах'));
    fireEvent.click(screen.getByLabelText('Эндээ идэх'));
    await waitFor(() => {
      expect(mockSaveOrderData).toHaveBeenCalledWith(cart, 'dine_in');
    });

    jest.runAllTimers();

    expect(mockPush).toHaveBeenCalledWith('/orderPayment');
  });

  it('saves orderData and navigates when selecting takeaway', async () => {
    render(<OrderType currentCart={cart} />);

    fireEvent.click(screen.getByText('Захиалах'));
    fireEvent.click(screen.getByLabelText('Аваад явах'));

    await waitFor(() => {
      expect(mockSaveOrderData).toHaveBeenCalledWith(cart, 'takeaway');
    });

    jest.runAllTimers();
    expect(mockPush).toHaveBeenCalledWith('/orderPayment');
  });
});
