import { render, screen, fireEvent } from '@testing-library/react';
import HomeOrder from '@/app/_features/HomeOrder';
import '@testing-library/jest-dom';

jest.mock('@/app/_components/CartItems', () => {
  const MockCartItem = () => <div data-testid="cart-item">Mock CartItem</div>;
  MockCartItem.displayName = 'MockCartItem';
  return MockCartItem;
});

describe('HomeOrder', () => {
  it('shoudl render initial step of CartItem', () => {
    render(<HomeOrder />);
    expect(screen.getByText('Таны захиалга')).toBeInTheDocument();
    expect(screen.getByTestId('cart-item')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Захиалах/i })).toBeInTheDocument();
  });

  it('should switches to next step when "Захиалах" button is clicked', () => {
    render(<HomeOrder />);

    const orderButton = screen.getByRole('button', { name: /Захиалах/i });
    fireEvent.click(orderButton);

    expect(screen.queryByText('Таны захиалга')).not.toBeInTheDocument();
    expect(screen.queryByTestId('cart-item')).not.toBeInTheDocument();
    expect(screen.getByText(/Next step content goes here/i)).toBeInTheDocument();
    expect(screen.getByText(/hi/i)).toBeInTheDocument();
  });
});