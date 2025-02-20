import ItemsQuantity from '@/components/order/ItemQunatity';
import { render, screen } from '@testing-library/react';

describe('ItemsQuantity Component', () => {
  const foodItem = {
    id: '1',
    foodName: 'Burger',
    imageUrl: 'burger.jpg',
    price: 10,
    status: 'available',
    categoryId: '123',
  };

  test('renders quantity when order exists', () => {
    const orders = [{ _id: '1', quantity: 3 }];

    render(<ItemsQuantity food={foodItem} orders={orders} />);

    screen.getByTestId('quantity-1');
  });

  test('renders nothing when order does not exist', () => {
    const orders = [{ _id: '2', quantity: 5 }]; // Different order ID

    render(<ItemsQuantity food={foodItem} orders={orders} />);

    screen.queryByTestId('quantity-1');
  });
});
