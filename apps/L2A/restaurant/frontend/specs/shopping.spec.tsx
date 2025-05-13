import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ShoppingCart } from '@/app/_features/ShoppingCart';

describe('ShoppingCart Component', () => {
  it('renders the heading', () => {
    render(<ShoppingCart />);
    expect(screen.getByText('Захиалгын түүх')).toBeInTheDocument();
  });

  it('renders all the orders', () => {
    render(<ShoppingCart />);
    const prices = ['42,800₮', '27,450₮', '18,900₮', '21,900₮', '24,200₮', '19,750₮'];
    prices.forEach(price => {
      expect(screen.getByText(price)).toBeInTheDocument();
    });

    const orderElements = screen.getAllByText('#33998');
    expect(orderElements.length).toBe(prices.length);
  });

  it('shows the order status and timestamp', () => {
    render(<ShoppingCart />);
    expect(screen.getAllByText('Дууссан').length).toBe(6);
    expect(screen.getAllByText('24.10.19 15:25').length).toBe(6);
  });
});
