import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CartItem from '@/app/_components/CartItems';
// Import jest-dom to extend Jest matchers
import '@testing-library/jest-dom/extend-expect';



describe('CartItem', () => {
  const item = {
    image: '/Taco.png',
    name: 'Taco',
    price: '$5.99',
  };

  it('should render item name and price', () => {
    render(<CartItem item={item} />);
    expect(screen.getByText('Taco')).toBeInTheDocument();
    expect(screen.getByText('$5.99')).toBeInTheDocument();
  });

  it('should render increments and decrements quantity correctly', () => {
    render(<CartItem item={item} />);

    const incrementButton = screen.getByText('+');
    const decrementButton = screen.getByText('–');

    fireEvent.click(incrementButton);
    expect(screen.getByText('2')).toBeInTheDocument();

    fireEvent.click(decrementButton);
    expect(screen.getByText('1')).toBeInTheDocument();

    fireEvent.click(decrementButton);
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('should call onDelete when delete button is clicked', () => {
    const onDelete = jest.fn();
    render(<CartItem item={item} onDelete={onDelete} />);
    
    const deleteButton = screen.getByRole('button', { name: '🗑️' });
    fireEvent.click(deleteButton);
    expect(onDelete).toHaveBeenCalledTimes(1);
  });
});
