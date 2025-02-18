/* eslint-disable */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { useMakeOrderMutation } from '@/generated';
import PreSuccessPageComp from '@/components/order/PreSuccessPageComp';
import { useCart } from '@/components/providers/LocalProvider';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));
jest.mock('@/generated', () => ({
  useGetOrdersForUserQuery: jest.fn(),
}));
jest.mock('@/generated', () => ({
  useMakeOrderMutation: jest.fn(),
}));
jest.mock('@/components/providers/LocalProvider', () => ({
  useCart: jest.fn(),
}));

describe('PreSuccessPageComp', () => {
  const mockPush = jest.fn();
  const mockBack = jest.fn();
  let mockClearCart: jest.Mock<any, any, any>;
  beforeEach(() => {
    mockClearCart = jest.fn();
    Storage.prototype.getItem = jest.fn().mockReturnValue(JSON.stringify({ _id: '123' }));
    Storage.prototype.getItem = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush, back: mockBack });
    useCart.mockReturnValue({
      orders: [
        {
          foodName: 'burger',
          quantity: 1,
          price: 20000,
          imageUrl: 'https://example.com/burger.jpg',
        },
      ],
      tableId: '123',
      clearCart: mockClearCart,
    });

    console.error = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should submit the order and redirect to payment-successful on success', async () => {
    const mockMakeOrder = jest.fn().mockResolvedValueOnce({ data: { success: true } });
    useMakeOrderMutation.mockReturnValue([mockMakeOrder, { data: null, loading: false, error: null }]);

    render(<PreSuccessPageComp />);

    fireEvent.click(screen.getByTestId('Qpay'));

    await waitFor(() => expect(mockPush).toHaveBeenCalledWith('/payment-successful'));

    expect(mockMakeOrder).toHaveBeenCalledWith({
      variables: {
        input: {
          tableId: 123,
          userId: '',
          items: [
            {
              name: 'burger',
              quantity: 1,
              price: 20000,
              imageUrl: 'https://example.com/burger.jpg',
            },
          ],
        },
      },
    });

    expect(mockClearCart).toHaveBeenCalled();
  });

  it('should handle order submission failure gracefully', async () => {
    const mockMakeOrder = jest.fn().mockRejectedValueOnce(new Error('Order submission failed'));
    useMakeOrderMutation.mockReturnValue([mockMakeOrder, { data: null, loading: false, error: new Error('Order submission failed') }]);

    render(<PreSuccessPageComp />);

    fireEvent.click(screen.getByTestId('Qpay'));
  });

  it('should show an empty cart message if there are no orders', () => {
    useCart.mockReturnValue({
      orders: [],
      tableId: '123',
      clearCart: mockClearCart,
    });

    render(<PreSuccessPageComp />);
  });
  it('should call router.back() when the back button is clicked', () => {
    const mockMakeOrder = jest.fn().mockRejectedValueOnce(new Error('Order submission failed'));
    useMakeOrderMutation.mockReturnValue([mockMakeOrder, { data: null, loading: false, error: new Error('Order submission failed') }]);
    render(<PreSuccessPageComp />);

    const closeButton = screen.getByTestId('back');
    fireEvent.click(closeButton);

    expect(mockBack).toHaveBeenCalledTimes(1);
  });
  it('should NOT call makeOrder if tableId is missing', async () => {
    const mockMakeOrder = jest.fn().mockResolvedValueOnce({ data: { success: true } });
    useCart.mockReturnValue({
      orders: [
        {
          foodName: 'burger',
          quantity: 1,
          price: 20000,
          imageUrl: 'https://example.com/burger.jpg',
        },
      ],
      tableId: null,
      clearCart: jest.fn(),
    });

    render(<PreSuccessPageComp />);

    fireEvent.click(screen.getByTestId('Qpay'));

    expect(mockMakeOrder).not.toHaveBeenCalled();
  });

  it('should NOT call makeOrder if orders list is empty', async () => {
    const mockMakeOrder = jest.fn().mockResolvedValueOnce({ data: { success: true } });
    useCart.mockReturnValue({
      orders: [], // Empty cart
      tableId: '123',
      clearCart: jest.fn(),
    });

    render(<PreSuccessPageComp />);

    expect(mockMakeOrder).not.toHaveBeenCalled();
  });
  it('should set the userId from localStorage correctly', () => {
    const mockUser = { _id: '123' };
    Storage.prototype.getItem = jest.fn().mockReturnValue(JSON.stringify(mockUser));

    render(<PreSuccessPageComp />);

    expect(Storage.prototype.getItem).toHaveBeenCalledWith('user'); // Ensure that localStorage.getItem('user') was called
  });
});
