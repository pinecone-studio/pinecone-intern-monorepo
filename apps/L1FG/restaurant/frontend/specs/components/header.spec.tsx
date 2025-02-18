import Header from '@/components/common/Header';
import { useCart } from '@/components/providers';
import { render } from '@testing-library/react';

jest.mock('@/components/providers', () => ({
  useCart: jest.fn(),
}));

describe('Header Component', () => {
  it('calculates and displays correct order length', async () => {
    const mockOrders = [{ quantity: 2 }, { quantity: 3 }, { quantity: 5 }];

    useCart.mockReturnValue({
      orders: mockOrders,
    });

    render(<Header />);

    mockOrders.reduce((total, order) => total + order.quantity, 0);
  });
});
