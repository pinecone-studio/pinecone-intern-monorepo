/* eslint-disable */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useGetCategoriesQuery, useGetFoodsQuery } from '@/generated';
import AdminProductCard from '@/components/admin-page-comp/AdminProductCard';

// Mock the next/image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => <img {...props} />,
}));

// Mock the GraphQL queries
jest.mock('@/generated', () => ({
  useGetCategoriesQuery: jest.fn(),
  useGetFoodsQuery: jest.fn(),
}));

// Mock the UI components
jest.mock('@/components/ui/card', () => ({
  Card: ({ children, className }) => <div className={className}>{children}</div>,
  CardTitle: ({ children }) => <h2>{children}</h2>,
}));

jest.mock('@/components/ui/button', () => ({
  Button: ({ children, onClick, className }) => (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  ),
}));

jest.mock('@/components/admin-page-comp/DeleteFoodDia', () => ({
  __esModule: true,
  default: ({ foodId }) => <div data-testid={`delete-food-${foodId}`}>Delete</div>,
}));

jest.mock('@/components/admin-page-comp/adminmenupage/AddFoodCateId', () => ({
  __esModule: true,
  default: ({ categoryId }) => <div data-testid={`add-food-${categoryId}`}>Add Food</div>,
}));

describe('AdminProductCard', () => {
  const mockCategories = {
    getCategories: [
      { id: 'cat1', categoryName: 'Category 1' },
      { id: 'cat2', categoryName: 'Category 2' },
    ],
  };

  const mockFoods = {
    getFoods: [
      {
        id: 'food1',
        foodName: 'Food 1',
        price: 1500,
        status: 'Available',
        categoryId: 'cat1',
        imageUrl: '/food1.jpg',
      },
      {
        id: 'food2',
        foodName: 'Food 2',
        price: 800,
        status: 'Available',
        categoryId: 'cat1',
        imageUrl: '/food2.jpg',
      },
      {
        id: 'food3',
        foodName: 'Food 3',
        price: 2000,
        status: 'Available',
        categoryId: 'cat2',
        imageUrl: '/food3.jpg',
      },
    ],
  };

  const mockRefetch = jest.fn();

  beforeEach(() => {
    useGetCategoriesQuery.mockReturnValue({ data: mockCategories });
    useGetFoodsQuery.mockReturnValue({ data: mockFoods, refetch: mockRefetch });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the component with initial category selected', () => {
    render(<AdminProductCard />);

    expect(screen.getByText('Цэс')).toBeInTheDocument();
    expect(screen.getByText('Category 1')).toBeInTheDocument();
    expect(screen.getByText('Category 2')).toBeInTheDocument();

    // Check if first category's foods are displayed
    expect(screen.getByText('Food 1')).toBeInTheDocument();
    expect(screen.getByText('Food 2')).toBeInTheDocument();
    expect(screen.queryByText('Food 3')).not.toBeInTheDocument();
  });

  test('filters foods when changing category', async () => {
    render(<AdminProductCard />);

    // Click on second category
    fireEvent.click(screen.getByText('Category 2'));

    // Wait for the foods to update
    await waitFor(() => {
      expect(screen.queryByText('Food 1')).not.toBeInTheDocument();
      expect(screen.queryByText('Food 2')).not.toBeInTheDocument();
      expect(screen.getByText('Food 3')).toBeInTheDocument();
    });
  });

  test('formats prices correctly', () => {
    render(<AdminProductCard />);

    expect(screen.getByText('1.5к')).toBeInTheDocument(); // 1500
    expect(screen.getByText('800')).toBeInTheDocument(); // 800
  });

  test('displays empty state message when no foods in category', () => {
    useGetFoodsQuery.mockReturnValue({
      data: { getFoods: [] },
      refetch: mockRefetch,
    });

    render(<AdminProductCard />);

    expect(screen.getByText('Энэ цэсэнд хоол алга.')).toBeInTheDocument();
  });

  test('renders AddFoodCateId component with correct props', () => {
    render(<AdminProductCard />);

    // Check if AddFoodCateId is rendered with the first category ID
    expect(screen.getByTestId('add-food-cat1')).toBeInTheDocument();
  });

  test('renders DeleteFoodDia component for each food item', () => {
    render(<AdminProductCard />);

    // Check if DeleteFoodDia components are rendered for the visible foods
    expect(screen.getByTestId('delete-food-food1')).toBeInTheDocument();
    expect(screen.getByTestId('delete-food-food2')).toBeInTheDocument();
  });

  test('handles missing data gracefully', () => {
    useGetCategoriesQuery.mockReturnValue({ data: null });
    useGetFoodsQuery.mockReturnValue({ data: null });

    render(<AdminProductCard />);

    expect(screen.getByText('Цэс')).toBeInTheDocument();
    expect(screen.getByText('Энэ цэсэнд хоол алга.')).toBeInTheDocument();
  });

  test('applies correct styling for selected category', () => {
    render(<AdminProductCard />);

    const firstCategoryButton = screen.getByText('Category 1').closest('button');
    const secondCategoryButton = screen.getByText('Category 2').closest('button');

    expect(firstCategoryButton).toHaveClass('font-bold');
    expect(secondCategoryButton).not.toHaveClass('font-bold');

    fireEvent.click(secondCategoryButton);

    expect(firstCategoryButton).not.toHaveClass('font-bold');
    expect(secondCategoryButton).toHaveClass('font-bold');
  });

  test('renders empty message when no filtered foods exist', () => {
    const mockFoods = {
      getFoods: [],
    };

    // Mock the hooks to return empty foods data
    (useGetCategoriesQuery as jest.Mock).mockReturnValue({ data: mockCategories });
    (useGetFoodsQuery as jest.Mock).mockReturnValue({ data: mockFoods, refetch: jest.fn() });

    render(<AdminProductCard />);

    // Verify empty message is shown
    expect(screen.getByText('Энэ цэсэнд хоол алга.')).toBeInTheDocument();

    // Verify no food items are rendered
    expect(screen.queryByText(/Test Food/)).not.toBeInTheDocument();
  });

  test('handles null/undefined foods data gracefully', () => {
    // Mock the hooks to return undefined data
    (useGetCategoriesQuery as jest.Mock).mockReturnValue({ data: mockCategories });
    (useGetFoodsQuery as jest.Mock).mockReturnValue({ data: undefined, refetch: jest.fn() });

    render(<AdminProductCard />);

    // Verify empty message is shown
    expect(screen.getByText('Энэ цэсэнд хоол алга.')).toBeInTheDocument();
  });
});
