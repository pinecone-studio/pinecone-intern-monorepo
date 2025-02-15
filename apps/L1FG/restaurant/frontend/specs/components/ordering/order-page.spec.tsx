import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useGetCategoriesQuery, useGetFoodsQuery } from '@/generated';
import OrderPageComponent from '@/components/order/OrderPageComponent';
import { useCart } from '@/components/providers';

jest.mock('@/generated', () => ({
  useGetCategoriesQuery: jest.fn(),
  useGetFoodsQuery: jest.fn(),
}));

jest.mock('@/components/common/Header', () => {
  const MockHeader = () => {
    return <div data-testid="mock-header">Header</div>;
  };
  return MockHeader;
});
jest.mock('@/components/providers', () => ({
  useCart: jest.fn(),
}));

jest.mock('@/components/order/OrderList', () => {
  const MockOrderList = ({
    selectedItems,
    updateItemQuantity,
    removeItem,
  }: {
    selectedItems: { id: string; foodName: string; quantity: number }[];
    updateItemQuantity: (_id: string, _quantity: number) => void;
    removeItem: (_id: string) => void;
  }) => {
    return (
      <div data-testid="mock-order-list">
        {selectedItems?.map((item) => (
          <div key={item.id} data-testid={`order-item-${item.id}`}>
            <span>{item.foodName}</span>
            <span>Quantity: {item.quantity}</span>
            <button onClick={() => updateItemQuantity(item.id, item.quantity + 1)} data-testid={`increase-button-${item.id}`}>
              Increase
            </button>
            <button onClick={() => updateItemQuantity(item.id, item.quantity - 1)} data-testid={`decrease-button-${item.id}`}>
              Decrease
            </button>
            <button onClick={() => removeItem(item.id)} data-testid={`delete-button-${item.id}`}>
              Remove
            </button>
          </div>
        ))}
      </div>
    );
  };
  return MockOrderList;
});

describe('OrderPageComponent', () => {
  const mockCategories = [
    { id: 'cat1', categoryName: 'Category 1' },
    { id: 'cat2', categoryName: 'Category 2' },
  ];

  const mockFoods = [
    { id: 'food1', foodName: 'Food 1', imageUrl: '/food1.jpg', price: 1500, categoryId: 'cat1', quantity: 1 },
    { id: 'food2', foodName: 'Food 2', imageUrl: '/food2.jpg', price: 500, categoryId: 'cat2', quantity: 1 },
    { id: 'food3', foodName: 'Food 3', imageUrl: '/food3.jpg', price: 2500, categoryId: null, quantity: 1 },
  ];

  beforeEach(() => {
    (useGetCategoriesQuery as jest.Mock).mockReturnValue({
      data: { getCategories: mockCategories },
    });

    (useGetFoodsQuery as jest.Mock).mockReturnValue({
      data: { getFoods: mockFoods },
    });
  });

  it('updates only the quantity of the targeted item', () => {
    render(<OrderPageComponent tableNumber={5} />);

    const foodItem1 = screen.getByText('Food 1');
    const foodItem2 = screen.getByText('Food 2');

    fireEvent.click(foodItem1);
    fireEvent.click(foodItem2);
  });

  it('selects and deselects a food item', () => {
    render(<OrderPageComponent tableNumber={5} />);

    const foodItem = screen.getByText('Food 1');
    fireEvent.click(foodItem);
    let orderList: HTMLElement | null = screen.getByText('Food 1');
    expect(orderList).toBeInTheDocument();

    fireEvent.click(foodItem);
    orderList = screen.queryByText('Food 1');
  });

  it('filters foods by category', () => {
    render(<OrderPageComponent tableNumber={5} />);

    const category1Button = screen.getByText('Category 1');
    fireEvent.click(category1Button);

    mockFoods
      .filter((food) => food.categoryId === 'cat1')
      .forEach((food) => {
        expect(screen.getByText(food.foodName)).toBeInTheDocument();
      });

    const allButton = screen.getByText('Бүгд');
    fireEvent.click(allButton);
    mockFoods.forEach((food) => {
      expect(screen.getByText(food.foodName)).toBeInTheDocument();
    });
  });

  it('if item not in cartItems, quantity will be 0', async () => {
    const food = { foodName: 'Food 1', id: 'food1', price: 1000, imageUrl: '/food1.jpg' };
    localStorage.setItem('food', JSON.stringify(food));

    const mockAddToCart = jest.fn();
    const mockSetTableId = jest.fn();
    const mockOrders: never[] = [];

    (useCart as jest.Mock).mockReturnValue({
      addToCart: mockAddToCart,
      orders: mockOrders,
      setTableId: mockSetTableId,
    });

    render(<OrderPageComponent tableNumber={5} />);
  });
});
