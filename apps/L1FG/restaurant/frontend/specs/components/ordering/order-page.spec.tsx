/* eslint-disable */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useGetCategoriesQuery, useGetFoodsQuery } from '@/generated';
import OrderPageComponent from '@/components/order/OrderPageComponent';

// Mock hooks and components
jest.mock('@/generated', () => ({
  useGetCategoriesQuery: jest.fn(),
  useGetFoodsQuery: jest.fn(),
}));

jest.mock('@/components/common/Header', () => {
  return function MockHeader() {
    return <div data-testid="mock-header">Header</div>;
  };
});

jest.mock('@/components/order/OrderList', () => {
  return function MockOrderList({
    selectedItems,
    updateItemQuantity,
    removeItem,
  }: {
    selectedItems: { id: string; foodName: string; quantity: number }[];
    updateItemQuantity: (id: string, quantity: number) => void;
    removeItem: (id: string) => void;
  }) {
    return (
      <div data-testid="mock-order-list">
        {selectedItems.map((item) => (
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
});

describe('OrderPageComponent', () => {
  const mockCategories = [
    { id: 'cat1', categoryName: 'Category 1' },
    { id: 'cat2', categoryName: 'Category 2' },
  ];

  const mockFoods = [
    { id: 'food1', foodName: 'Food 1', imageUrl: '/food1.jpg', price: 1500, categoryId: 'cat1' },
    { id: 'food2', foodName: 'Food 2', imageUrl: '/food2.jpg', price: 500, categoryId: 'cat2' },
    { id: 'food3', foodName: 'Food 3', imageUrl: '/food3.jpg', price: 2500, categoryId: null },
  ];

  beforeEach(() => {
    (useGetCategoriesQuery as jest.Mock).mockReturnValue({
      data: { getCategories: mockCategories },
    });

    (useGetFoodsQuery as jest.Mock).mockReturnValue({
      data: { getFoods: mockFoods },
    });
  });

  it('renders the component with categories and foods', () => {
    render(<OrderPageComponent tableNumber={5} />);

    expect(screen.getByTestId('menu-title')).toHaveTextContent('Хоолны цэс');
    expect(screen.getByTestId('category-buttons')).toBeInTheDocument();
    expect(screen.getByTestId('food-list')).toBeInTheDocument();
    mockFoods.forEach((food) => expect(screen.getByTestId(`food-item-${food.id}`)).toBeInTheDocument());
  });

  it('updates only the quantity of the targeted item', () => {
    render(<OrderPageComponent tableNumber={5} />);

    const foodItem1 = screen.getByTestId('food-item-food1');
    const foodItem2 = screen.getByTestId('food-item-food2');

    // Select both items
    fireEvent.click(foodItem1);
    fireEvent.click(foodItem2);

    const increaseButton1 = screen.getByTestId('increase-button-food1');
    fireEvent.click(increaseButton1); // Increase quantity of Food 1

    // Verify Food 1's quantity is updated
    const orderList = screen.getByTestId('mock-order-list');
    expect(orderList).toHaveTextContent('Food 1');
    expect(orderList).toHaveTextContent('Quantity: 2');

    // Verify Food 2's quantity remains unchanged
    expect(orderList).toHaveTextContent('Food 2');
    expect(orderList).toHaveTextContent('Quantity: 1');
  });


  it('selects and deselects a food item', () => {
    render(<OrderPageComponent tableNumber={5} />);

    const foodItem = screen.getByTestId('food-item-food1');
    fireEvent.click(foodItem); // Select the item
    let orderList = screen.getByTestId('mock-order-list');
    expect(orderList).toHaveTextContent('Food 1');
    expect(orderList).toHaveTextContent('Quantity: 1');

    fireEvent.click(foodItem); // Deselect the item
    orderList = screen.getByTestId('mock-order-list');
    expect(orderList).not.toHaveTextContent('Food 1');
  });

  it('increases and decreases the quantity of a selected item', () => {
    render(<OrderPageComponent tableNumber={5} />);

    const foodItem = screen.getByTestId('food-item-food1');
    fireEvent.click(foodItem); // Select the item

    const increaseButton = screen.getByTestId('increase-button-food1');
    fireEvent.click(increaseButton); // Increase quantity
    let orderList = screen.getByTestId('mock-order-list');
    expect(orderList).toHaveTextContent('Quantity: 2');

    const decreaseButton = screen.getByTestId('decrease-button-food1');
    fireEvent.click(decreaseButton); // Decrease quantity
    expect(orderList).toHaveTextContent('Quantity: 1');
  });

  it('removes a selected item from the order list', () => {
    render(<OrderPageComponent tableNumber={5} />);

    const foodItem = screen.getByTestId('food-item-food1');
    fireEvent.click(foodItem); // Select the item

    const removeButton = screen.getByTestId('delete-button-food1');
    fireEvent.click(removeButton); // Remove the item
    const orderList = screen.getByTestId('mock-order-list');
    expect(orderList).not.toHaveTextContent('Food 1');
  });

  it('handles food items with null categoryId', () => {
    render(<OrderPageComponent tableNumber={5} />);

    const nullCategoryFoodItem = screen.getByTestId('food-item-food3');
    expect(nullCategoryFoodItem).toBeInTheDocument();
    fireEvent.click(nullCategoryFoodItem);

    const orderList = screen.getByTestId('mock-order-list');
    expect(orderList).toHaveTextContent('Food 3');
  });

  it('handles price formatting correctly', () => {
    render(<OrderPageComponent tableNumber={5} />);

    expect(screen.getByTestId('food-price-food1')).toHaveTextContent('1.5к');
    expect(screen.getByTestId('food-price-food2')).toHaveTextContent('500');
    expect(screen.getByTestId('food-price-food3')).toHaveTextContent('2.5к');
  });

  it('filters foods by category', () => {
    render(<OrderPageComponent tableNumber={5} />);

    const category1Button = screen.getByTestId('category-cat1');
    fireEvent.click(category1Button);
    expect(screen.getByTestId('food-item-food1')).toBeInTheDocument();
    expect(screen.queryByTestId('food-item-food2')).not.toBeInTheDocument();

    const allButton = screen.getByTestId('category-all');
    fireEvent.click(allButton);
    mockFoods.forEach((food) => expect(screen.getByTestId(`food-item-${food.id}`)).toBeInTheDocument());
  });
});
