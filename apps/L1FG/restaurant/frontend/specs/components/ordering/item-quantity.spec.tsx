import { render, screen } from '@testing-library/react';
import ItemsQuantity from '@/components/order/ItemQunatity';
import React from 'react';

describe('ItemsQuantity Component', () => {
  const mockFood = {
    id: '2',
    foodName: 'Pizza',
    imageUrl: 'https://example.com/pizza.jpg',
    price: 10,
    status: 'available',
  };

  it('should display the quantity when the food item is in the cart', () => {
    const mockOrders = [
      {
        _id: '2',
        quantity: 4,
      },
    ];

    render(<ItemsQuantity food={mockFood} orders={mockOrders} />);

    screen.getByTestId('quantity-2');
  });

  it('should not display the quantity when the food item is not in the cart', () => {
    const mockOrders: never[] = [];

    render(<ItemsQuantity food={mockFood} orders={mockOrders} />);

    screen.queryByTestId('quantity-2');
  });
});
