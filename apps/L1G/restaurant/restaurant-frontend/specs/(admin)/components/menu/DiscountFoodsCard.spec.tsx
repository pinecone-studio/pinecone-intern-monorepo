import '@testing-library/jest-dom';
import { Discount } from '@/generated';
import { MockedProvider } from '@apollo/client/testing';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { deleteFoodFromDiscountErrorMock, deleteFoodFromDiscountMock } from 'specs/utils/MenuMockData';
import { toast } from 'sonner';
import { DiscountFoodsCard } from '@/components/admin/menu/DiscountFoodsCard';
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
      discountId: '1',
      discountName: 'New',
      discountRate: 10,
      startDate: new Date().toLocaleString(),
      endDate: new Date().toLocaleString(),
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
  ] as Discount[],
  refetch: jest.fn(),
};

const mockDataPropsPriceCheck = {
  activeMenu: '1',
  data: [
    {
      discountId: '1',
      discountName: 'New',
      discountRate: 10,
      startDate: new Date().toLocaleString(),
      endDate: new Date().toLocaleString(),
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
  ] as Discount[],
  refetch: jest.fn(),
};

describe('DiscountFoodsCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render', () => {
    const { getByTestId, queryByTestId } = render(
      <MockedProvider mocks={[deleteFoodFromDiscountMock]}>
        <DiscountFoodsCard {...mockDataProps} />
      </MockedProvider>
    );

    const foodWithCategory = getByTestId('food-with-discount-1');
    expect(foodWithCategory).toBeInTheDocument();

    expect(queryByTestId('from-discount-delete-dialog-1')).toBeInTheDocument();
  });

  it('should delete food from discount and show toast success', async () => {
    const { getByTestId, queryByTestId } = render(
      <MockedProvider mocks={[deleteFoodFromDiscountMock]}>
        <DiscountFoodsCard {...mockDataProps} />
      </MockedProvider>
    );

    const foodWithCategory = getByTestId('food-with-discount-1');
    expect(foodWithCategory).toBeInTheDocument();
    const deleteDialog = getByTestId('from-discount-delete-dialog-1');
    expect(deleteDialog).toBeInTheDocument();
    fireEvent.click(deleteDialog);

    expect(getByTestId('delete-dialog-title')).toBeInTheDocument();

    expect(getByTestId('delete-dialog-delete-button')).toBeInTheDocument();
    fireEvent.click(getByTestId('delete-dialog-delete-button'));

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Хямдралаас амжилттай хасагдлаа!', {
        position: 'bottom-right',
      });
    });

    await waitFor(() => {
      expect(queryByTestId('delete-dialog-title')).not.toBeInTheDocument();
    });
  });

  it('should show toast error when deletefood mutation fails', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[deleteFoodFromDiscountErrorMock]}>
        <DiscountFoodsCard {...mockDataProps} />
      </MockedProvider>
    );

    const foodWithCategory = getByTestId('food-with-discount-1');
    expect(foodWithCategory).toBeInTheDocument();
    const deleteDialog = getByTestId('from-discount-delete-dialog-1');
    expect(deleteDialog).toBeInTheDocument();
    fireEvent.click(deleteDialog);

    expect(getByTestId('delete-dialog-title')).toBeInTheDocument();

    expect(getByTestId('delete-dialog-delete-button')).toBeInTheDocument();
    fireEvent.click(getByTestId('delete-dialog-delete-button'));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Хямдралаас хасахад алдаа гарлаа!', {
        position: 'bottom-right',
      });
    });
  });

  it('should renders short price correctly', async () => {
    const { findByText } = render(
      <MockedProvider mocks={[getFoodsWithShortPriceMock]}>
        <DiscountFoodsCard {...mockDataPropsPriceCheck} />
      </MockedProvider>
    );

    const shortPrice = await findByText('200');
    expect(shortPrice).toBeInTheDocument();
  });
});
