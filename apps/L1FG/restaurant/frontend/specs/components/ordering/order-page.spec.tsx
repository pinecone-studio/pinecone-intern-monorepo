import { render, screen, fireEvent } from '@testing-library/react';

import { useGetCategoriesQuery, useGetFoodsQuery } from '@/generated';
import OrderPageComponent from '@/components/order/OrderPageComponent';

jest.mock('@/generated', () => ({
  useGetCategoriesQuery: jest.fn(),
  useGetFoodsQuery: jest.fn(),
}));

describe('OrderPageComponent', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockCategories = [
    { id: '1', categoryName: 'Category 1' },
    { id: '2', categoryName: 'Category 2' },
  ];

  const mockFoods = [
    { id: '1', foodName: 'Food 1', imageUrl: '/food1.jpg', price: 1200, categoryId: '1' },
    { id: '2', foodName: 'Food 2', imageUrl: '/food2.jpg', price: 800, categoryId: '2' },
    { id: '3', foodName: 'Food 3', imageUrl: '/food3.jpg', price: 1500, categoryId: '1' },
  ];

  it('renders the component with categories and foods', () => {
    (useGetCategoriesQuery as jest.Mock).mockReturnValue({
      data: { getCategories: mockCategories },
    });

    (useGetFoodsQuery as jest.Mock).mockReturnValue({
      data: { getFoods: mockFoods },
    });

    render(<OrderPageComponent />);

    // Check if the "Бүгд" button is rendered and selected by default
    const allButton = screen.getByTestId('category-all');
    expect(allButton).toHaveClass('font-bold');

    // Check if category buttons are rendered
    mockCategories.forEach((category) => {
      expect(screen.getByTestId(`category-${category.id}`)).toBeInTheDocument();
    });

    // Check if all foods are rendered initially
    mockFoods.forEach((food) => {
      expect(screen.getByTestId(`food-name-${food.id}`)).toHaveTextContent(food.foodName);
    });
  });

  it('filters foods based on selected category', () => {
    (useGetCategoriesQuery as jest.Mock).mockReturnValue({
      data: { getCategories: mockCategories },
    });

    (useGetFoodsQuery as jest.Mock).mockReturnValue({
      data: { getFoods: mockFoods },
    });

    render(<OrderPageComponent />);

    // Select a specific category
    const categoryButton = screen.getByTestId('category-1');
    fireEvent.click(categoryButton);

    // Check if only foods from the selected category are displayed
    expect(screen.getByTestId('food-name-1')).toBeInTheDocument();
    expect(screen.getByTestId('food-name-3')).toBeInTheDocument();
    expect(screen.queryByTestId('food-name-2')).not.toBeInTheDocument();
  });

  it('resets food filtering when "Бүгд" is clicked', () => {
    (useGetCategoriesQuery as jest.Mock).mockReturnValue({
      data: { getCategories: mockCategories },
    });

    (useGetFoodsQuery as jest.Mock).mockReturnValue({
      data: { getFoods: mockFoods },
    });

    render(<OrderPageComponent />);

    // Select a specific category and then reset to "Бүгд"
    fireEvent.click(screen.getByTestId('category-1'));
    fireEvent.click(screen.getByTestId('category-all'));

    // Check if all foods are displayed again
    mockFoods.forEach((food) => {
      expect(screen.getByTestId(`food-name-${food.id}`)).toBeInTheDocument();
    });
  });
});
