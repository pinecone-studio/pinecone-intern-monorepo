import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import OrderFoodCard from '@/app/admin/_components/OrderFoodCard';

const mockOrders = [
  {
    id: 'order_1',
    table: '1A',
    createdAt: '2025-04-28T12:45:00Z',
    items: [
      {
        id: 'item_1',
        name: 'Taco',
        price: 15600,
        quantity: 2,
        image: 'https://res.cloudinary.com/demo/image/upload/v1615550891/taco.jpg',
      },
      {
        id: 'item_2',
        name: 'Pizza',
        price: 12000,
        quantity: 1,
        image: 'https://res.cloudinary.com/demo/image/upload/v1615550891/pizza.jpg',
      },
    ],
    status: 'waiting',
    totalPrice: 43200,
  },
];

describe('OrderFoodCard', () => {
  it('renders without crashing', () => {
    render(<OrderFoodCard orders={mockOrders} />);
    const container = screen.getByTestId('order-food-card');
    expect(container).toBeInTheDocument();
  });

  it('displays correct number of food items', () => {
    render(<OrderFoodCard orders={mockOrders} />);
    const images = screen.getAllByTestId('food-image');
    expect(images).toHaveLength(mockOrders[0].items.length);
  });

  it('displays food names, prices, and quantities', () => {
    render(<OrderFoodCard orders={mockOrders} />);

    mockOrders[0].items.forEach((food) => {
      expect(screen.getByText(food.name)).toBeInTheDocument();
      expect(screen.getByText(`${food.price}₮`)).toBeInTheDocument();
      expect(screen.getByText(`${food.quantity}ш`)).toBeInTheDocument();
    });
  });
});
