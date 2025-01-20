import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useGetFoodsQuery, useGetCategoriesQuery } from '@/generated';
import OrderPageComponent from '@/components/order/OrderPageComponent';

// Mock the Apollo query hooks
jest.mock('@/generated', () => ({
  useGetFoodsQuery: jest.fn(),
  useGetCategoriesQuery: jest.fn(),
}));

const mockedUseGetFoodsQuery = useGetFoodsQuery as jest.Mock;
const mockedUseGetCategoriesQuery = useGetCategoriesQuery as jest.Mock;

describe('OrderPageComponent', () => {
  it('renders the header, food items, and categories correctly', () => {
    // Mock data for foods and categories
    const mockFoodData = {
      data: {
        getFoods: [
          {
            id: '1',
            foodName: 'Pasta',
            price: 1200,
            imageUrl: '/images/pasta.jpg',
          },
          {
            id: '2',
            foodName: 'Pizza',
            price: 850,
            imageUrl: '/images/pizza.jpg',
          },
        ],
      },
    };

    const mockCategoryData = {
      data: {
        getCategories: [
          { id: '1', categoryName: 'Main Course' },
          { id: '2', categoryName: 'Desserts' },
        ],
      },
    };

    // Mock the Apollo hooks to return the mock data
    mockedUseGetFoodsQuery.mockReturnValue(mockFoodData);
    mockedUseGetCategoriesQuery.mockReturnValue(mockCategoryData);

    render(<OrderPageComponent />);

    // Check if the header is rendered
    expect(screen.getByText('Хоолны цэс')).toBeInTheDocument();

    // Check if category buttons are rendered correctly
    expect(screen.getByText('Main Course')).toBeInTheDocument();
    expect(screen.getByText('Desserts')).toBeInTheDocument();

    // Check if food items are rendered correctly
    const foodItems = screen.getAllByAltText('food');
    expect(foodItems).toHaveLength(2);

    // Check food names
    expect(screen.getByText('Pasta')).toBeInTheDocument();
    expect(screen.getByText('Pizza')).toBeInTheDocument();

    // Check food prices
    expect(screen.getByText('1.2к')).toBeInTheDocument(); // Formatted price for 1200
    expect(screen.getByText('850')).toBeInTheDocument(); // Price for 850
  });

  it('renders correctly when there is no food data', () => {
    // Mock the Apollo hook to return no food data
    mockedUseGetFoodsQuery.mockReturnValue({ data: { getFoods: [] } });
    mockedUseGetCategoriesQuery.mockReturnValue({
      data: {
        getCategories: [{ id: '1', categoryName: 'Main Course' }],
      },
    });

    render(<OrderPageComponent />);

    // Ensure no food items are displayed
    const foodItems = screen.queryAllByAltText('food');
    expect(foodItems).toHaveLength(0);

    // Check if the header is still rendered
    expect(screen.getByText('Хоолны цэс')).toBeInTheDocument();

    // Check if category buttons are rendered correctly
    expect(screen.getByText('Main Course')).toBeInTheDocument();
  });
});
