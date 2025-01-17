import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { useGetFoodsQuery } from '@/generated';
import OrderPageComponent from '@/components/order/OrderPageComponent';

// Mock the Apollo query hook
jest.mock('@/generated', () => ({
  useGetFoodsQuery: jest.fn(),
}));

const mockedUseGetFoodsQuery = useGetFoodsQuery as jest.Mock;

describe('OrderPageComponent', () => {
  it('renders the header and food items correctly', () => {
    // Mock data for the test
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

    // Mock the Apollo hook to return the mock data
    mockedUseGetFoodsQuery.mockReturnValue(mockFoodData);

    render(<OrderPageComponent />);

    // Check if the header is rendered
    expect(screen.getByText('Хоолны цэс')).toBeInTheDocument();

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
    // Mock the Apollo hook to return no data
    mockedUseGetFoodsQuery.mockReturnValue({ data: { getFoods: [] } });

    render(<OrderPageComponent />);

    // Ensure no food items are displayed
    const foodItems = screen.queryAllByAltText('food');
    expect(foodItems).toHaveLength(0);

    // Check if the header is still rendered
    expect(screen.getByText('Хоолны цэс')).toBeInTheDocument();
  });
});
