import '@testing-library/jest-dom';
import { Category } from '@/generated';
import { MockedProvider } from '@apollo/client/testing';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { deleteFoodFromCategoryErrorMock, deleteFoodFromCategoryMock } from 'specs/utils/MenuMockData';
import { toast } from 'sonner';
import { CategoryFoodsCard } from '@/components/admin';
import { getFoodsWithShortPriceMock } from 'specs/utils/FoodMockData';

jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

const mockDataProps = {
  activeMenu: '1',
  data: [
    {
      categoryId: '1',
      categoryName: 'Dessert',
      food: [
        {
          foodId: '1',
          foodName: 'Test1',
          price: '20000',
          foodStatus: 'Идэвхитэй',
          image: 'https://example.com/foodimage.jpg',
        },
        {
          foodId: '2',
          foodName: 'Test2',
          price: '20000',
          foodStatus: 'Идэвхитэй',
          image: 'https://example.com/foodimage.jpg',
        },
      ],
    },
  ] as Category[],
  refetch: jest.fn(),
};

const mockDataPropsPriceCheck = {
  activeMenu: '1',
  data: [
    {
      categoryId: '1',
      categoryName: 'Dessert',
      food: [
        {
          foodId: '1',
          foodName: 'Test1',
          price: '200',
          foodStatus: 'Идэвхитэй',
          image: 'https://example.com/foodimage.jpg',
        },
        {
          foodId: '2',
          foodName: 'Test2',
          price: '500',
          foodStatus: 'Идэвхитэй',
          image: 'https://example.com/foodimage.jpg',
        },
      ],
    },
  ] as Category[],
  refetch: jest.fn(),
};

describe('CategoryFoodsCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render', () => {
    const { getByTestId, queryByTestId } = render(
      <MockedProvider mocks={[deleteFoodFromCategoryMock]}>
        <CategoryFoodsCard {...mockDataProps} />
      </MockedProvider>
    );

    const foodWithCategory = getByTestId('food-with-category-1');
    expect(foodWithCategory).toBeInTheDocument();

    expect(queryByTestId('from-category-delete-dialog-1')).toBeInTheDocument();
  });

  it('should delete food from category and show toast success', async () => {
    const { getByTestId, queryByTestId } = render(
      <MockedProvider mocks={[deleteFoodFromCategoryMock]}>
        <CategoryFoodsCard {...mockDataProps} />
      </MockedProvider>
    );

    const foodWithCategory = getByTestId('food-with-category-1');
    expect(foodWithCategory).toBeInTheDocument();
    const deleteDialog = getByTestId('from-category-delete-dialog-1');
    expect(deleteDialog).toBeInTheDocument();
    fireEvent.click(deleteDialog);

    expect(getByTestId('delete-dialog-title')).toBeInTheDocument();

    expect(getByTestId('delete-dialog-delete-button')).toBeInTheDocument();
    fireEvent.click(getByTestId('delete-dialog-delete-button'));

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Цэснээс амжилттай хасагдлаа!', {
        position: 'bottom-right',
      });
    });

    await waitFor(() => {
      expect(queryByTestId('delete-dialog-title')).not.toBeInTheDocument();
    });
  });

  it('should show toast error when deletefood mutation fails', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[deleteFoodFromCategoryErrorMock]}>
        <CategoryFoodsCard {...mockDataProps} />
      </MockedProvider>
    );

    const foodWithCategory = getByTestId('food-with-category-1');
    expect(foodWithCategory).toBeInTheDocument();
    const deleteDialog = getByTestId('from-category-delete-dialog-1');
    expect(deleteDialog).toBeInTheDocument();
    fireEvent.click(deleteDialog);

    expect(getByTestId('delete-dialog-title')).toBeInTheDocument();

    expect(getByTestId('delete-dialog-delete-button')).toBeInTheDocument();
    fireEvent.click(getByTestId('delete-dialog-delete-button'));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Цэснээс хасахад алдаа гарлаа!', {
        position: 'bottom-right',
      });
    });
  });

  it('should renders short price correctly', async () => {
    const { findByText } = render(
      <MockedProvider mocks={[getFoodsWithShortPriceMock]}>
        <CategoryFoodsCard {...mockDataPropsPriceCheck} />
      </MockedProvider>
    );

    const shortPrice = await findByText('200');
    expect(shortPrice).toBeInTheDocument();
  });
});
